
export default class IPLocationAPI {
    static MAIN_URL = 'https://ipinfo.io/'
    static TOKEN = '567ac2ea1e6487'

    static async getCurrentLocation(ip = '79.116.62.157') {
        const currentUrl = `${IPLocationAPI.MAIN_URL}${ip}?token=${IPLocationAPI.TOKEN}`;
        return await fetch(currentUrl);
    }
}