import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Recommend from '../pages/Recommend';
import PlayList from '../pages/PlayList';
import MV from '../pages/MV';
import Favorite from '../pages/Favorite';
import Colors from '../values/Colors';

const iconSize = 30;
/**
 * BottomTabNavigator有两个部分
 * routeConfigMap：路由表
 * drawConfig：自定义界面配置
 */
const BottomTabNavigator = createBottomTabNavigator(
  {
    Recommend: {
      screen: Recommend,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '推荐',
        tabBarIcon: ({focused, tintColor}) => (
          <Entypo name={'paper-plane'} size={iconSize} color={tintColor} />
        ),
      }),
    },
    PlayList: {
      screen: PlayList,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '歌单',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name={'library-music'}
            size={iconSize}
            color={tintColor}
          />
        ),
      }),
    },
    /* Center:{
      screen: MV,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: ' ',
      }),
    }, */
    MV: {
      screen: MV,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'MV',
        tabBarIcon: ({tintColor}) => (
          <Entypo name={'video'} size={iconSize} color={tintColor} />
        ),
      }),
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '收藏',
        tabBarIcon: ({tintColor}) => (
          <Entypo name={'heart'} size={iconSize} color={tintColor} />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Recommend', // 设置默认的页面组件
    //initialRouteParams: {title: 'Home'}, // 找这条命令不容易, 翻github翻了一个小时

    lazy: true, // 在app打开的时候将底部标签栏全部加载，默认false, 推荐改成true
    backBehavior: null, // 点击返回退到上级界面

    tabBarOptions: {
      //activeTintColor: 'tomato', // 选中的颜色
      activeTintColor: Colors.colorPrimary, // 选中的颜色
      inactiveTintColor: 'gray', // 未选中的颜色

      showLabel: true,
      showIcon: true,
      style: {
        backgroundColor: 'white',
        height: 66,
      },
      tabStyle: {
        // 调整item的高度、位置
        height: 54,
        marginTop: 6,
      },
      labelStyle: {
        fontSize: 12,
        marginTop: 2,
      },
    },
  },
);

export default BottomTabNavigator;