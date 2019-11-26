import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import TabNavigatore from './navigator/TabNavigator';


const rootNavigatior = createStackNavigator(
    {
        Home: {
            screen: TabNavigatore,
            /* navigationOptions: {
                headerTitle: 'React Music',
            } */
        },
    },
    {
        initialRouteName: 'Home',
        /* 自定义公用属性 */
        defaultNavigationOptions: {
            header:null,    // 不显示appBar
            headerStyle: {
                backgroundColor: '#e4511e',
                height: 52
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
        },
    }
);

const AppContainer = createAppContainer(rootNavigatior);
export default AppContainer;
