import React from 'react';
import '../containers/FavouriteContainer.css'
import FavouriteCityHeader from './FavouriteCityHeader';
import WeatherInfo from './WeatherInfo';
import Loader from './Loader';
import Error from './Error';

const FavouritesList = ({ cities, isLoading , errors, onRemove}) => (
    <div className='FavList'>
        {
            cities.map((city) => (
                <div key={city.name} className={'FavouriteCity'}>
                    <FavouriteCityHeader onRemove={onRemove} city={city}/>
                    {}
                    { (!errors.includes(city.name)) ? ((!isLoading.includes(city.name) ? <WeatherInfo weather={city}/> : <Loader/>)) : <Error/>}
                </div>
            ))
        }
    </div>
);

FavouritesList.defaultProps = {
    cities: [],
    isLoading: [],
    errors: [],
    onRemove: f => f
};


export default FavouritesList;