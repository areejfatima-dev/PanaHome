import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

interface PricePrediction {
  estimatedPrice: number;
  confidence: number;
  comparableProperties: number;
}

export async function getPriceRecommendation(propertyData: {
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
}): Promise<PricePrediction> {
  try {
    const response = await axios.post(`${API_BASE_URL}/price/predict`, propertyData);
    return response.data;
  } catch (error) {
    console.error('Price recommendation error:', error);
    throw error;
  }
}

export async function getPriceTrend(location: string, propertyType: string): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/price/trend`, {
      params: { location, propertyType },
    });
    return response.data;
  } catch (error) {
    console.error('Price trend error:', error);
    throw error;
  }
}