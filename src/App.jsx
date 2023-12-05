import './App.css';
import IpAPI from './API/IpAPI';
import WeatherAPI from './API/WeatherAPI';
import { useState, useEffect, useCallback } from "react";

function App() {

  const [mensajeEspera, setMensajeEspera] = useState(null)
  const [IPData, setIPData] = useState(null)
  const [weatherData, setWeatherData] = useState(null);
  const [paramsWeather, setParamsWeather] = useState(null)
  const [srcWeatherData, setSrcWeatherData] = useState(null)
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
    const response = await WeatherAPI.getWeatherInfo(lat, lon)
    const dataWeather = await response.json()
    setWeatherData(dataWeather)
    setParamsWeather(WeatherAPI.setParamsWeather(dataWeather))
    const currentWeatherSrc = (await WeatherAPI.getWeatherSrc(dataWeather.current.weather_code))
    setSrcWeatherData(currentWeatherSrc)
    console.log(dataWeather)
  }, [IPData])

  useEffect(() => {
    fetchIpData()
  }, [fetchIpData]);

  useEffect(() => {
    fetchWeatherData()
  }, [fetchWeatherData])

  return (
      (weatherData && srcWeatherData) ? (
        <div className="bg-cover bg-center max-w-sm mx-auto rounded-xl p-4" style={{ backgroundImage: `url(${srcWeatherData.bg})` }}>
         <div className="text-center p-2">
            <p className=" text-6xl p-0">{IPData.city}</p> 
            <p className=" text-slate-800 text-xl">{intlEs.of(IPData.country)}</p>
          </div>
          <WeatherAPI srcWeatherData={srcWeatherData}  currentTemperature={weatherData.current.temperature_2m} currentUnits={weatherData.current_units.temperature_2m} />
          {WeatherAPI.showParamsWeather(paramsWeather)}
        </div>
    ) : (<div className="bg-white"><p>{mensajeEspera}</p></div>
  ))
}

export default App
