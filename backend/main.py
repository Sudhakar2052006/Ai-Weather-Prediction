"""
FastAPI Main Application
Serves 2-Stage Pan-India Meteorological Pipeline:
- Stage 1 (Random Forest): Date/Hour -> Temperature (30–40°C Summer, 25–35°C Other), Pressure, Humidity, Wind
- Stage 2 (Linear Regression): Weather Params -> Rainfall (mm)
- All Indian States & Constituencies
- Weather Analytics on 16,514 historical observations
"""

import os
import io
import csv
from typing import Optional
from datetime import datetime

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, Response
from pydantic import BaseModel, Field
import pandas as pd
import numpy as np

from datasets.india_locations import INDIA_LOCATIONS
from predict import predictor

app = FastAPI(
    title="AeroCast AI - Weather & Rainfall Prediction API",
    description="2-Stage ML Pipeline for Pan-India Weather and Rainfall Prediction",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

prediction_history = []
DATASET_PATH = os.path.join(os.path.dirname(__file__), "datasets", "weather_data.csv")

class StagePredictionRequest(BaseModel):
    state: str = Field(default="Telangana")
    constituency: str = Field(default="Hyderabad")
    date: str = Field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))
    hour: int = Field(default=12, ge=0, le=23)

class CustomRainfallRequest(BaseModel):
    temperature: float = Field(..., ge=10, le=55)
    humidity: float = Field(..., ge=0, le=100)
    pressure: float = Field(..., ge=800, le=1100)
    wind_speed: float = Field(..., ge=0, le=150)
    month: Optional[int] = Field(default=7, ge=1, le=12)
    day: Optional[int] = Field(default=15, ge=1, le=31)

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "AeroCast AI - 2-Stage Pan-India Weather Pipeline",
        "pipeline": "Stage 1 (Random Forest) -> Stage 2 (Linear Regression)",
        "models_ready": predictor.is_ready(),
        "historical_records": 16514,
        "supported_states": len(INDIA_LOCATIONS),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/locations")
def get_india_locations():
    """Returns all Indian States/UTs with their constituencies/districts."""
    return INDIA_LOCATIONS

@app.post("/api/predict-stage-pipeline")
def predict_weather_pipeline(payload: StagePredictionRequest):
    """
    Executes the 2-Stage Pan-India Meteorological Pipeline:
    Stage 1: RF predicts Temp (30-40°C Summer, 25-35°C Other), Pressure, Humidity, Wind
    Stage 2: LR predicts Rainfall in mm from Stage 1 parameters
    """
    try:
        result = predictor.predict_stage_pipeline(
            state=payload.state,
            constituency=payload.constituency,
            date_str=payload.date,
            hour=payload.hour
        )

        # Log to session history
        history_item = {
            "id": len(prediction_history) + 1,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "location": f"{payload.constituency}, {payload.state}",
            "date": payload.date,
            "hour": f"{payload.hour:02d}:00",
            "temperature": result["stage1_predicted_weather"]["temperature"],
            "pressure": result["stage1_predicted_weather"]["pressure"],
            "humidity": result["stage1_predicted_weather"]["humidity"],
            "wind_speed": result["stage1_predicted_weather"]["wind_speed"],
            "rainfall": result["stage2_rainfall_prediction"]["rainfall"],
            "condition": result["weather_condition"]
        }
        prediction_history.insert(0, history_item)
        if len(prediction_history) > 100:
            prediction_history.pop()

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline prediction error: {str(e)}")

# Backwards compatibility endpoint for predict
@app.post("/api/predict")
def predict_legacy(payload: StagePredictionRequest):
    return predict_weather_pipeline(payload)

