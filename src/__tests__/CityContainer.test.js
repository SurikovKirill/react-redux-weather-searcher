import renderer from 'react-test-renderer';
import React from 'react';
import CityContainer from '../containers/CityContainer';

let city;
beforeEach(() => {
    city = {
        isLoading: false,
        weather: {
            name: 'Moscow',
            img: 'i',
            temperature: 't',
            wind: 'w',
            cloudiness: 'c',
            pressure: 'p',
            humidity: 'h',
            location: 'l'
        },
        error: false
    };
});

describe('CityContainer component', () => {

    test('matches the snapshot when local weather is loaded', () => {

        const tree = renderer.create(
            <CityContainer weather={city.weather} isLoading={city.isLoading} error={city.error} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot when local weather is loading', () => {
        city.isLoading = true;

        const tree = renderer.create(
            <CityContainer weather={city.weather} isLoading={city.isLoading} error={city.error} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot on error', () => {
        city.error = true;
        const tree = renderer.create(
            <CityContainer weather={city.weather} isLoading={city.isLoading} error={city.error} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});