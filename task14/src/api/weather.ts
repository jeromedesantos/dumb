import { type Weather } from "../types/weather";

export async function fetchWeather(city: string): Promise<Weather> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city,
        temperature: 20 + Math.floor(Math.random() * 30) + 10,
      });
    }, 1000);
  });
}
