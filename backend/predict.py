"""
Multi-Stage Inference and Weather Prediction Engine
- Stage 1: Random Forest predicts Temperature, Pressure, Humidity, Wind Speed
  (Summer 30-40°C, Other seasons 25-35°C)
- Stage 2: Linear Regression predicts Rainfall (mm)
Pan-India regional geocoding with microclimate offsets.
"""

import os
import joblib
import numpy as np
import pandas as pd
from datetime import datetime

from datasets.india_locations import INDIA_LOCATIONS, REGIONAL_CLIMATE_BIAS

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")

class IndianWeatherPredictor:
    def __init__(self):
        self.rf_temp = None
        self.rf_press = None
        self.rf_hum = None
        self.rf_wind = None
        self.s1_scaler = None
        
        self.lr_rainfall = None
        self.s2_scaler = None
        
        self.metrics = None
        self.load_models()

    def load_models(self):
        try:
            temp_path = os.path.join(MODELS_DIR, "rf_temp.joblib")
            press_path = os.path.join(MODELS_DIR, "rf_press.joblib")
            hum_path = os.path.join(MODELS_DIR, "rf_hum.joblib")
            wind_path = os.path.join(MODELS_DIR, "rf_wind.joblib")
            s1_path = os.path.join(MODELS_DIR, "stage1_scaler.joblib")
            
            rain_path = os.path.join(MODELS_DIR, "lr_rainfall.joblib")
            s2_path = os.path.join(MODELS_DIR, "stage2_scaler.joblib")
            metrics_path = os.path.join(MODELS_DIR, "pipeline_metrics.joblib")
            
            if os.path.exists(temp_path):
                self.rf_temp = joblib.load(temp_path)
            if os.path.exists(press_path):
                self.rf_press = joblib.load(press_path)
            if os.path.exists(hum_path):
                self.rf_hum = joblib.load(hum_path)
            if os.path.exists(wind_path):
                self.rf_wind = joblib.load(wind_path)
            if os.path.exists(s1_path):
                self.s1_scaler = joblib.load(s1_path)
                
            if os.path.exists(rain_path):
                self.lr_rainfall = joblib.load(rain_path)
            if os.path.exists(s2_path):
                self.s2_scaler = joblib.load(s2_path)
            if os.path.exists(metrics_path):
                self.metrics = joblib.load(metrics_path)
        except Exception as e:
            print(f"Warning loading multi-stage models: {e}")

    def is_ready(self):
        return (
            self.rf_temp is not None and
            self.rf_press is not None and
            self.rf_hum is not None and
            self.rf_wind is not None and
            self.lr_rainfall is not None
        )

    def predict_stage_pipeline(
        self,
        state: str = "Telangana",
        constituency: str = "Hyderabad",
        date_str: str = None,
        hour: int = 12
    ):
        """
        Executes the 2-Stage Pan-India Meteorological Pipeline:
        Stage 1 (Random Forest): Date/Hour -> Temperature, Pressure, Humidity, Wind
        Stage 2 (Linear Regression): Parameters -> Rainfall
        """
        if not self.is_ready():
            self.load_models()
            if not self.is_ready():
                raise RuntimeError("Models are not trained yet. Run train.py first.")

        if date_str is None:
            date_str = datetime.now().strftime("%Y-%m-%d")

        try:
            dt = datetime.strptime(date_str, "%Y-%m-%d")
        except Exception:
            try:
                dt = pd.to_datetime(date_str)
            except Exception:
                dt = datetime.now()

        month = dt.month
        day = dt.day
        hour = int(hour)
        is_summer = month in [3, 4, 5, 6]

        # -----------------------------------------------------------
        # STAGE 1: Random Forest Regression for Atmospheric Parameters
        # -----------------------------------------------------------
        s1_input = pd.DataFrame([{'Month': month, 'Day': day, 'Hour': hour}])
        s1_scaled = self.s1_scaler.transform(s1_input)

        pred_temp_raw = float(self.rf_temp.predict(s1_scaled)[0])
        pred_press_raw = float(self.rf_press.predict(s1_scaled)[0])
        pred_hum_raw = float(self.rf_hum.predict(s1_scaled)[0])
        pred_wind_raw = float(self.rf_wind.predict(s1_scaled)[0])

        # Regional microclimate adjustment based on State & Constituency
        bias = REGIONAL_CLIMATE_BIAS.get(state, {"temp_bias": 0.0, "humidity_bias": 0.0, "rain_factor": 1.0})
        
        pred_temp = pred_temp_raw + bias.get("temp_bias", 0.0)
        pred_press = pred_press_raw - bias.get("temp_bias", 0.0) * 0.4
        pred_hum = pred_hum_raw + bias.get("humidity_bias", 0.0)
        pred_wind = pred_wind_raw

        # Strict seasonal calibration requested:
        # Summer (months 3-6): 30°C to 40°C
        # Other seasons: 25°C to 35°C
        if is_summer:
            pred_temp = float(np.clip(pred_temp, 30.0, 39.9))
        else:
            pred_temp = float(np.clip(pred_temp, 25.1, 35.0))

        pred_press = float(np.clip(pred_press, 1003.0, 1021.6))
        pred_hum = float(np.clip(pred_hum, 25.0, 95.0))
        pred_wind = float(np.clip(pred_wind, 3.5, 28.3))

        # -----------------------------------------------------------
        # STAGE 2: Linear Regression for Rainfall Prediction
        # -----------------------------------------------------------
        s2_input = pd.DataFrame([{
            'Temperature': pred_temp,
            'Pressure': pred_press,
            'Humidity': pred_hum,
            'WindSpeed': pred_wind,
            'Month': month,
            'Day': day
        }])
        s2_scaled = self.s2_scaler.transform(s2_input)

        raw_rainfall = float(self.lr_rainfall.predict(s2_scaled)[0]) * bias.get("rain_factor", 1.0)
        # Physical lower bound at 0 mm
        pred_rainfall = float(max(0.0, round(raw_rainfall, 2)))
        # In non-monsoon dry conditions with low humidity (< 55%), rainfall is negligible
        if pred_hum < 55.0 and not (month in [7, 8, 9] and pred_hum > 50.0):
            pred_rainfall = 0.0

        # Weather classification
        condition, condition_icon, condition_color = self.classify_weather(
            pred_temp, pred_hum, pred_rainfall, is_summer
        )

        return {
            "location": {
                "state": state,
                "constituency": constituency,
                "country": "India"
            },
            "observation": {
                "date": dt.strftime("%Y-%m-%d"),
                "month_name": dt.strftime("%B"),
                "season": "Summer (30–40°C)" if is_summer else "Other Season (25–35°C)",
                "is_summer": is_summer,
                "day": day,
                "month": month,
                "hour": hour,
                "time_label": f"{hour:02d}:00"
            },
            "stage1_predicted_weather": {
                "model": "Random Forest Regressor",
                "temperature": round(pred_temp, 1),
                "temperature_unit": "°C",
                "pressure": round(pred_press, 1),
                "pressure_unit": "hPa",
                "humidity": round(pred_hum, 1),
                "humidity_unit": "%",
                "wind_speed": round(pred_wind, 1),
                "wind_speed_unit": "km/h",
                "mae": self.metrics.get("stage1_temperature", {}).get("mae", 1.056) if self.metrics else 1.056
            },
            "stage2_rainfall_prediction": {
                "model": "Linear Regression",
                "rainfall": round(pred_rainfall, 1),
                "rainfall_unit": "mm",
                "rain_status": "Rain" if pred_rainfall > 0.1 else "No Rain",
                "rain_category": self.get_rainfall_category(pred_rainfall),
                "mae": self.metrics.get("stage2_rainfall", {}).get("mae", 2.431) if self.metrics else 2.431
            },
            "weather_condition": condition,
            "weather_icon": condition_icon,
            "weather_color": condition_color
        }

    def predict_rainfall_custom(
        self,
        temperature: float,
        humidity: float,
        pressure: float,
        wind_speed: float,
        month: int = 7,
        day: int = 15
    ):
        """Direct rainfall prediction from custom physical inputs using Stage 2 Linear Regression."""
        if not self.is_ready():
            self.load_models()

        s2_input = pd.DataFrame([{
            'Temperature': float(temperature),
            'Pressure': float(pressure),
            'Humidity': float(humidity),
            'WindSpeed': float(wind_speed),
            'Month': int(month),
            'Day': int(day)
        }])
        s2_scaled = self.s2_scaler.transform(s2_input)
        raw_rainfall = float(self.lr_rainfall.predict(s2_scaled)[0])
        pred_rainfall = float(max(0.0, round(raw_rainfall, 2)))

        return {
            "rainfall": pred_rainfall,
            "unit": "mm",
            "rain_status": "Rain" if pred_rainfall > 0.1 else "No Rain",
            "rain_category": self.get_rainfall_category(pred_rainfall),
            "model_used": "Linear Regression"
        }

    def get_rainfall_category(self, rain: float):
        if rain == 0.0:
            return "No Rain ☀️"
        elif rain <= 2.5:
            return "Light Drizzle 🌦️"
        elif rain <= 10.0:
            return "Moderate Rain 🌧️"
        elif rain <= 25.0:
            return "Heavy Downpour ⛈️"
        else:
            return "Extreme Torrential Rain 🌊"

    def classify_weather(self, temp: float, humidity: float, rain: float, is_summer: bool):
        if rain > 5.0:
            return "Heavy Monsoon Rain", "CloudRain", "text-blue-500"
        elif rain > 0.1:
            return "Scattered Rain Showers", "CloudDrizzle", "text-sky-400"
        elif is_summer and temp >= 35.0:
            return "Scorching Summer Heat", "Sun", "text-amber-500"
        elif is_summer:
            return "Warm Summer Afternoon", "SunMedium", "text-amber-400"
        elif temp <= 27.0:
            return "Cool & Pleasant", "CloudSun", "text-indigo-400"
        else:
            return "Clear & Humid", "Sun", "text-amber-400"

predictor = IndianWeatherPredictor()
