import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator} from 'react-native';
import MusicApi from '../dao/MusicApi';
import {Lyric, LyricItem} from '../model/Lyric';
import Colors from '../values/Colors';

export default class LyricComonent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyric: undefined,
      isLoading: true,
      position: 0,
      currentIndex: -1,
    };
    this.mount = false;
    this.currentY = 0;
    this.lyricEmpty = true;
  }

  loadData() {
    this.setState({isLoading: true});

    MusicApi.getLyric(this.props.song.id)
      .then(str => {
        let lyric = null;
        if (str === '') {
          lyric = '';
        } else {
          lyric = new Lyric(str);
        }

        //console.log("加载歌词：" + str);
        if (this.mount) {
          this.setState({
            isLoading: false,
            lyric: lyric,
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.mount &&
          this.setState({
            lyric: null,
          });
      });
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    this.mount = true;
    this.loadData();
  }

  componentWillUnmount() {
    this.mount = false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.position != prevState.position) {
      changed = true;
      return {
        position: nextProps.position,
      };
    } else {
      return null;
    }
  }

  componentDidUpdate() {
    if (changed && !this.lyricEmpty) {
      let index = this.getIndexByTime(this.state.position);
      if (index != this.state.currentIndex) {
        this.scrollTo(index);
      }
      changed = false;
    }
  }

  /// 比较播放位置和歌词时间戳，获取当前是哪条歌词。
  /// milliseconds 当前播放位置，单位：毫秒
  getIndexByTime(milliseconds) {
    let lyric = this.state.lyric;
    if (
      lyric == null ||
      lyric.items.length == 0 ||
      lyric.items[0].position > milliseconds
    ) {
      // 刚开始未选中的情况。
      return -1;
    }

    // 选取比较的范围，不用每次都从头遍历。
    let start;
    let end;
    if (
      this.state.currentIndex <= 1 ||
      this.state.currentIndex >= lyric.items.length
    ) {
      start = 0;
      end = lyric.items.length;
    } else if (
      milliseconds >= lyric.items[this.state.currentIndex - 1].position
    ) {
      start = this.state.currentIndex;
      end = lyric.items.length;
    } else {
      start = 0;
      end = this.state.currentIndex;
    }

    let index = start;
    for (; index < end - 1; index++) {
      if (lyric.items[index + 1].position >= milliseconds) {
        break;
      }
    }
    return index;
  }

  scrollTo(index) {
    let itemSize = this.state.lyric.items.length;
    // 选中的Index是否超出边界
    /* if (index < 0 || index >= itemSize) {
      return;
    } */

    let offset = (visibleItemSize - 1) / 2;
    let topIndex = index - offset; // 选中元素居中时,top的Index
    let bottomIndex = index + offset;

    this.setState({
      currentIndex: index,
    });

    // 是否需要滚动(top和bottom到边界时不滚动了)
    if (topIndex < 0) {
      if (this.currentY <= 0) {
        return;
      }
      topIndex = 0;
    }
    if (bottomIndex >= itemSize) {
      if (this.currentY >= (itemSize - visibleItemSize) * itemHeight) {
        return;
      }
      topIndex = itemSize - offset;
    }

    //console.log('scrollToIndex: ' + topIndex);
    this.flatList.scrollToIndex({index: topIndex, animated: true});
  }

  _renderLyric() {
    //console.log('lyric: ' + this.state.lyric);
    if (this.state.lyric === undefined) {
      return <Text style={styles.text}>歌词加载中...</Text>;
    } else if (this.state.lyric === '') {
      return <Text style={styles.text}>...纯音乐 无歌词...</Text>;
    } else if (this.state.lyric === null) {
      return <Text style={styles.text}>歌词加载失败</Text>;
    } else {
      this.lyricEmpty = false;
      return (
        <FlatList
          ref={ref => {
            this.flatList = ref;
          }}
          data={this.state.lyric && this.state.lyric.items}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={this._getItemLayout}
          showsVerticalScrollIndicator={false}
          onScroll={event => {
            this.currentY = event.nativeEvent.contentOffset.y;
          }}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: itemHeight * visibleItemSize,
            justifyContent: 'center',
          }}>
          {this._renderLyric()}
        </View>
      </View>
    );
  }

  _getItemLayout = (data, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  _renderItem = ({item}) => (
    <Text
      numberOfLines={1}
      style={[
        styles.text,
        {
          color:
            item.index == this.state.currentIndex ? '#ffffff' : '#ffffff99',
        },
      ]}>
      {item.content}
    </Text>
  );
}

const screen = Dimensions.get('window');
let changed = false;
const itemHeight = 30; // 如果可以确定高度，免去了渲染计算高度
const visibleItemSize = screen.height < 700 ? 5 : 7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 12,
  },
  text: {
    height: itemHeight,
    fontSize: 12,
    textAlign: 'center',
    color: '#ffffff99',
  },
});
