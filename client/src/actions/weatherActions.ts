// actions/WeatherAction.ts

import axiosInstance from '@/lib/axios';
import { WeatherData, City } from '@/types/weather';

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await axiosInstance.get<{
      success: boolean;
      data: WeatherData;
    }>('/data', {
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
      },
    });
    
    if (!response.data.success) {
      throw new Error('Failed to fetch weather data');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export async function searchCities(query: string): Promise<City[]> {
  try {
  const response = await axiosInstance.get<{
      success: boolean;
      data: City[];
    }>('/cities', {
      params: { q: query },
    });

    if (!response.data.success) {
      throw new Error('Failed to search cities');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error searching cities:', error);
    throw new Error('Failed to search cities');
  }
}