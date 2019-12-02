import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MusicApi from '../dao/MusicApi';
import SongList from '../component/SongList';

export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: null,
    };
    this.mount = false;
  }

  loadData() {
    MusicApi.getTopSongs(0)
      .then(songs => {
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
    this.loadData();
  }

  componentWillUnmount() {
    this.mount = false;
  }

  render() {
    return (
      <SongList navigation={this.props.navigation} songs={this.state.songs} />
    );
  }
}
