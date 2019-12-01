import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, findNodeHandle, SafeAreaView, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../values/Colors'
import ListTile from '../component/ListTile';
import SongUtil from '../model/SongUtil'
import { BlurView } from "@react-native-community/blur";
import RotateAnimator from '../component/RotateAnimator'
import PlayerProgressBar from '../component/PlayerProgressBar';
import LyricComonent from '../component/LyricComponent';

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
      song: this.props.navigation.getParam('song'),// 从导航中取数据
      isPlaying: false,
      position: 0,
      duration: 0,
    }
  }

  imageLoaded() {
    console.log('imageLoaded ' + this.state.song.name)
    setTimeout(() => {
      this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }, 200);
  }

  _renderBackground() {
    if (this.state.viewRef != null) {
      return (<BlurView
        style={styles.absolute}
        viewRef={this.state.viewRef}
        blurType="dark"
        blurAmount={20}
      />);
    }
  }

  _renderControllerBar() {
    return (
    <View style={styles.controllerBar}>
      <Entypo name={'controller-jump-to-start'} size={40} color={'white'} onPress={()=>{}} />
      <Entypo style={{marginLeft:20, marginRight:20}}
        name={this.state.isPlaying ? 'controller-paus':'controller-play'} 
        size={60} color={'white'} onPress={()=>{
        this.setState({
          isPlaying: !this.state.isPlaying
        });
      }} />
      <Entypo name={'controller-next'} size={40} color={'white'} onPress={()=>{}} />
    </View>);
  }

  render() {
    let song = this.state.song;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.page}>
          <Video source={{ uri: SongUtil.getSongUrl(song) }}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}
            style={styles.hidden}
            onError={this.onError}
            paused={!this.state.isPlaying}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            repeat={false}
          />
          <Image
            ref={img => {
              this.backgroundImage = img;
            }}
            source={{ uri: SongUtil.getSongImage(song, imageSize) }}
            style={this.state.viewRef == null ? styles.hidden : styles.absolute}
            onLoadEnd={this.imageLoaded.bind(this)}
          />

          {this._renderBackground()}

          <ListTile style={{marginBottom: 20}}
            title={song.name}
            subTitle={SongUtil.getArtistNames(song)}
            onPress={() => this.props.navigation.pop()} />

          <TouchableOpacity onPress={() => {
            let isPlaying = !this.state.isPlaying;
            console.log("onPressed: " + isPlaying)
            this.setState({
              isPlaying: isPlaying
            });
          }} >
            <RotateAnimator duration={16000} running={this.state.isPlaying}>
              <Image
                roundAsCircle={true}
                source={{ uri: SongUtil.getSongImage(song, imageSize) }}
                style={styles.coverImage}
              />
            </RotateAnimator>
          </TouchableOpacity>

          <LyricComonent song = {song} position={this.state.position} />

          <PlayerProgressBar
            style={{margin:20}}
            position={this.state.position}
            duration= {this.state.duration}
          />
          {this._renderControllerBar()}
        </View>
      </SafeAreaView>);
  }



  onBuffer() {
    console.log("onBuffer");
  }

  onError() {
    console.log("onError");
  }

  onLoad = (data) => {
    this.setState({ duration: data.duration * 1000 });
    console.log("onLoad: " + data.duration);
  };

  onProgress = (data) => {
    if (!this.isPressed) {
      // 尽量不要自己去更新DOM
      //this.refs.seekBar.setProgress(Math.round(data.currentTime));
      this.setCurrentTime(data.currentTime);
      //console.log("onProgress: " + data.currentTime);
    }
  };

  onEnd = () => {
    this.setState({ paused: true })
    this.player.seek(0)
    console.log("onEnd");
  };

  setCurrentTime(progress) {
    let currentTime = Math.round(this.state.position);
    let newTime = Math.round(progress * 1000);  // 单位：毫秒
    if (currentTime != newTime) {   // 用整数比较，减少刷新次数
        this.setState({
            position: newTime,
        });
        console.log("setCurrentTime: " + newTime);
    }
}


}

const screen = Dimensions.get('window');
const imageSize = 240;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#555555',
    flexDirection: 'column',
    alignItems: 'center', // 子元素沿主轴的对齐方式
  },
  coverImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  hidden: {
    width: 0,
    height: 0,
  },
  controllerBar: {
    flexDirection: 'row',
    alignItems: 'center', // 子元素沿主轴的对齐方式
    //marginTop: 16,
    marginBottom: 26,
  }

});