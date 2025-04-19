const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const reportService = {
  async downloadPlacementReport() {
    const response = await fetch(`${BASE_URL}/api/reports/placement`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication header if needed
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download report');
    }

    return response.blob();
  },

  async getPlacementStats() {
    const response = await fetch(`${BASE_URL}/api/reports/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch placement stats');
    }

    return response.json();
  }
}; 