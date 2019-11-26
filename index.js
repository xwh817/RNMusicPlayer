/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './app/AppContainer';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppContainer);
