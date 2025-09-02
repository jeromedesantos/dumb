import { fetchWeather } from "../api/weather";
import { useDebounce } from "../hooks/useDebounce";
import { type Weather } from "../types/weather";
import { useState, useEffect } from "react";

function WeatherApp() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const debouncedCity = useDebounce<string>(city, 500);

  useEffect(() => {
    setWeather(null);
    if (debouncedCity) {
      setLoading(true);
      fetchWeather(debouncedCity)
        .then((res) => {
          setWeather(res);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debouncedCity]);

  return (
    <>
      <h1>Weather APP</h1>
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <>
          <h2>{weather.city}</h2>
          <h2>{weather.temperature}</h2>
        </>
      )}
    </>
  );
}
export default WeatherApp;
