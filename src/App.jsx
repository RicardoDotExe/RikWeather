import './App.css';
import { useState, useEffect } from "react";

function App() {

  const [mensajeEspera, setMensajeEspera] = useState(null)
  const [weatherData, setWeatherData] = useState(null);
  const [IPData, setIPData] = useState(null);

  useEffect(() => {
    setMensajeEspera("Cargando datos...")

      fetch("https://ipinfo.io/79.116.62.157?token=567ac2ea1e6487")
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud a la API IP falló');
          }
          return response.json();
        })
        .then(localData => {
          setIPData(localData);
          console.log(localData)
           // Realiza la solicitud a la API del tiempo
           const [lat, lon] = localData.loc.split(',');

           console.log(lat);
           console.log(lon);
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
            .then(response => {
            if (!response.ok) {
              throw new Error('La solicitud a la API falló');
            }
            return response.json(); 
            })
          .then(wData => {
            setWeatherData(wData);
            console.log(wData);
          })
          //Finaliza solicitud a API del tiempo
          .catch(error => {
            console.error('Error al obtener datos del clima:', error);
          });
          })
        .catch(error => {
          console.error('Error al obtener datos del clima:', error);
        });

        console.log("uwu")
     
  }, []);
  
  return (
    <div className="card rounded-xl">
      {weatherData ? (
        <div>
        <h1>{IPData.city}</h1>
        <p className="left-0">Spain</p>
        <div className="flex flex-row items-center">
            <img src="src/assets/Sol.png" alt="Hace Sol"></img>
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
      ) : (<p>{mensajeEspera}</p>
      )}
    </div>
  )
}

export default App
