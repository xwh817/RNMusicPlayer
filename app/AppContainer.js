import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigatore from './navigator/TabNavigator';
import Colors from './values/Colors'


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
                backgroundColor: Colors.colorPrimary,
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
