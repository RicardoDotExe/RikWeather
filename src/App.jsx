import './App.css';
import { useState, useEffect } from "react";

function App() {

  const [weatherData, setWeatherData] = useState(null);
  

  useEffect(() => {
    // Realiza la solicitud a la API cuando el componente se monta
    fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m')
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud a la API falló');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error al obtener datos del clima:', error);
      });
  }, []);

  
  return (
    <div className="card rounded-xl">
      <div>
        <h1>Madrid</h1>
        <p className="left-0">Spain</p>
        <div className="flex flex-row items-center">
            <img src="media/Sol.png" alt="Hace Sol"></img>
            <p className="ml-4 text-5xl" >  {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="name">Humedad</div>
          <div className="datos"> {weatherData.current.relative_humidity_2m} </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="name">Viento</div>
          <div className="datos"> {weatherData.current.wind_speed_10m} km</div>
        </div>
      </div>
    </div>
  )
}

export default App
