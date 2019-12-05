import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Colors from '../values/Colors';
import PlayListTab from './PlayListTab';

const types = [
  '全部',
  '流行',
  '华语',
  '民谣',
  '摇滚',
  '清新',
  '浪漫',
  '古风',
  '影视原声',
  '欧美',
  '儿童',
  '电子',
  '校园',
  '放松',
];

export default class PlayList extends Component {

  // 页面加载完成之后
  componentDidMount() {
    this.mount = true;
    // 监听页面focus
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      console.log("PlayList didFocus ");
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.mount = false;
    this._navListener.remove();
  }

  render() {
    return (
      <ScrollableTabView
        style={styles.tabView}
        renderTabBar={() => <ScrollableTabBar />}
        tabBarBackgroundColor="white"
        tabBarActiveTextColor={Colors.colorPrimary}
        tabBarInactiveTextColor="#999999"
        tabBarTextStyle={styles.tabBarText}
        tabBarUnderlineStyle={styles.tabBarUnderline}>
        {types.map(item => (
          <PlayListTab
            cat={item}
            key={item}
            tabLabel={item}
            navigation={this.props.navigation}
          />
        ))}
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: Colors.pageBg,
    marginTop: StatusBar.currentHeight,
  },
  tabBarText: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  tabBarUnderline: {
    backgroundColor: Colors.colorPrimary,
    height: 1,
  },
});
