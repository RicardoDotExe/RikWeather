export default class WheatherAPI {

  static async getWeatherInfo(lat, lon) {
    console.log('si')
    // The API string needs to be parametrized. It should be like IpAPI.
    // Also it would be nice to have the possibility to have the api options in a variable.
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
  }
}