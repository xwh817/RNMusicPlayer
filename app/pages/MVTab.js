import React, {Component} from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import MusicApi from '../dao/MusicApi';
import MVItem from '../component/MVItem';
import Toast from 'react-native-easy-toast';
import Colors from '../values/Colors';

export default class MVTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
    this.mount = false;
  }

  _loadData() {
    this.setState({isLoading: true});

    MusicApi.getMVList(this.props.url)
      .then(items => {
        if (this.mount) {
          this.setState({
            isLoading: false,
            data: items,
          });
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        this.toast.show('网络请求失败');
      });
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    this.mount = true;
    this._loadData();
  }

  componentWillUnmount() {
    this.mount = false;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={46} color={'green'} animating={true} />
          </View>
        ) : (
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.loadMore}
            viewabilityConfig={VIEWABILITY_CONFIG}
            onViewableItemsChanged={this._onViewableItemsChanged}
          />
        )}
        <Toast
          ref={toast => {
            this.toast = toast;
          }}
          position="center"
          style={{backgroundColor: Colors.colorPrimary}}
        />
      </View>
    );
  }

  _onItemPress = item => {
    console.log('_onItemPressed: ' + item.name);
    this.toast.show(item.name);
  };

  _renderItem = ({item}) => (
    <MVItem
      mv={item}
      onPress={this._onItemPress}
      onChildScroll={this.props.onChildScroll}
    />
  );

  //列表滚动变化事件
  _onViewableItemsChanged = changed => {
    //console.log(changed);
  };
}

//列表滚动变化监听配置
const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 10,
  waitForInteraction: true,
};
