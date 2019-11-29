
import WeatherHandler from './WeatherHandler';


export function initCities() {
    return async (dispatch) => {
        let cities = localStorage.getItem('cities');
        cities = JSON.parse(cities);
        if (cities === null){
            cities = [];
        }
        cities.map(async localStorageCity => {
            dispatch(addNewCityLoading(localStorageCity, true));
            const { weather, done } = await WeatherHandler.getWeatherByCityName(localStorageCity);
            if (done) {
                dispatch(addNewCity(weather));
            } else {
                dispatch(loadingError(localStorageCity));
            }
            dispatch(addNewCityLoading(localStorageCity, false));
        });
    };
}

export function addNewCityAsync(newCity) {
    return async (dispatch) => {
        let tmp = localStorage.getItem('cities');
        tmp = JSON.parse(tmp);
        if (tmp === null){
            tmp = [];
        }
        if (tmp.includes(newCity)){
            alert("Такой город уже существует в списке"); 
            return;
        }
        else{
            dispatch(addNewCityLoading(newCity, true));
            const { weather, done } = await WeatherHandler.getWeatherByCityName(newCity);
            if (done) {
                dispatch(addNewCity(weather));
                tmp.push(newCity);
                localStorage.setItem('cities', JSON.stringify(tmp));
                dispatch(addNewCityLoading(newCity, false));  
            } 
            else {
                dispatch(loadingError(newCity));
            }
        }
    };
}

export function addNewCity(city) {
    return ({
        type: 'ADD_NEW_CITY', 
        payload: {city}
    });
}

export function removeCity(name) {
    let tmp = localStorage.getItem('cities');
    tmp = JSON.parse(tmp);
    tmp.splice(tmp.findIndex(c => c === name), 1);
    localStorage.setItem('cities', JSON.stringify(tmp));
    return ({
        type: 'REMOVE_CITY', 
        payload: {name} 
    });
}

export function addNewCityLoading(name, isLoading) {
    return {
        type: 'ADD_NEW_CITY_LOADING',
        payload: {
            name,
            isLoading
        }
    };
}

export function loadingError(name) {
    return {
        type: 'LOADING_ERROR',
        payload: {name}
    }
}