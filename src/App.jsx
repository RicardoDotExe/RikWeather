import "./App.css";
import { useState, useEffect, useCallback } from "react";
import WeatherAPI from "./api/weather";
import IPLocationAPI from "./api/ip_location";

import SunIcon from "./assets/sun_icon.svg"

const IP_DEFAULT = "101.44.211.124";

function App() {
  const intlEs = new Intl.DisplayNames(["es-ES"], { type: "region" });

  const [ipData, setIpData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchIpData = useCallback(async () => {
    const data = await IPLocationAPI.getCurrentLocation(IP_DEFAULT);
    const json = await data.json();
    setIpData(json);
  }, []);

  const fetchWeatherData = useCallback(async () => {
    if (!ipData) {
      return false;
    }

    const [lon, lan] = ipData.loc.split(",");
    const data = await WeatherAPI.getCurrentWeather(lon, lan);
    const json = await data.json();
    setWeatherData(json);
  }, [ipData]);

  useEffect(() => {
    fetchIpData();
  }, [fetchIpData]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  console.log("ipData", ipData);
  console.log("weatherData", weatherData);

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-x-hidden overflow-y-auto bg-white">
      {!weatherData ? (
        <svg
          className="animate-spin h-24 w-24 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <div className="grid gap-12 min-w-[50%]">
          <div className="flex flex-col gap-2 p-14">
            <h1 className="text-[#181818] text-5xl font-bold">{ipData.city}</h1>
            <p className="text-[#D1D1D1] font-semibold">
              {intlEs.of(ipData.country)}
            </p>
          </div>
          <div className="flex flex-col gap-8 min-w-[260px] p-12 rounded-2xl bg-[#F9F9F9]">
            <div className="flex flex-nowrap items-center">
              <img src={SunIcon} className="w-24 h-24" alt="Hace Sol"></img>
              <p className="ml-4 text-5xl font-bold text-[#4B4B4B]">
                {weatherData.current.temperature_2m}{" "}
                {weatherData.current_units.temperature_2m[0]}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between py-2 px-4 border-2 border-[#F1F1F1] rounded-xl">
                <p className="text-[#4E2B00] text-sm font-bold">Humedad</p>
                <p className="text-[#4E2B00] text-sm font-bold">
                  {weatherData.current.relative_humidity_2m}
                </p>
              </div>
              <div className="flex justify-between py-2 px-4">
                <p className="text-[#4E2B00] text-sm font-bold">Viento</p>
                <p className="text-[#4E2B00] text-sm font-bold">
                  {weatherData.current.wind_speed_10m} km
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
