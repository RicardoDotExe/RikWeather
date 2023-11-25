import './App.css';
import IpAPI from './API/IpAPI';
import WeatherAPI from './API/WeatherAPI';
import { useState, useEffect, useCallback } from "react";

function App() {

  const [mensajeEspera, setMensajeEspera] = useState(null)
  const [IPData, setIPData] = useState(null)
  const [weatherData, setWeatherData] = useState(null);
  const [paramsWeather, setParamsWeather] = useState(null)
  const intlEs = new Intl.DisplayNames(["es-ES"], { type: "region" });

  useEffect(() => {
    setMensajeEspera('Cargando datos. Esperate un ratito.👿')
  }, []);

  const fetchIpData = useCallback(async () => {
    const response = await IpAPI.getLocationInfo()
    const dataIP = await response.json()
    setIPData(dataIP)
  }, []);

  const fetchWeatherData = useCallback(async () => {
    if (!IPData) {
      return false;
    }

    const [lat, lon] = IPData.loc.split(",");
    console.log([lat, lon])
    const response = await WeatherAPI.getWeatherInfo(lat, lon)
    const dataWeather = await response.json()
    setWeatherData(dataWeather)
    console.log(dataWeather)
    setParamsWeather(WeatherAPI.setParamsWeather(dataWeather))
  }, [IPData])

  useEffect(() => {
    fetchIpData()
  }, [fetchIpData]);

  useEffect(() => {
    fetchWeatherData()
  }, [fetchWeatherData])

  return (
    <div className="card mx-auto rounded-xl">
      {weatherData ? (
        <div>
          <div className="flex items-end">
          <h1>{IPData.city}</h1> <p className="text-slate-600">{intlEs.of(IPData.country)}</p>
          </div>
          {WeatherAPI.showImgYDescTiempo(weatherData.current.weather_code, weatherData.current.temperature_2m, weatherData.current_units.temperature_2m)}
          {WeatherAPI.showParamsWeather(paramsWeather)}
        </div>
      ) : (<p>{mensajeEspera}</p>
      )}
    </div>
  )
}

export default App
