import axios from 'axios';
import {
  AIRVISUAL_API_KEY,
  AIRVISUAL_API_KEY1,
  AIRVISUAL_API_KEY2,
  HANOI_LAT,
  HANOI_LON,
  LANG,
  UNITS,
  WEATHER_API_KEY,
} from './variables';

export const getCurrentWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=${WEATHER_API_KEY}&units=${UNITS}`;
  const response = await axios.get(url);
  return response.data;
};

export const getWeatherForecastFuture = async () => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${HANOI_LAT}&lon=${HANOI_LON}&appid=${WEATHER_API_KEY}&units=${UNITS}&lang=${LANG}`;
  const response = await axios.get(url);
  return response.data;
};

export const getAirQuantity = async () => {
  const keys = [AIRVISUAL_API_KEY, AIRVISUAL_API_KEY1, AIRVISUAL_API_KEY2];
  let data: any = null;

  for (const key of keys) {
    try {
      const url = `http://api.airvisual.com/v2/city?city=Hanoi&state=Hanoi&country=Vietnam&key=${key}`;
      const response = await axios.get(url);
      data = response.data;
      break;
    } catch (error) {
      console.error(`Error occurred with API key ${key}:`, error);
    }
  }

  return data;
};
