import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, StatusBar } from 'react-native';
import MusicApi from '../dao/MusicApi';
import SongUtil from '../model/SongUtil';
import Swiper from 'react-native-swiper';
import Colors from '../values/Colors';

export default class ImageSwiper extends Component {

  _renderOne(song) {
    return (<View style={{
      height: imageHeight,
    }}>
      <Image
        key={song.id.toString()}
        source={{ uri: SongUtil.getSongImage(song, 0, 600, 300) }}
        style={{ width: screen.width, height: imageHeight }}
      />
    </View>);
  }

  render() {
    return (
      <View style={{ height: imageHeight }}>
        <Swiper autoplay={true} activeDotColor={Colors.colorLight}>
          {
            this.props.songs.map(song => this._renderOne(song))
          }
        </Swiper>
      </View>
    );
  }

}

const screen = Dimensions.get('window');
var imageHeight = screen.width / 2;