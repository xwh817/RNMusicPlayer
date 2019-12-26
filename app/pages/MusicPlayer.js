import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  findNodeHandle,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../values/Colors';
import MusicHeader from '../component/MusicHeader';
import SongUtil from '../model/SongUtil';
import {BlurView} from '@react-native-community/blur';
import RotateAnimator from '../component/RotateAnimator';
import SeekBar from '../component/SeekBar';
import LyricComonent from '../component/LyricComponent';
import StringUtil from '../utils/StringUtil';
import MusicApi from '../dao/MusicApi';

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    let song = this.props.navigation.getParam('song'); // 从导航中取数据
    this.state = {
      viewRef: null,
      song: song,
      isPlaying: false,
      position: 0,
      duration: 1, // 给个值，防止刚开始进度条就是满的
      hasCover: SongUtil.getSongImage(song, imageSize) != '',
    };
    this.isPressed = false;
  }

  componentDidMount(){
    if (!this.state.hasCover) { // 如果没有图片就去取。
      this.loadSongDetail();
    }
    StatusBar.setBarStyle('light-content');
  }

  getImageSource() {
    let source;
    if (this.state.hasCover) {
      source = {uri: SongUtil.getSongImage(this.state.song, imageSize)};
    } else {
      source = require('../images/music_cover.jpg');
    }
    return source;
  }

  imageLoaded() {
    console.log('imageLoaded ' + this.state.song.name);
    setTimeout(() => {
      this.setState({
        viewRef: findNodeHandle(this.backgroundImage),
      });
    }, 200);
  }

  loadSongDetail() {
    MusicApi.getSongDetail(this.state.song.id).then(song => {
      if (song) {
        this.setState({
          song: song,
          hasCover: true,
        });
      }
    });
  }

  _renderBackground() {
    if (this.state.hasCover) {
      return (
        <View style={styles.absolute}>
          <Image
            ref={img => {
              this.backgroundImage = img;
            }}
            source={this.getImageSource()}
            style={this.state.viewRef == null ? styles.hidden : styles.absolute}
            onLoadEnd={this.imageLoaded.bind(this)}
          />
          {this.state.viewRef != null && (<BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="dark"
            blurAmount={20}
          />)}
          
        </View>
      );
    }
  }

  _renderLoading() {
    if (this.state.duration < 10) {
      return (
        <View style={[styles.absolute, {justifyContent: 'center'}]}>
          <ActivityIndicator
            size={46}
            color={Colors.colorLight}
            animating={true}
          />
        </View>
      );
    }
  }

  _renderProgressBar() {
    return (
      <View style={styles.progressBar}>
        <Text style={styles.textTime}>
          {StringUtil.formatTime(this.state.position)}
        </Text>
        <SeekBar
          style={{flex: 1, marginLeft: 20, marginRight: 20}}
          progressHeight={2}
          progress={this.state.position}
          min={0}
          max={this.state.duration}
          onStartTouch={() => {
            this.isPressed = true;
          }}
          onProgressChanged={value => {
            console.log('onProgressChanged:' + value);
            this.setState({
              position: value,
            });
          }}
          onStopTouch={position => {
            this.isPressed = false;
            this.player.seek(position / 1000);
          }}
        />

        <Text style={styles.textTime}>
          {StringUtil.formatTime(this.state.duration)}
        </Text>
      </View>
    );
  }

  _renderControllerBar() {
    let iconColor = '#ffffffdd';
    return (
      <View style={styles.controllerBar}>
        <Entypo
          name={'controller-jump-to-start'}
          size={40}
          color={iconColor}
          onPress={() => {}}
        />
        <Entypo
          style={{marginLeft: 20, marginRight: 20}}
          name={this.state.isPlaying ? 'controller-paus' : 'controller-play'}
          size={60}
          color={iconColor}
          onPress={() => {
            this.setState({
              isPlaying: !this.state.isPlaying,
            });
          }}
        />
        <Entypo
          name={'controller-next'}
          size={40}
          color={iconColor}
          onPress={() => {}}
        />
      </View>
    );
  }

  render() {
    let song = this.state.song;
    return (
      <View style={styles.page}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Video
          source={{uri: SongUtil.getSongUrl(song)}} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }}
          style={styles.hidden}
          onError={this.onError}
          paused={!this.state.isPlaying}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          repeat={false}
        />
        {this._renderBackground()}

        <SafeAreaView style={styles.content} forceInset={{top: 'always'}}>
          <MusicHeader
            style={{marginBottom: 26}}
            song={song}
            onPress={() => this.props.navigation.pop()}
          />

          <TouchableOpacity
            onPress={() => {
              let isPlaying = !this.state.isPlaying;
              console.log('onPressed: ' + isPlaying);
              this.setState({
                isPlaying: isPlaying,
              });
            }}>
            <RotateAnimator duration={24000} running={this.state.isPlaying}>
              <Image
                roundAsCircle={true}
                source={this.getImageSource()}
                style={styles.coverImage}
              />

              {this._renderLoading()}
            </RotateAnimator>
          </TouchableOpacity>

          <LyricComonent song={song} position={this.state.position} />

          {this._renderProgressBar()}

          {this._renderControllerBar()}
        </SafeAreaView>
      </View>
    );
  }

  onBuffer() {
    console.log('onBuffer');
  }

  onError() {
    console.log('onError');
  }

  onLoad = data => {
    this.setState({
      duration: data.duration * 1000,
      isPlaying: true,
    });
    console.log('onLoad: ' + data.duration);
  };

  onProgress = data => {
    if (!this.isPressed) {
      // 尽量不要自己去更新DOM
      //this.refs.seekBar.setProgress(Math.round(data.currentTime));
      this.setCurrentTime(data.currentTime);
      //console.log("onProgress: " + data.currentTime);
    }
  };

  onEnd = () => {
    this.setState({paused: true});
    this.player.seek(0);
    console.log('onEnd');
  };

  setCurrentTime(progress) {
    let currentTime = Math.round(this.state.position);
    let newTime = Math.round(progress * 1000); // 单位：毫秒
    if (currentTime != newTime) {
      // 用整数比较，减少刷新次数
      this.setState({
        position: newTime,
      });
      //console.log("setCurrentTime: " + newTime);
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
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', // 子元素沿主轴的对齐方式
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  coverImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  hidden: {
    width: 0,
    height: 0,
  },
  controllerBar: {
    flexDirection: 'row',
    alignItems: 'center', // 子元素沿主轴的对齐方式
    //marginTop: 16,
    marginBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center', // 子元素沿主轴的对齐方式
    marginLeft: 20,
    marginRight: 20,
    marginBottom:8
  },
  textTime: {
    fontSize: 12,
    color: '#ffffff',
  },
});
