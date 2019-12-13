import CityComponent from '../components/CityComponent';
import renderer from 'react-test-renderer';
import React from 'react';

describe('CurrentCityComponent component', () => {
    test('matches the snapshot when the weather object is not null', () => {
        const weather = {
            name: 'Moscow',
            img: 'i',
            temperature: 't'
        };
        const tree = renderer.create(
            <CityComponent weather={weather}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('matches the snapshot when the weather object is null', () => {
        const weather = null;
        const tree = renderer.create(
            <CityComponent weather={weather}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});