export default class WheatherAPI {

  static async getWeatherInfo(lat, lon) {
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
  }

  static getImgYDescTiempo(weather_code, temperature, units) {
    var preUrlMedia = 'src/assets/';
    var imgCode;
    var textWeather;

    if (weather_code == 0) {
      imgCode = '0.png'
      textWeather = 'Soleado'
    } else if (weather_code > 0 && weather_code < 3) {
      imgCode = '1.png'
      textWeather = 'ligeramente nublado'
    } else if (weather_code == 3) {
      imgCode = '3.png'
      textWeather = 'Nublado'
    } else if (weather_code > 3 && weather_code < 51) {
      imgCode = '45.png'
      textWeather = 'Niebla'
    } else if (weather_code > 50 && weather_code < 61) {
      imgCode = '51.png'
      textWeather = 'Llovizna'
    } else if ( weather_code > 60 && weather_code < 71) {
      imgCode = '61.png'
      textWeather = 'Lluvia'
    } else if (weather_code > 70 && weather_code < 95){
      imgCode = '71.png'
      textWeather = 'Nevada'
    } else if (weather_code > 94) {
      imgCode = '95.png'
      textWeather = 'Tormenta'
    }

    return (
      <div className="flex flex-row items-center">
        <img src={preUrlMedia+imgCode} alt={textWeather}></img>
        <div>
          <p className='ml-5 text-2xl'>{textWeather}</p>
          <p className="ml-4 text-5xl" > {temperature} {units}</p>
        </div>
      </div>
      )
  }
}