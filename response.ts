import { GoogleGenerativeAI } from '@google/generative-ai';
import dayjs from 'dayjs';
import { getAirQuantity } from './serivce';
import { GOOGLE_API_KEY, weatherCodesVN } from './variables';

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const assistantCurrentWeather = async () => {
  try {
    const res = await getAirQuantity();
    if (res) {
      const prompt = `Như một chuyên gia về thời tiết dựa vào dữ liệu : ${JSON.stringify(
        {
          city: res?.data?.city,
          ...res?.data?.current?.weather,
          ...res?.data?.current?.pollution,
          time: dayjs(res.data?.current?.pollution.ts).format(
            'HH giờ DD/MM/YYYY'
          ),
          weatherConditionCode: weatherCodesVN.find(
            (item) => item.code === res?.data?.current?.weather?.ic
          )?.description,
        }
      )} Đưa ra lời khuyên cho người di chuyển ngoài trời bằng xe máy.
          Trả lời với format:
          địa điểm thời gian
          nội dung thời tiết nhiệt độ, độ ẩm, tốc độ gió
          Mức độ ô nhiễm không khí và chỉ số,
          lời khuyên nên mặc gì
          lời khuyên mang dụng cụ gì.
          Ngắn gọn, không cách dòng, k sử dụng ký tự ** và ký tự đặc biệt.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return text;
    }

    return 'Không có dữ liệu';
  } catch (error) {
    console.error('Error occurred:', error);
    return 'Error occurred';
  }
};
1;
