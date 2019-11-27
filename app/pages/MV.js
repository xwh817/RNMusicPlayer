import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Colors from '../values/Colors';
import MVTab from './MVTab';
import MusicApi from '../dao/MusicApi';


export default class MV extends Component {

  constructor(props) {
    super(props);

    // 两个部分，采用不同的方式遍历。
    // 遍历对象使用：Object.keys(obj)
    this.types = {
      "最新": MusicApi.URL_MV_FIRST,
      "Top": MusicApi.URL_MV_TOP,
      '推荐': MusicApi.URL_MV_PERSONAL,
    };

    this.areas = ['内地', '港台', '欧美', '日本', '韩国'];

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
        {
          Object.keys(this.types).map(key => (
            <MVTab url={this.types[key]} key={key} tabLabel={key} />))
        }
        {
          this.areas.map(item => <MVTab url={MusicApi.URL_MV_AREA + item} key={item} tabLabel={item} />)
        }
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
