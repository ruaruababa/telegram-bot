import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
export const AIRVISUAL_API_KEY = process.env.AIRVISUAL_API_KEY;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
export const HANOI_LAT = 21.012463;
export const HANOI_LON = 105.805994;
export const LOCATION = 'Hanoi';
export const UNITS = 'metric';
export const LANG = 'vi';
export const weatherCodesVN = [
  { code: '01d', description: 'Trời quang đãng - Ban ngày' },
  { code: '01n', description: 'Trời quang đãng - Ban đêm' },
  { code: '02d', description: 'Ít mây - Ban ngày' },
  { code: '02n', description: 'Ít mây - Ban đêm' },
  { code: '03d', description: 'Mây rải rác - Ban ngày' },
  { code: '03n', description: 'Mây rải rác - Ban đêm' },
  { code: '04d', description: 'Mây rải rác - Ban ngày' },
  { code: '04n', description: 'Mây rải rác - Ban đêm' },
  { code: '09d', description: 'Mưa rào - Ban ngày' },
  { code: '09n', description: 'Mưa rào - Ban đêm' },
  { code: '10d', description: 'Mưa - Ban ngày' },
  { code: '10n', description: 'Mưa - Ban đêm' },
  { code: '11d', description: 'Giông - Ban ngày' },
  { code: '11n', description: 'Giông - Ban đêm' },
  { code: '13d', description: 'Tuyết - Ban ngày' },
  { code: '13n', description: 'Tuyết - Ban đêm' },
  { code: '50d', description: 'Sương mù - Ban ngày' },
  { code: '50n', description: 'Sương mù - Ban đêm' },
];
