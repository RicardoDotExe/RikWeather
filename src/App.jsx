import './App.css';
import IpAPI from './API/IpAPI';
import WeatherAPI from './API/WeatherAPI';
import { useState, useEffect, useCallback } from "react";

function App() {

  const [mensajeEspera, setMensajeEspera] = useState(null)
  const [IPData, setIPData] = useState(null)
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    setMensajeEspera('Cargando datos. Esperate un ratito.👿')
  }, []);

  const fetchIpData = useCallback(async () => {
    const callIpData = await IpAPI.getLocationInfo()
    const dataIP = await callIpData.json()
    setIPData(dataIP)
    console.log(dataIP)
  }, []);

  const fetchWeatherData = useCallback(async () => {
    if (!IPData) {
      return false;
    }

    const [lat, lon] = IPData.loc.split(",");
    console.log([lat, lon])
    const callWeatherAPI = await WeatherAPI.getWeatherInfo(lat, lon)
    const dataWeather = await callWeatherAPI.json()
    setWeatherData(dataWeather)
    console.log(dataWeather)
    WeatherAPI.getImgYDescTiempo(dataWeather.current.weather_code, weatherData.current.temperature_2m, weatherData.current_units.temperature_2m)
  }, [IPData])

  useEffect(() => {
    fetchIpData()
  }, [fetchIpData]);

  useEffect(() => {
    fetchWeatherData()
  }, [fetchWeatherData])

  return (
    <div className="card rounded-xl">
      {weatherData ? (
        <div>
        <h1>{IPData.city}</h1>
        <p className="left-0">{IPData.country}</p>
        {WeatherAPI.getImgYDescTiempo(weatherData.current.weather_code, weatherData.current.temperature_2m, weatherData.current_units.temperature_2m)}
        <div className="grid grid-cols-2">
          <div className="name">Humedad</div>
          <div className="datos"> {weatherData.current.relative_humidity_2m} </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="name">Viento</div>
          <div className="datos"> {weatherData.current.wind_speed_10m} km</div>
        </div>
        </div>
      ) : (<p>{mensajeEspera}</p>
      )}
    </div>
  )
}

export default App
