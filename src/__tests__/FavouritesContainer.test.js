import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FavouritesContainer from '../containers/FavouritesContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let city;
let cities;
beforeEach(() => {
    city = {
        isLoading: false,
        weather: {
            name: 'Helsinki',
            img: 'i',
            temperature: 't',
            wind: 'w',
            cloudiness: 'c',
            pressure: 'p',
            humidity: 'h',
            location: 'l'
        },
        error: false,
    };
    cities = [{
        name: 'Moscow',
        img: 'i1',
        temperature: 't1',
        wind: 'w1',
        cloudiness: 'c1',
        pressure: 'p1',
        humidity: 'h1',
        location: 'l1'
    }];
});

describe('FavouritesContainer container', () => {

    test('matches the snapshot when favorites cities are loaded', () => {
        const store = mockStore({
            cityReducer: city,
            favouritesReducer: {
                cities: cities,
                errors: [],
                isLoading: []
            }
        });
        const tree = renderer.create(
            <Provider store={store}>
                <FavouritesContainer />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot when favorites cities are loading', () => {

        const store = mockStore({
            cityReducer: city,
            favouritesReducer: {
                cities: cities,
                errors: [],
                isLoading: ['Moscow']
            }
        });

        const tree = renderer.create(
            <Provider store={store}>
                <FavouritesContainer />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot on error', () => {

         const store = mockStore({
            cityReducer: city,
            favouritesReducer: {
                cities: cities,
                errors: ['Moscow'],
                isLoading: []
            }
        });
        const tree = renderer.create(
            <Provider store={store}>
                <FavouritesContainer />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});