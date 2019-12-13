import FavouriteCityHeader from '../components/FavouriteCityHeader';
import React from 'react';
import renderer from 'react-test-renderer';

describe('FavouriteCityHeader component', () => {

    test('matches the snapshot when city.icon != null, city.temperature != null', () => {
        const city = {
            name: 'Moscow',
            img: 'i',
            temperature: 't'
        };

        const tree = renderer.create(
            <FavouriteCityHeader city={city}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });


    test('matches the snapshot when city.icon == null, city.temperature == null', () => {
        const city = {
            name: 'Moscow',
            img: null,
            temperature: null
        };

        const tree = renderer.create(
            <FavouriteCityHeader city={city}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});