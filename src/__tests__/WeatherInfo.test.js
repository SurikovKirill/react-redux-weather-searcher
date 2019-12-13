import WeatherInfo from '../components/WeatherInfo';
import renderer from 'react-test-renderer';
import React from 'react';

describe('WeatherInfo component', () => {

    test('matches the snapshot when weather != null', () => {
        const city = {
            name: 'Moscow',
            img: 'i',
            temperature: 't',
            wind: 'w',
            cloudiness: 'c',
            pressure: 'p',
            humidity: 'h',
            location: 'l'
        };
        const tree = renderer.create(
           <WeatherInfo weather={city}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('matches the snapshot when weather == null', () => {

        const tree = renderer.create(
            <WeatherInfo weather={null}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});