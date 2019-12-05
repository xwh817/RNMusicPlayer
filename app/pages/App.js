import React, { Component } from 'react';
import {StatusBar} from 'react-native';
import AppContainer from '../navigator/AppContainer';
import Recommend from './Recommend';

import { Provider } from "react-redux";
import store from "../redux/store";
import { connect } from "react-redux"

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

