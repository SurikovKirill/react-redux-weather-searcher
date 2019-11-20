import WeatherHandler from './WeatherHandler';



export function initWeather() {
    return async (dispatch) => {
        dispatch(loadingStart());
        const { weather, error } = await WeatherHandler.geolocationWeather();
        console.log(weather);
        console.log(error);
        if (error) {
            dispatch(loadingSuccess(weather));
        } else {
            dispatch(loadingError());
        }
    };
}

export function loadingStart() {
    return ({
        type: 'CITY_LOADING' ,
        payload: { isLoading: true }
    });
}

export function loadingSuccess(weather) {
    return ({
        type: 'CITY_LOADING_SUCCESS', 
        payload: {
            isLoading: false,
            error: false, 
            weather: weather
        }
    });
}
export function loadingError() {
    return ({
        type: 'CITY_LOADING_ERROR',
        payload: { 
            isLoading: false, 
            error: true 
        }
    });
}