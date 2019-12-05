/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/pages/App';
import {name as appName} from './app.json';

// 这儿的名字要和原生项目里的相同，不然会报错，坑的1B ！
AppRegistry.registerComponent(appName, () => App);
