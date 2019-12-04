import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigatore from './TabNavigator';
import Colors from '../values/Colors';
import MusicPlayer from '../pages/MusicPlayer';
import PlayListDetail from '../pages/PlayListDetail';
import SearchPage from '../pages/SearchPage';

const rootNavigatior = createStackNavigator(
  {
    Home: {
      screen: TabNavigatore,
      navigationOptions: {
        header: null,
      },
    },
    MusicPlayer: {
      screen: MusicPlayer,
      navigationOptions: {
        header: null,
      },
    },
    PlayListDetail: {
      screen: PlayListDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: navigation.state.params.playList.name, // 从导航对象中动态设置
      }),
    },
    SearchPage: {
      screen: SearchPage,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Home',
    /* 自定义公用属性 */
    defaultNavigationOptions: {
      //header: null, // 不显示appBar
      headerStyle: {
        backgroundColor: Colors.colorPrimary,
        height: 52,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
    },
  },
);

const AppContainer = createAppContainer(rootNavigatior);
export default AppContainer;
