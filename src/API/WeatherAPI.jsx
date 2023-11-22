// Example of asset import:
// import sunnyImg from '../assets/0.png';

export default class WheatherAPI {

  static async getWeatherInfo(lat, lon) {
    // The API string needs to be parametrized. It should be like IpAPI.
    // Also it would be nice to have the possibility to have the api options in a variable.
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
  }

  static getImgYDescTiempo(weather_code, temperature, units) {
    // Don't use var, use let or const.
    // https://www.freecodecamp.org/espanol/news/var-let-y-const-cual-es-la-diferencia/

    // Import assets like a javascript module
    // https://create-react-app.dev/docs/adding-images-fonts-and-files/
    // Or add them as a css class for each asset.
    var preUrlMedia = 'src/assets/';
    var imgCode;
    var textWeather;

    // The images should be svg or png with trasnparent background.
    // You can solve that so much better with an array of objects:
    // *The codes were obtained from https://open-meteo.com/en/docs at the final of the page.
    // **And think about how you can use the following array with objects.
    /*
      const weatherImages = [
        {
          img: sunnyImg, <- imported file in the line 2.
          text: 'sunny',
          codes: 0
        },
        {
          img: slightlyCloudyImg,
          text: 'slightly cloudy',
          codes: [1, 2, 3]
        },
        {
          img: cloudyImg,
          text: 'cloudy',
          codes: 3
        },
        {
          img: fogImg,
          text: 'fog',
          codes: [45, 48]
        },
        {
          img: drizzleImg,
          text: 'drizzle',
          codes: [56, 57]
        },
        ...
      ]
    */
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
        {
          /* 
            Use template string for the string concatenation
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
          */
        }
        <img src={preUrlMedia+imgCode} alt={textWeather}></img>
        <div>
          <p className='ml-5 text-2xl'>{textWeather}</p>
          <p className="ml-4 text-5xl" > {temperature} {units}</p>
        </div>
      </div>
      )
  }
}