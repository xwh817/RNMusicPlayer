import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, findNodeHandle, SafeAreaView, TouchableOpacity } from 'react-native';
import Colors from '../values/Colors'
import ListTile from '../component/ListTile';
import SongUtil from '../model/SongUtil'
import { BlurView } from "@react-native-community/blur";
import RotateAnimator from '../component/RotateAnimator'

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      viewRef: null,
      isPlaying: false,
    }
    // 从导航中取数据
    this.state.song = this.props.navigation.getParam('song');
  }

  imageLoaded() {
    console.log('imageLoaded ' + this.state.song.name)
    setTimeout(() => {
      this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }, 200);
  }

  _renderBackground() {
    if (this.state.viewRef == null) {
      //return (<View />);
    } else {
      return (<BlurView
        style={styles.absolute}
        viewRef={this.state.viewRef}
        blurType="dark"
        blurAmount={20}
      />);
    }
  }

  render() {
    let song = this.state.song;
    return (
      <View style={styles.page}>
        <Image
          ref={img => {
            this.backgroundImage = img;
          }}
          source={{ uri: SongUtil.getSongImage(song, imageSize) }}
          style={styles.absolute}
          onLoadEnd={this.imageLoaded.bind(this)}
        />

        {this._renderBackground()}

        <ListTile title={song.name}
          subTitle={SongUtil.getArtistNames(song)}
          onPress={() => this.props.navigation.pop()} />
        <RotateAnimator duration={6000} running={this.state.isPlaying}>
          <Image
            roundAsCircle={true}
            source={{ uri: SongUtil.getSongImage(song, imageSize) }}
            style={styles.coverImage}
          />
        </RotateAnimator>

        <TouchableOpacity onPress={()=>{
              this.setState({
                isPlaying: !this.state.isPlaying
              });
            }} >
          <Text>播放</Text>
        </TouchableOpacity>

      </View>);
  }

}

const screen = Dimensions.get('window');
const imageSize = 240;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center', // 子元素沿主轴的对齐方式
  },
  coverImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
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