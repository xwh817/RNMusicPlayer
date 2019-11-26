import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Recommend from '../pages/Recommend';
import PlayList from '../pages/PlayList';
import MV from '../pages/MV';
import Favorite from '../pages/Favorite';

const iconSize = 30;
/**
 * BottomTabNavigator有两个部分
 * routeConfigMap：路由表
 * drawConfig：自定义界面配置
 */
const BottomTabNavigator = createBottomTabNavigator({
    Recommend: {
        screen: Recommend,
        navigationOptions: ({navigation}) => ({
            tabBarLabel:'推荐',
            tabBarIcon: ({focused, tintColor}) => (
                <Ionicons name={'md-home'} size={iconSize} color={tintColor}/>
            ),
        }),
    },
    PlayList: {
        screen: PlayList,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '歌单',
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcons
                    name={'alpha-f-box'}
                    size={iconSize}
                    color={tintColor}
                />
            ),
            // 默认点击会跳转到配置的页面，这儿可以自定义点击行为。
            //tabBarOnPress: () => {
                //route(navigation)
            //}
        }),
    },
    MV: {
        screen: MV,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'MV',
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcons
                    name={'format-list-bulleted'}
                    size={iconSize}
                    color={tintColor}
                />
            ),
            //tabBarOnPress: () => {
                //route(navigation)
            //}
        }),
    },
    Favorite: {
        screen: Favorite,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={iconSize}
                    color={tintColor}
                />
            ),
            //tabBarOnPress: () => {
                //route(navigation)
            //}
        }),
    },
}, {
    initialRouteName: 'Recommend', // 设置默认的页面组件
    initialRouteParams: {title: 'Home'}, // 找这条命令不容易, 翻github翻了一个小时

    lazy: true, // 在app打开的时候将底部标签栏全部加载，默认false, 推荐改成true
    backBehavior: null, // 点击返回退到上级界面

    tabBarOptions: {
        activeTintColor: 'tomato', // 选中的颜色
        inactiveTintColor: 'gray', // 未选中的颜色

        showLabel: true,
        showIcon: true,
        style: {
            backgroundColor: '#EEEEEE',
            height: 54,
        },
        tabStyle: {
            height: 54,
        },
        labelStyle: {
            fontSize: 12,
        },
    },
}

);

export default BottomTabNavigator;