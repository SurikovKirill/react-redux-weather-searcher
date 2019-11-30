
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
            dispatch(addNewCity({name: localStorageCity}));
            const { weather, done } = await WeatherHandler.getWeatherByCityName(localStorageCity);
            if (done) {
                dispatch(updateCity(weather));
                dispatch(addNewCityLoading(localStorageCity, false));
            } else {
                dispatch(loadingError(localStorageCity));
            }
            
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
            dispatch(addNewCity({name: newCity}))
            const { weather, done } = await WeatherHandler.getWeatherByCityName(newCity);
            if (done) {
                //dispatch(addNewCity(weather));
                tmp.push(newCity);
                localStorage.setItem('cities', JSON.stringify(tmp));
                dispatch(updateCity(weather));
                dispatch(addNewCityLoading(newCity, false));  
            } 
            else {
                tmp.push(newCity);
                localStorage.setItem('cities', JSON.stringify(tmp));
                dispatch(loadingError(newCity));
                //dispatch(addNewCityLoading(newCity, false)); 
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

export function updateCity(city) {
    return ({
        type: 'UPDATE_CITY', 
        payload: {city} 
    });
}

export function addNewCityLoading(name, isLoading) {
    return ({
        type: 'ADD_NEW_CITY_LOADING',
        payload: {
            name,
            isLoading
        }
    });
}

export function loadingError(name) {
    return ({
        type: 'LOADING_ERROR',
        payload: {name}
    });
}