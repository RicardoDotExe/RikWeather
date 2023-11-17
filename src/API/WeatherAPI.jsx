export default class WheatherAPI {

  static async getWeatherInfo(lat, lon) {
    console.log('si')
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
  }
}