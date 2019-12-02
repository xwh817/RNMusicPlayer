import React, { Component } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import MusicApi from '../dao/MusicApi';
import PlayListItem from '../component/PlayListItem';
import Toast from 'react-native-easy-toast';
import Colors from '../values/Colors';
import PlayListDetail from '../pages/PlayListDetail';

var mount;

export default class PlayListTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  loadData() {
    this.setState({ isLoading: true });

    MusicApi.getPlayList(this.props.cat)
      .then(items => {
        if (mount) {
          this.setState({
            isLoading: false,
            data: items,
          });
        }
      })
      .catch(error => this.toast.show("网络请求失败"));
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    mount = true;
    this.loadData();
  }

  componentWillUnmount() {
    mount = false;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.isLoading ? 
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size={46} color={'green'} animating={true} />
          </View> 
          :
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} />
        }
        <Toast ref={toast => { this.toast = toast }}
          position='center'
          style={{ backgroundColor: Colors.colorPrimary }}
        />
      </View>
    );
  }

  _onItemPress = item => {
    console.log('_onItemPressed: ' + item.id);
    //this.toast.show(item.name);
    this.props.navigation.navigate('PlayListDetail', {playList: item});
  };

  _renderItem = ({ item }) => (
    <PlayListItem item={item} onPress={this._onItemPress} />
  );
}