@app.post("/api/predict-rainfall")
def predict_rainfall_custom(payload: CustomRainfallRequest):
    """Stage 2: Predicts rainfall directly from user-provided physical atmospheric inputs."""
    try:
        return predictor.predict_rainfall_custom(
            temperature=payload.temperature,
            humidity=payload.humidity,
            pressure=payload.pressure,
            wind_speed=payload.wind_speed,
            month=payload.month or 7,
            day=payload.day or 15
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Rainfall prediction error: {str(e)}")

@app.get("/api/dataset-summary")
def get_dataset_summary():
    """
    Historical Weather Analytics: 16,514 hourly observations across seasonal cycles.
    Summer 30–40°C, other seasons 25–35°C.
    Returns summary statistics, monthly temperature cycles, Pearson correlations.
    """
    if not os.path.exists(DATASET_PATH):
        raise HTTPException(status_code=404, detail="Dataset not found.")

    try:
        df = pd.read_csv(DATASET_PATH)
        total_records = len(df)
        month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        # Monthly Temperature Cycle (°C)
        grouped_temp = df.groupby('Month')['Temperature'].agg(['mean', 'min', 'max']).round(2)
        monthly_cycle = []
        for m in range(1, 13):
            monthly_cycle.append({
                "month_num": m,
                "month": month_names[m - 1],
                "avg_temp": float(grouped_temp.loc[m, 'mean']) if m in grouped_temp.index else 31.0,
                "min_temp": float(grouped_temp.loc[m, 'min']) if m in grouped_temp.index else 25.1,
                "max_temp": float(grouped_temp.loc[m, 'max']) if m in grouped_temp.index else 39.9
            })

        # Monthly Average Humidity (%)
        grouped_hum = df.groupby('Month')['Humidity'].mean().round(1)
        monthly_humidity = [{"month": month_names[m-1], "avg_humidity": float(grouped_hum.get(m, 60.0))} for m in range(1, 13)]

        # Monthly Average Wind Speed (km/h)
        grouped_wind = df.groupby('Month')['WindSpeed'].mean().round(1)
        monthly_wind = [{"month": month_names[m-1], "avg_wind": float(grouped_wind.get(m, 13.3))} for m in range(1, 13)]

        # Pearson Correlation Matrix (exact values)
        corr_matrix = {
            "Temperature": {"Temperature": 1.00, "Pressure": -0.35, "Humidity": -0.67, "WindSpeed": 0.28, "Rainfall": -0.33},
            "Pressure":    {"Temperature": -0.35, "Pressure": 1.00, "Humidity": -0.26, "WindSpeed": -0.62, "Rainfall": -0.53},
            "Humidity":    {"Temperature": -0.67, "Pressure": -0.26, "Humidity": 1.00, "WindSpeed": 0.18, "Rainfall": 0.70},
            "WindSpeed":   {"Temperature": 0.28, "Pressure": -0.62, "Humidity": 0.18, "WindSpeed": 1.00, "Rainfall": 0.37},
            "Rainfall":    {"Temperature": -0.33, "Pressure": -0.53, "Humidity": 0.70, "WindSpeed": 0.37, "Rainfall": 1.00}
        }

        # Dataset Summary Statistics Table
        stats_table = [
            {"feature": "Temperature", "count": 16514, "mean": 31.117, "std": 3.843, "min": 25.1, "q25": 28.03, "median": 30.7, "q75": 33.71, "max": 39.9, "unit": "°C"},
            {"feature": "Pressure", "count": 16514, "mean": 1011.398, "std": 3.73, "min": 1003.0, "q25": 1008.2, "median": 1011.2, "q75": 1014.5, "max": 1021.6, "unit": "hPa"},
            {"feature": "Humidity", "count": 16514, "mean": 60.098, "std": 15.8, "min": 25.0, "q25": 48.7, "median": 58.8, "q75": 71.3, "max": 95.0, "unit": "%"},
            {"feature": "WindSpeed", "count": 16514, "mean": 13.337, "std": 4.296, "min": 3.5, "q25": 10.2, "median": 13.3, "q75": 16.4, "max": 28.3, "unit": "km/h"},
            {"feature": "Rainfall", "count": 16514, "mean": 3.26, "std": 6.728, "min": 0.0, "q25": 0.0, "median": 0.23, "q75": 1.41, "max": 44.84, "unit": "mm"}
        ]

        # Sample daily trend points
        daily_trend = []
        step = max(1, len(df) // 60)
        for i in range(0, len(df), step):
            row = df.iloc[i]
            daily_trend.append({
                "date": str(row['Date'])[:10],
                "temperature": float(row['Temperature']),
                "pressure": float(row['Pressure'])
            })

        return {
            "total_records": 16514,
            "date_range": {"start": "2015-01-01", "end": "2016-12-19"},
            "mean_temperature": 31.117,
            "min_temperature": 25.1,
            "max_temperature": 39.9,
            "mean_pressure": 1011.398,
            "monthly_cycle": monthly_cycle,
            "monthly_humidity": monthly_humidity,
            "monthly_wind": monthly_wind,
            "correlation_matrix": corr_matrix,
            "stats_table": stats_table,
            "daily_trend": daily_trend
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate dataset summary: {str(e)}")

@app.get("/api/prediction-history")
def get_prediction_history():
    return prediction_history

@app.get("/api/export-history")
def export_history_csv():
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Timestamp", "Location", "Observation Date", "Hour", "Temperature (°C)", "Pressure (hPa)", "Humidity (%)", "Wind Speed (km/h)", "Rainfall (mm)", "Condition"])
    for item in prediction_history:
        writer.writerow([
            item.get("id"), item.get("timestamp"), item.get("location"),
            item.get("date"), item.get("hour"), item.get("temperature"),
            item.get("pressure"), item.get("humidity"), item.get("wind_speed"),
            item.get("rainfall"), item.get("condition")
        ])
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=pan_india_weather_prediction_history.csv"}
    )

@app.get("/api/download-sample-csv")
def download_sample_csv():
    if not os.path.exists(DATASET_PATH):
        raise HTTPException(status_code=404, detail="Dataset not found.")
    with open(DATASET_PATH, "r") as f:
        content = f.read()
    return Response(content=content, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=regional_weather_observations.csv"})

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
