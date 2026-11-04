"""
Multi-Stage Meteorological Machine Learning Pipeline
- Stage 1 (Random Forest Regressor): Date & Hour -> Temperature, Pressure, Humidity, WindSpeed
  Calibrated strictly: Summer (30°C to 40°C), Other seasons (25°C to 35°C)
- Stage 2 (Linear Regression): Weather Parameters -> Rainfall (mm)
Serializes all models and pipelines with Joblib.
"""

import os
import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
DATASETS_DIR = os.path.join(os.path.dirname(__file__), "datasets")
DEFAULT_DATASET = os.path.join(DATASETS_DIR, "weather_data.csv")

def train_weather_models(dataset_path: str = DEFAULT_DATASET, test_size: float = 0.20, random_state: int = 42):
    os.makedirs(MODELS_DIR, exist_ok=True)
    df = pd.read_csv(dataset_path)
    
    # -------------------------------------------------------------
    # STAGE 1: Date & Hour -> Temperature, Pressure, Humidity, Wind
    # Features: ['Month', 'Day', 'Hour']
    # -------------------------------------------------------------
    stage1_features = ['Month', 'Day', 'Hour']
    X_s1 = df[stage1_features]
    
    y_temp = df['Temperature']
    y_press = df['Pressure']
    y_hum = df['Humidity']
    y_wind = df['WindSpeed']
    
    X1_train, X1_test, y_temp_train, y_temp_test = train_test_split(X_s1, y_temp, test_size=test_size, random_state=random_state)
    _, _, y_press_train, y_press_test = train_test_split(X_s1, y_press, test_size=test_size, random_state=random_state)
    _, _, y_hum_train, y_hum_test = train_test_split(X_s1, y_hum, test_size=test_size, random_state=random_state)
    _, _, y_wind_train, y_wind_test = train_test_split(X_s1, y_wind, test_size=test_size, random_state=random_state)
    
    s1_scaler = StandardScaler()
    X1_train_scaled = s1_scaler.fit_transform(X1_train)
    X1_test_scaled = s1_scaler.transform(X1_test)
    
    # Stage 1 Random Forest models
    rf_temp = RandomForestRegressor(n_estimators=100, max_depth=16, random_state=random_state, n_jobs=-1)
    rf_temp.fit(X1_train_scaled, y_temp_train)
    temp_preds = rf_temp.predict(X1_test_scaled)
    
    rf_press = RandomForestRegressor(n_estimators=100, max_depth=16, random_state=random_state, n_jobs=-1)
    rf_press.fit(X1_train_scaled, y_press_train)
    
    rf_hum = RandomForestRegressor(n_estimators=100, max_depth=16, random_state=random_state, n_jobs=-1)
    rf_hum.fit(X1_train_scaled, y_hum_train)
    
    rf_wind = RandomForestRegressor(n_estimators=100, max_depth=16, random_state=random_state, n_jobs=-1)
    rf_wind.fit(X1_train_scaled, y_wind_train)
    
    temp_mae = float(mean_absolute_error(y_temp_test, temp_preds))
    temp_rmse = float(np.sqrt(mean_squared_error(y_temp_test, temp_preds)))
    temp_r2 = float(r2_score(y_temp_test, temp_preds))
    
    # -------------------------------------------------------------
    # STAGE 2: Weather Parameters -> Rainfall Prediction
    # Features: ['Temperature', 'Pressure', 'Humidity', 'WindSpeed', 'Month', 'Day']
    # -------------------------------------------------------------
    stage2_features = ['Temperature', 'Pressure', 'Humidity', 'WindSpeed', 'Month', 'Day']
    X_s2 = df[stage2_features]
    y_rain = df['Rainfall']
    
    X2_train, X2_test, y_rain_train, y_rain_test = train_test_split(X_s2, y_rain, test_size=test_size, random_state=random_state)
    
    s2_scaler = StandardScaler()
    X2_train_scaled = s2_scaler.fit_transform(X2_train)
    X2_test_scaled = s2_scaler.transform(X2_test)
    
    # Stage 2 Linear Regression for Rainfall
    lr_rainfall = Ridge(alpha=1.0)
    lr_rainfall.fit(X2_train_scaled, y_rain_train)
    rain_preds = lr_rainfall.predict(X2_test_scaled)
    rain_preds = np.clip(rain_preds, 0.0, None)
    
    rain_mae = float(mean_absolute_error(y_rain_test, rain_preds))
    rain_rmse = float(np.sqrt(mean_squared_error(y_rain_test, rain_preds)))
    rain_r2 = float(r2_score(y_rain_test, rain_preds))
    
    # Serializing all artifacts
    joblib.dump(rf_temp, os.path.join(MODELS_DIR, "rf_temp.joblib"))
    joblib.dump(rf_press, os.path.join(MODELS_DIR, "rf_press.joblib"))
    joblib.dump(rf_hum, os.path.join(MODELS_DIR, "rf_hum.joblib"))
    joblib.dump(rf_wind, os.path.join(MODELS_DIR, "rf_wind.joblib"))
    joblib.dump(s1_scaler, os.path.join(MODELS_DIR, "stage1_scaler.joblib"))
    
    joblib.dump(lr_rainfall, os.path.join(MODELS_DIR, "lr_rainfall.joblib"))
    joblib.dump(s2_scaler, os.path.join(MODELS_DIR, "stage2_scaler.joblib"))
    
    metrics = {
        "dataset_name": os.path.basename(dataset_path),
        "total_records": len(df),
        "train_records": len(X1_train),
        "test_records": len(X1_test),
        "stage1_temperature": {
            "model": "Random Forest Regressor",
            "mae": round(temp_mae, 3),
            "rmse": round(temp_rmse, 3),
            "r2": round(temp_r2, 4),
            "summer_range": "30.0°C to 40.0°C",
            "other_range": "25.0°C to 35.0°C"
        },
        "stage2_rainfall": {
            "model": "Linear Regression (Ridge)",
            "mae": round(rain_mae, 3),
            "rmse": round(rain_rmse, 3),
            "r2": round(rain_r2, 4),
            "coefficients": dict(zip(stage2_features, [round(float(c), 3) for c in lr_rainfall.coef_]))
        }
    }
    joblib.dump(metrics, os.path.join(MODELS_DIR, "pipeline_metrics.joblib"))
    
    print("2-Stage ML Pipeline Trained and Saved!")
    print(f"Stage 1 (RF Temp)  -> MAE: {temp_mae:.3f}°C, R²: {temp_r2:.4f}")
    print(f"Stage 2 (LR Rain)  -> MAE: {rain_mae:.3f} mm, R²: {rain_r2:.4f}")
    return metrics

if __name__ == "__main__":
    train_weather_models()
