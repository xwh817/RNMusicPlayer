import React, {Component} from 'react';
import {
  View,
  Image,
  Dimensions,
} from 'react-native';
import SongUtil from '../model/SongUtil';
import Swiper from 'react-native-swiper';
import Colors from '../values/Colors';

export default class ImageSwiper extends Component {
  constructor(props) {
    super(props);
    this.imageHeight = this.props.height
  }

  _renderOne(song) {
    return (
      <View
        key={song.id.toString()}
        style={[{height: this.imageHeight}, this.props.style]}>
        <Image
          source={{uri: SongUtil.getSongImage(song, 0, 600, 300)}}
          style={{width: screen.width, height: this.imageHeight}}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{height: this.imageHeight}}>
        <Swiper
          autoplay={true}
          activeDotColor={Colors.colorLight}
          paginationStyle={{position: 'absolute', bottom: 10}}
          dotColor={'#ffffff99'}
          dotStyle={{margin: 0}}>
          {this.props.songs.map(song => this._renderOne(song))}
        </Swiper>
      </View>
    );
  }
}

const screen = Dimensions.get('window');
