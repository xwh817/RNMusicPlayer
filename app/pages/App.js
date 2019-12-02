import React, {Component} from 'react';
import AppContainer from '../AppContainer';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    );
  }
}
