import React from 'react';
import './CityContainer.css'
import WeatherInfo from '../components/WeatherInfo';
import Loader from '../components/Loader';
import CityComponent from '../components/CityComponent'
import Error from '../components/Error';

export default class CityContainer extends React.Component {
    render() {
        const { weather, isLoading, error } = this.props;
        return (
            <div className="Main">
                { !error ?
                    (isLoading
                    ? <Loader />
                    : (
                        <>
                            <CityComponent weather={weather} />
                            <WeatherInfo weather={weather} />
                        </>
                    ))
                    :
                    <Error />
                }
            </div>
        );
    }
}