import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import Dimens from '../values/Dimens';
import SongUtil from '../model/SongUtil';
import Toast from 'react-native-easy-toast';
import Colors from '../values/Colors';
import MusicApi from '../dao/MusicApi';
import StringUtil from '../utils/StringUtil';
import SeekBar from '../component/SeekBar';

export default class MVItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isLoading: false,
      url: null,
      showPlayerIcon: true,
      duration: 0,
      position: 0,
    };
    this.mount = false;
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    this.mount = true;
  }

  componentWillUnmount() {
    console.log('MV componentWillUnmount: ' + this.props.mv.name);
    this.mount = false;
    //this.player.stop();
    this.setState({
      isLoading: false,
      isPlaying: false,
      showPlayerIcon: true,
    });
  }


  _loadData() {
    this.setState({isLoading: true});
    MusicApi.getMVUrl(this.props.mv.id)
      .then(url => {
        if (this.mount) {
          this.setState({
            url: url,
            isPlaying: true,
          });
        }
      })
      .catch(error => this.toast.show('网络请求失败'));
  }

  _showLoading() {
    let size = 46;
    return (
      <ActivityIndicator
        style={{
          position: 'absolute',
          left: (screen.width - size) / 2,
          top: (imageHeight - size) / 2,
        }}
        size={size}
        color={Colors.colorPrimary}
        animating={true}
      />
    );
  }

  _renderMV(mv) {
    console.log(
      'MV render: ' + mv.name + ', isPlaying: ' + this.state.isPlaying,
    );
    if (this.state.url != null) {
      return (
        <Video
          source={{uri: this.state.url}}
          ref={ref => {
            this.player = ref;
          }}
          style={{
            width: itemWidth,
            height: imageHeight,
            backgroundColor: 'black',
          }}
          onError={this.onError}
          paused={!this.state.isPlaying}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          repeat={false}
        />
      );
    } else {
      return (
        <Image
          source={{uri: `${mv['cover']}?param=640y360`}}
          style={{width: itemWidth, height: imageHeight}}
        />
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
          style={{flex: 1, marginLeft: 12, marginRight: 12}}
          progressHeight={2}
          progress={this.state.position}
          min={0}
          max={this.state.duration}
          onStartTouch={() => {
            this.isPressed = true;
            this.props.onChildScroll(true);
          }}
          onProgressChanged={value => {
            console.log('onProgressChanged:' + value);
            this.setState({
              position: value,
            });
          }}
          onStopTouch={position => {
            setTimeout(() => {
              // 延迟修改状态，解决拖了之后跳一下的问题
              this.isPressed = false;
            }, 200);
            this.player.seek(position / 1000);
            this.props.onChildScroll(false);
          }}
        />

        <Text style={styles.textTime}>
          {StringUtil.formatTime(this.state.duration)}
        </Text>
      </View>
    );
  }

  _renderPlayerIcon() {
    if (!this.state.showPlayerIcon || this.state.isLoading) {
      return;
    }
    let iconSize = 60;
    return (
      <Entypo
        style={{
          position: 'absolute',
          left: (screen.width - iconSize) / 2,
          top: (imageHeight - iconSize) / 2,
        }}
        name={this.state.isPlaying ? 'controller-paus' : 'controller-play'}
        size={iconSize}
        color={'#ffffffaa'}
        onPress={() => {
          this.setState({
            isPlaying: !this.state.isPlaying,
          });
        }}
      />
    );
  }

  autoHidePlayerIcon() {
    if (this.timer != undefined) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.timer = undefined;
      this.setState({
        showPlayerIcon: false,
      });
    }, 4000);
  }

  render() {
    var mv = this.props.mv;
    return (
      <View style={styles.item} roundAsCircle={true}>
        {this._renderMV(mv)}
        {this._renderPlayerIcon()}

        <Text style={styles.itemTitle} numberOfLines={1}>
          {mv['name']}
        </Text>
        <Text style={styles.itemSubTitle} numberOfLines={1}>
          {SongUtil.getArtistNames(mv)}
        </Text>

        <TouchableNativeFeedback
          onPress={() => {
            this.autoHidePlayerIcon();

            if (this.state.url == null) {
              this._loadData();
            } else if (!this.state.showPlayerIcon) {
              this.setState({
                showPlayerIcon: true,
              });
            } else {
              this.setState({
                isPlaying: !this.state.isPlaying,
              });
            }
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: itemWidth,
              height: imageHeight,
            }}
          />
        </TouchableNativeFeedback>

        {/*进度条放在背景点击的上面，不然事件被挡住了 */}
        {this.state.duration > 0 && this._renderProgressBar()}

        <Toast
          ref={toast => {
            this.toast = toast;
          }}
          position="center"
          style={{backgroundColor: Colors.colorPrimary}}
        />

        {this.state.isLoading && this._showLoading()}
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
      isLoading: false,
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
    let currentTime = Math.round(this.state.position / 1000);
    let newTime = Math.round(progress); // 单位：秒
    if (currentTime != newTime) {
      // 用秒比较，减少刷新次数
      this.setState({
        position: newTime * 1000,
      });
      console.log('setCurrentTime: ' + newTime);
    }
  }
}

const screen = Dimensions.get('window');
const itemWidth = screen.width - Dimens.pagePadding * 2;
var itemPadding = Dimens.pagePadding;
var imageHeight = (itemWidth * 9) / 16;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
    margin: itemPadding,
    overflow: 'hidden', // 切掉多余部分
    borderColor: 'white',
    borderWidth: 0, // 边框宽度为0 + hidden，相当于切成圆角。
    borderRadius: 4, // 圆角
    shadowColor: 'grey', // 添加阴影效果
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4, // android端要加上这个属性，不然阴影不出来
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  itemSubTitle: {
    fontSize: 14,
    color: '#333333',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  progressBar: {
    //height: progressHeight,
    //backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center', // 子元素沿主轴的对齐方式
    padding: 10,
    position: 'absolute',
    top: imageHeight - 30 - itemPadding,
  },
  textTime: {
    fontSize: 12,
    color: '#ffffff',
  },
});
