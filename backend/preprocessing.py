"""
Data Preprocessing and Feature Engineering Module
Handles data ingestion, validation, cleaning, temporal decomposition,
and scikit-learn transformation pipelines for temperature prediction.
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
import os

DEFAULT_FEATURES = ['Humidity', 'Pressure', 'WindSpeed', 'CloudCover', 'Rainfall', 'Day', 'Month']
DEFAULT_TARGET = 'Temperature'

def load_and_validate_dataset(csv_path: str):
    """
    Loads weather dataset from CSV, validates basic integrity and parses dates.
    """
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Dataset file not found at {csv_path}")
    
    df = pd.read_csv(csv_path)
    if df.empty:
        raise ValueError("Uploaded dataset is empty.")
    
    # Identify or parse Date column
    date_col = None
    for col in df.columns:
        if 'date' in col.lower() or 'time' in col.lower():
            date_col = col
            break
            
    if date_col:
        try:
            df['ParsedDate'] = pd.to_datetime(df[date_col], errors='coerce')
            if 'Day' not in df.columns:
                df['Day'] = df['ParsedDate'].dt.day.fillna(15).astype(int)
            if 'Month' not in df.columns:
                df['Month'] = df['ParsedDate'].dt.month.fillna(6).astype(int)
        except Exception:
            pass

    return df

def clean_and_prepare_data(df: pd.DataFrame, target_col: str = DEFAULT_TARGET, feature_cols: list = None):
    """
    Cleans missing values and separates features (X) and target (y).
    """
    if feature_cols is None:
        feature_cols = [c for c in DEFAULT_FEATURES if c in df.columns]
    
    if target_col not in df.columns:
        raise ValueError(f"Target column '{target_col}' not found in dataset. Available: {list(df.columns)}")
    
    # Filter only available numeric features
    valid_features = []
    for c in feature_cols:
        if c in df.columns and c != target_col:
            # Ensure it is numeric or convertible
            try:
                df[c] = pd.to_numeric(df[c], errors='coerce')
                valid_features.append(c)
            except Exception:
                continue
                
    if len(valid_features) == 0:
        raise ValueError("No valid numerical features selected for model training.")
        
    df[target_col] = pd.to_numeric(df[target_col], errors='coerce')
    
    # Drop rows where target is missing
    cleaned_df = df.dropna(subset=[target_col]).copy()
    
    X = cleaned_df[valid_features]
    y = cleaned_df[target_col]
    
    return X, y, valid_features, cleaned_df

def create_preprocessing_pipeline():
    """
    Creates an imputation + scaling pipeline for numerical feature inputs.
    """
    pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    return pipeline

def split_weather_data(X, y, test_size: float = 0.20, random_state: int = 42, shuffle: bool = False):
    """
    Splits feature and target matrices into train and held-out test sets.
    By default shuffle=False preserves chronological order to avoid temporal data leakage.
    """
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, shuffle=shuffle
    )
    return X_train, X_test, y_train, y_test

