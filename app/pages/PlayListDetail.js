import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import SongList from '../component/SongList';
import MusicApi from '../dao/MusicApi';
import Colors from '../values/Colors';

export default class PlayListDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: null,
    };
    this.playList = this.props.navigation.getParam('playList'); // 从导航中取数据
  }

  loadData() {
    MusicApi.getPlayListDetail(this.playList.id)
      .then(songs => {
        if (this.mount) {
          this.setState({
            songs: songs,
          });
        }
      })
      .catch(error => console.log(error));
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    this.mount = true;
    this.loadData();
    StatusBar.setBarStyle('light-content');
  }

  componentWillUnmount() {
    this.mount = false;
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={Colors.colorPrimary}
          translucent={false}
        />
        <SongList navigation={this.props.navigation} songs={this.state.songs} />
      </View>
    );
  }
}
