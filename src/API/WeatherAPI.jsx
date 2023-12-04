import React, { useState, useEffect, useCallback } from "react";
import sunnyImg from '../assets/sunny.png'
import sunnyBg from '../assets/Bg_Imgs/bgSunnyDay.jpg'
import slightlyCloudyImg from '../assets/slightlyCloudy.png'
import slightlyCloudyBg from '../assets/Bg_Imgs/bgSlightlyCloudy.png'
import cloudyImg from '../assets/cloud.png'
import cloudyBg from '../assets/Bg_Imgs/bgCloudy.jpg'
import fogImg from '../assets/fog.png'
import fogBg from '../assets/Bg_Imgs/bgFoggy.png'
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

 class WeatherAPI extends React.Component{

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

  static async getWeatherSrc(weather_code) {
      const weatherImagesDescrip = [
        {
          img: sunnyImg,
          text: 'Despejado',
          codes: 0,
          bg: sunnyBg
        },
        {
          img: slightlyCloudyImg,
          text: 'Nubes dispersas',
          codes: [1, 2, 3],
          bg: slightlyCloudyBg
        },
        {
          img: cloudyImg,
          text: 'Nublado',
          codes: 3,
          bg: cloudyBg
        },
        {
          img: fogImg,
          text: 'Niebla',
          codes: [45, 48],
          bg: fogBg
        },
        {
          img: freezingDrizzleImg,
          text: 'Llovizna helada',
          codes: [56, 57],
          bg: sunnyBg
        },
        {
          img: drizzleImg,
          text: 'Llovizna',
          codes: [51, 53, 55],
          bg: sunnyBg
        },
        {
          img: rainImg,
          text: 'Lluvia',
          codes: [61, 63, 65],
          bg: sunnyBg
        },
        {
          img: freezingRainImg,
          text: 'Lluvia helada',
          codes: [66, 67],
          bg: sunnyBg
        },
        {
          img: snowFallImg,
          text: 'Nieve',
          codes: [71, 73, 75],
          bg: sunnyBg
        },
        {
          img: snowGrainsImg,
          text: 'Nieve ligera',
          codes: 77,
          bg: sunnyBg
        },
        {
          img: rainShowersImg,
          text: 'Lluvias',
          codes: [80, 81, 82],
          bg: sunnyBg
        },
        {
          img: snowShowersImg,
          text: 'Nieve intensa',
          codes: [85, 86],
          bg: sunnyBg
        },
        {
          img: thunderstormImg,
          text: 'Tormenta',
          codes: 95,
          bg: sunnyBg
        },
        {
          img: thunderstormHailImg,
          text: 'Tormenta con granizo',
          codes: [96, 99],
          bg: sunnyBg
        }
      ]

    const currentWeather = weatherImagesDescrip.find(current => {
      return Array.isArray(current.codes) ? current.codes.includes(weather_code) : current.codes == weather_code
    })

    return (currentWeather)
  }

  static showParamsWeather(paramsWeather) {
    return(
      <div className=" bg-cyan-800 bg-opacity-40 rounded-xl p-1">
      {paramsWeather.map((element, index) => (
      <div key={element.name} className={`grid grid-cols-2 ml-7 mr-7 ${index !== paramsWeather.length - 1 ? ' border-b-2 border-white' : ''}`}>
        <div className="name">{element.name}</div>
        <div className="datos">{element.result}</div>
      </div>
    ))}
    </div>)
  }

  render() {
    const srcWeatherData = this.props.srcWeatherData;
    const currentTemperature = this.props.currentTemperature
    const currentUnits = this.props.currentUnits

    return (

      <div className="flex justify-center">
        <div className="mb-3 p-5 inline-block bg-cyan-800 rounded-xl bg-opacity-40">
          <div className="flex flex-row items-center justify-center">
            <img src={srcWeatherData.img} className="animate__animated animate__bounceIn w-16 h-16"></img>
            <div>
              <p className='ml-5 text-2xl'>{srcWeatherData.text}</p>
              <p className="ml-4 text-5xl" >{currentTemperature} {currentUnits}</p>
            </div>
          </div>
        </div>
      </div>
      
    )
  }

}

export default WeatherAPI;