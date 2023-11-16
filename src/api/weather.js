
export default class WeatherAPI {
    static MAIN_URL = 'https://api.open-meteo.com/v1/'

    static async getCurrentWeather(
        lat,
        lon,
        options = {
            temperature: '2m',
            relativeHumidity: '2m',
            windSpeed: '10m'
        }
    ) {
        const { temperature, relativeHumidity, windSpeed } = options
        const currentUrl = `${WeatherAPI.MAIN_URL}forecast?latitude=${lat}&longitude=${lon}&current=temperature_${temperature},relative_humidity_${relativeHumidity},weather_code,wind_speed_${windSpeed}`;
        return await fetch(currentUrl);
    }
}