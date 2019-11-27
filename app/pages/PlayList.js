import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
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
  '放松'
];

export default class PlayList extends Component {
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
          <PlayListTab cat={item} key={item} tabLabel={item} />
        ))}
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: Colors.pageBg,
  },
  tabBarText: {
    fontSize: 12,
    marginTop: 12,
  },
  tabBarUnderline: {
    backgroundColor: Colors.colorPrimary,
    height: 1,
  },
});
