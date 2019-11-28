import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, findNodeHandle } from 'react-native';
import Colors from '../values/Colors'
import ListTile from '../component/ListTile';
import SongUtil from '../model/SongUtil'
import { BlurView } from "@react-native-community/blur";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {viewRef: null}
    // 从导航中取数据
    this.state.song = this.props.navigation.getParam('song');
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    let song = this.state.song;
    return (
      <View style={styles.page}>
        <Image
            roundAsCircle={true}
            source={{uri: SongUtil.getSongImage(song)}}
            style={styles.absolute}
            onLoadEnd={this.imageLoaded.bind(this)}
          />
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={10}
        />
        <ListTile title={song.name}
          subTitle={SongUtil.getArtistNames(song)}
          onPress={() => this.props.navigation.pop()} />
        <Image
            roundAsCircle={true}
            source={{uri: SongUtil.getSongImage(song)}}
            style={styles.coverImage}
          />
      </View>);
  }

}

const screen = Dimensions.get('window');
const imageSize = 240;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#999999',
    flexDirection: 'column',
    alignItems: 'center', // 子元素沿主轴的对齐方式
  },
  coverImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize/2,
    marginTop: 20,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }

});