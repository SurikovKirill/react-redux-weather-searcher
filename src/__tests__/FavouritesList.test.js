import FavouritesList from '../components/FavouritesList';
import React from 'react';
import renderer from 'react-test-renderer';

let cities;
beforeEach(() => {
    cities = [
        {
            name: 'Moscow',
            img: 'i',
            temperature: 't',
            wind: 'w',
            cloudiness: 'c',
            pressure: 'p',
            humidity: 'h',
            location: 'l'
        },
        {
            name: 'Helsinki',
            img: 'i1',
            temperature: 't1',
            wind: 'w1',
            cloudiness: 'c1',
            pressure: 'p1',
            humidity: 'h1',
            location: 'l1'
        }
    ];
});
describe('FavoritesList component', () => {

    test('matches the snapshot when cities loaded', () => {

        const tree = renderer.create(
            <FavouritesList cities={cities} isLoading={[]} errors={[]}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });


    test('matches the snapshot when cities are loading', () => {

        const isLoading = ['Moscow'];

        const tree = renderer.create(
            <FavouritesList cities={cities} isLoading={isLoading} onRemove={f => f} errors={[]}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('matches the snapshot when on error', () => {

        const errors = ['Helsinki'];

        const tree = renderer.create(
            <FavouritesList cities={cities} isLoading={[]} onRemove={f => f} errors={errors}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});