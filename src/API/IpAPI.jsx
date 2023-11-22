export default class IpAPI {

    static URL_MAIN = 'https://ipinfo.io/'
    // Move the token to a .env file and get it from there.
    static TOKEN = '567ac2ea1e6487'

    static async getLocationInfo(ip = '79.116.62.157' ) {
        console.log('prelink')
        const URL_FINAL = `${this.URL_MAIN}${ip}?token=${this.TOKEN}`
        return await fetch(URL_FINAL);
    }
}
