import { useState, useEffect } from "react";

function WheatherAPI() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
      // Realiza la solicitud a la API cuando el componente se monta
      fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,weather_code,visibility')
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
      <div className=" bg-white">
        {weatherData ? (
          <div>
            <h2>Información del clima</h2>
            <p>Temperatura: {weatherData.hourly.temperature_2m[0]} °C</p>
            <p>Condiciones:  </p>
            {/* Agrega más información según lo que devuelva la API */}
          </div>
        ) : (
          <p>Cargando datos del clima...</p>
        )}
      </div>
    );
  }

  export default WheatherAPI;