import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import MusicApi from '../dao/MusicApi';
import SongListItem from '../component/SongListItem';
import ImageSwiper from '../component/ImageSwiper';
import SearchBar from '../component/SearchBar';
import Colors from '../values/Colors';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import {connect} from "react-redux"
import {barStyleLight} from "../redux/actions"


class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSongs: [],
      items: [
        {
          type: 'header',
        },
      ],
      topOpacity: 0,
      topMargin: 0,
    };
    this.mount = false;
  }

  loadData() {
    MusicApi.getNewSongs()
      .then(songs => {
        if (this.mount) {
          this.setState({
            newSongs: songs.slice(0, 5),
          });
        }
      })
      .catch(error => console.log(error));

    MusicApi.getTopSongs(1)
      .then(songs => {
        if (this.mount) {
          this.setState({
            items: this.state.items.concat(songs),
          });
        }
      })
      .catch(error => console.log(error));
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    this.mount = true;
    this.loadData();

    // 监听页面focus
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      console.log("Recommend didFocus ");
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    });
  }

  componentWillUnmount() {
    this.mount = false;
    this._navListener.remove();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.items}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          onScroll={this.onScroll}
        />

        <View
          style={{
            backgroundColor: Colors.colorPrimary,
            position: 'absolute',
            width: screen.width,
            height: searchBarBgHeight,
            alignItems: 'center',
            opacity: this.state.topOpacity,
          }}
        />
        <SearchBar
          style={styles.searchBar}
          height={searchBarHeight}
          focus={false}
          enable={false}
        />
        <Text
          style={styles.searchBar}
          height={searchBarHeight}
          onPress={() => {
            console.log('onPress');
            this.props.navigation.navigate('SearchPage', {
              transitionType: 'forFade',
            });
          }}>
          {' '}
        </Text>
      </View>
    );
  }

  onScroll = event => {
    let y = event.nativeEvent.contentOffset.y;

    let opacity = y > swiperOffset ? 1 : y / swiperOffset;
    let margin = y > swiperOffset ? swiperOffset / 2 : y / 2;
    //console.log(y);
    this.setState({
      topOpacity: opacity,
      topMargin: margin,
    });
  };

  _onItemPress = item => {
    console.log('_onItemPressed: ' + item.name);
    this.props.navigation.navigate('MusicPlayer', {song: item});
  };

  _renderItem = ({item}) => {
    if (item.type == 'header') {
      return <ImageSwiper height={swiperHeight} songs={this.state.newSongs} />;
    } else {
      return <SongListItem item={item} onPress={this._onItemPress} />;
    }
  };
}

const screen = Dimensions.get('window');
const searchBarPaddingVertical = 10;
const swiperHeight = (screen.width * 52) / 90;
const searchBarHeight = 36;
const searchBarPaddingHorizal = 36;
const searchBarBgHeight =
  StatusBar.currentHeight + searchBarHeight + searchBarPaddingVertical * 2;
const swiperOffset = swiperHeight - searchBarBgHeight;

const styles = StyleSheet.create({
  searchBar: {
    width: screen.width - searchBarPaddingHorizal * 2,
    height: searchBarHeight,
    position: 'absolute',
    top: StatusBar.currentHeight + searchBarPaddingVertical,
    marginHorizontal: searchBarPaddingHorizal,
  }
})



const mapStateToProps = (state) => {
  return {
    barStyle: state.viewStyle.barStyle,
  }
}

// 对当前页面进行包装，进行dispatch到props的映射。
export default connect(
  mapStateToProps, {barStyleLight})(Recommend);

