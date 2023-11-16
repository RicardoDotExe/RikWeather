# APP CURRENT WEATHER

Develop a WebApp that shows the actual weather in the actual location. The actual location must be obtain with the IP address.

Weather API: https://open-meteo.com/en/docs

_The API is free with a cap of 10'000 requests._

## Design

The web design should be as close as possible to the following Figma design:

- [Figma design](https://www.figma.com/file/4CjDBeUOxwDnUjF01CuCxP/Weather-Forecast-(Community)?type=design&node-id=0%3A1&mode=design&t=ije4fGuslXt7KA9o-1)

Note: The Sun icon is orientative. The should be changing to match the actual weather (rain, sunny, cloudy).

## Requirements

Feel free to use the frameworks/libraries that you like. The only requirements are the following:

- App develop with `react`.
- Create the project with [Vite](https://vitejs.dev/) or any framework or tool that uses Vite for the bundle and compilation.
- The project must use `git` for the control version. Upload to Github or Gitlab.
- Remember, you can use whatever the framework/libraries you like. But all the above requirements have to be compatible with the libraries or frameworks you use.

## Nice to have

- Use Tailwind
- Use of Docker for the develop environment.
- Hourly weather info for the current location (only the next 12 hours).
- Implements cache for the requests. It should not make the request if the data will be the same.
- Testing for the React components and app.
- Readme with the instructions for the project execution.+-