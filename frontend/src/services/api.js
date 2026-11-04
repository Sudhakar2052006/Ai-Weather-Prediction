/**
 * API Service Layer for Pan-India Weather & Rainfall Prediction
 * Connects to the FastAPI backend at http://127.0.0.1:8000
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

async function fetchJson(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      let errorMsg = `Server error (${response.status})`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.detail || errorMsg;
      } catch {
        // fallback
      }
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const weatherApi = {
  // System Health
  async getHealth() {
    return fetchJson('/api/health');
  },

  // Indian States & Constituencies
  async getLocations() {
    return fetchJson('/api/locations');
  },

  // 2-Stage Pan-India Weather & Rainfall Prediction Pipeline
  async predictStagePipeline(payload) {
    return fetchJson('/api/predict-stage-pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  // Direct Rainfall Prediction from physical weather parameters
  async predictRainfall(payload) {
    return fetchJson('/api/predict-rainfall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  // Weather Analysis Dataset Summary
  async getDatasetSummary() {
    return fetchJson('/api/dataset-summary');
  },

  // Prediction History
  async getPredictionHistory() {
    return fetchJson('/api/prediction-history');
  },

  // Export CSV URLs
  getExportHistoryUrl() {
    return `${BASE_URL}/api/export-history`;
  },

  getDownloadSampleCsvUrl() {
    return `${BASE_URL}/api/download-sample-csv`;
  },
};
