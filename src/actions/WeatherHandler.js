const url = 'https://api.openweathermap.org/data/2.5/weather';
const APIkey = 'b50d06cf0be2ceacf57cf97451e6a7af';
const DEFAULT_LATITUDE = '10.00';
const DEFAULT_LONGITUDE = '10.00';

export default class WeatherHandler {
    static geolocationWeather = async () => {
        const location = await WeatherHandler.getLocation();
        return await WeatherHandler.getWeatherByLocation(location);
    };

    static getLocation = async () => {
        let position = null;
        try {
            position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
        } catch (e) {
            console.log(`Error ${e}`);
        }
        return {
            lat: position ? position.coords.latitude.toFixed(2) : DEFAULT_LATITUDE,
            lon: position ? position.coords.longitude.toFixed(2) : DEFAULT_LONGITUDE,
        };
    };

    static async getWeatherByLocation(location) {
        console.log(`${url}?lat=${location.lat}&lon=${location.lon}&APPID=${APIkey}`);
        let response  = await fetch(`${url}?lat=${location.lat}&lon=${location.lon}&APPID=${APIkey}`);
        return WeatherHandler.parseWeatherData(response);
    }

    static async getWeatherByCityName(name) {
        let response = await fetch(`${url}?q=${name}&APPID=${APIkey}`).catch();
        return WeatherHandler.parseWeatherData(response);
    }

    static parseWeatherData = async (response) => {
        if (response.ok) {
            let data = await response.json();
            return ({
                weather : {
                    name: data.name,
                    img: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                    temperature: (data.main.temp - 273.15).toFixed(0) + '°C',
                    pressure: data.main.pressure + ' hpa',
                    humidity: data.main.humidity + ' %',
                    wind: data.wind.speed + ' m/s',
                    cloudiness: data.weather[0].description,
                    location: '[' + data.coord.lat + ',' + data.coord.lon + ']',
                },
                done: response.ok,
            });
        }
        else {
            return ({
                weather: {},
                done: response.ok,
            });
        }
        
    }
}