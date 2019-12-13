import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../containers/App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('App container', () => {

    test('matches the snapshot when local weather is loaded and favorites cities are loaded', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementation((success) => Promise.resolve(success({
                    coords: {
                        latitude: 10,
                        longitude: 10
                    }
                })))
        };
        navigator.geolocation = mockGeolocation;
        const city = {
            isLoading: false,
            error: false,
            weather: {
                name: 'Moscow',
                img: 'i',
                temperature: 't',
                wind: 'w',
                cloudiness: 'c',
                pressure: 'p',
                humidity: 'h',
                location: 'l'
            }
        };
        const cities = [{
            name: 'Moscow',
            img: 'i1',
            temperature: 't1',
            wind: 'w1',
            cloudiness: 'c1',
            pressure: 'p1',
            humidity: 'h1',
            location: 'l1'
        }];
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
                <App />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

});