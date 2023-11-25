import sunnyImg from '../assets/sunny.png'
import slightlyCloudyImg from '../assets/sightlyCloudy.png'
import cloudyImg from '../assets/cloud.png'
import fogImg from '../assets/fog.png'
import freezingDrizzleImg from '../assets/snowgrain.png'
import drizzleImg from '../assets/rain.png'
import rainImg from '../assets/heavyrain.png'
import freezingRainImg from '../assets/snow.png'
import snowFallImg from '../assets/snow.png'
import snowGrainsImg from '../assets/snowgrain.png'
import rainShowersImg from '../assets/heavyRain.png'
import snowShowersImg from '../assets/snow.png'
import thunderstormImg from '../assets/thunderstorm.png'
import thunderstormHailImg from '../assets/thunderstormHail.png'
import 'animate.css';
import '../App.css';

export default class WheatherAPI {

  static async getWeatherInfo(lat, lon) {
    const URL_MAIN = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`

    return await fetch(`${URL_MAIN}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
  }

  static setParamsWeather(weatherData) {
    const paramsWeather = [{ 
      name: 'Humedad',
      result: weatherData.current.relative_humidity_2m
      },
      {
        name: 'Viento',
        result: `${weatherData.current.wind_speed_10m} km`
      }
    ]

    return paramsWeather
  }

  static showImgYDescTiempo(weather_code, temperature, units) {
      const weatherImagesDescrip = [
        {
          img: sunnyImg, 
          text: 'Soleado',
          codes: 0
        },
        {
          img: slightlyCloudyImg,
          text: 'Nubes dispersas',
          codes: [1, 2, 3]
        },
        {
          img: cloudyImg,
          text: 'Nublado',
          codes: 3
        },
        {
          img: fogImg,
          text: 'Niebla',
          codes: [45, 48]
        },
        {
          img: freezingDrizzleImg,
          text: 'Llovizna helada',
          codes: [56, 57]
        },
        {
          img: drizzleImg,
          text: 'Llovizna',
          codes: [51, 53, 55]	
        },
        {
          img: rainImg,
          text: 'Lluvia',
          codes: [61, 63, 65]
        },
        {
          img: freezingRainImg,
          text: 'Lluvia helada',
          codes: [66, 67]
        },
        {
          img: snowFallImg,
          text: 'Nieve',
          codes: [71, 73, 75]
        },
        {
          img: snowGrainsImg,
          text: 'Nieve ligera',
          codes: 77
        },
        {
          img: rainShowersImg,
          text: 'Lluvias',
          codes: [80, 81, 82]
        },
        {
          img: snowShowersImg,
          text: 'Nieve intensa',
          codes: [85, 86]
        },
        {
          img: thunderstormImg,
          text: 'Tormenta',
          codes: 95
        },
        {
          img: thunderstormHailImg,
          text: 'Tormenta con granizo',
          codes: [96, 99]
        }
      ]

    const currentWeather = weatherImagesDescrip.find(current => {
      return Array.isArray(current.codes) ? current.codes.includes(weather_code) : current.codes == weather_code
    })

    return (
      <div className="flex flex-row items-center">
        <img src={currentWeather.img} className="animate__animated animate__bounceIn w-16 h-16"></img>
        <div>
          <p className='ml-5 text-2xl'>{currentWeather.text}</p>
          <p className="ml-4 text-5xl" > {temperature} {units}</p>
        </div>
      </div>
      )
  }

  static showParamsWeather(paramsWeather) {
    return(paramsWeather.map((element, i) => (
      <div key={i} className="grid grid-cols-2 hover:border-x-2 hover:bg-slate-200 rounded-2xl hover:pl-1 hover:pr-1">
        <div className="name">{element.name}</div>
        <div className="datos">{element.result}</div>
      </div>
    )))
  }

}
  