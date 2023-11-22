import './App.css';
import IpAPI from './API/IpAPI';
import WeatherAPI from './API/WeatherAPI';
import { useState, useEffect, useCallback } from "react";

// Advice: Use a formater plugin like prettier and install ESLint to check javascript errors and warnings.
// Check .eslintrc.cjs file in the project's root folder.

function App() {

  // Variable name in spanish 👿
  const [mensajeEspera, setMensajeEspera] = useState(null)
  const [IPData, setIPData] = useState(null)
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // The string should be in a constant.
    setMensajeEspera('Cargando datos. Esperate un ratito.👿')
  }, []);

  const fetchIpData = useCallback(async () => {
    // This not make sense. If the IpAPI has a method named getLocationInfo,
    // it should return the info and not a Response object.
    // Also, you are making the dev to call every time the json method, making it redundant.
    // -> Read line 36 and below for the variable name comment.
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
    // The variable name lead to a misunderstanding because you are not saying what contains the variable.
    // Would be nices if it was called like callWeatherResponse or just response.
    // It is a standard that a response variable has a json method.
    // const response = await WeatherAPI.getWeatherInfo(lat, lon)
    // const dataWeather = await response.json()
    // The same applies in the lines 23-24.
    const callWeatherAPI = await WeatherAPI.getWeatherInfo(lat, lon)
    const dataWeather = await callWeatherAPI.json()
    setWeatherData(dataWeather)
    console.log(dataWeather)
    // Calling this method here do not make sense.
    // Also, because of the variable dataWeather and weatherData naming, you are using both at the bellow line,
    // and it could lead to unexpected behavior.
    WeatherAPI.getImgYDescTiempo(dataWeather.current.weather_code, weatherData.current.temperature_2m, weatherData.current_units.temperature_2m)
    // The vscode warns that useCallback function is missing a dependency because you are using weatherData above.
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
