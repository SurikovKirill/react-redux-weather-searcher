import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initWeather } from '../actions/city';
import './App.css';
import CityContainer from './CityContainer';
import Header from '../components/Header';

class App extends Component {
  constructor(props) {
      super(props);
      props.initWeather();
  }

  geolocationWeather = () => {
      this.props.initWeather();
  };

  render() {
      const { isLoading, weather, error } = this.props;
      return (
          <div className='App'>
              <Header onUpdate={this.geolocationWeather}/>
              <CityContainer weather={weather} isLoading={isLoading} error={error}/>
          </div>
      );
  }
}

const mapStateToProps = ({ cityReducer: { isLoading, error, weather } }) => {
  return {
      isLoading,
      error,
      weather,
  };
};
const mapDispatchToProps = {
  initWeather: initWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);