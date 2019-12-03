import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';
import StorageUtil from '../utils/StorageUtil';
import SongList from '../component/SongList';

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: null,
    };
    this.mount = false;
  }

  loadData() {
    StorageUtil.getAll()
      .then(songs => {
        console.log(songs.length);
        if (this.mount) {
          this.setState({
            songs: songs,
          });
        }
      })
      .catch(error => console.error(error));
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    this.mount = true;
    // 监听页面focus，刷新数据（默认不刷新）
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      console.log("Favorite didFocus " + StorageUtil.isDataChanged);
      if (this.state.songs == null || StorageUtil.isDataChanged) {
        this.loadData();
      }
    });
  }

  componentWillUnmount() {
    this.mount = false;
    this._navListener.remove();
  }

  render() {
    let songs = this.state.songs;
    if (songs && songs.length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#666666', fontSize: 12, lineHeight: 20, textAlign: 'center' }}>
            {'您还没有收藏歌曲\n可点击播放页右上角进行收藏'}
          </Text>
        </View>);
    }

    return (
      <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
        <SongList navigation={this.props.navigation} songs={songs} />
      </View>
    );
  }
}
