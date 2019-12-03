import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Dimensions } from 'react-native';
import MusicApi from '../dao/MusicApi';
import SongListItem from '../component/SongListItem';
import ImageSwiper from '../component/ImageSwiper';
import SearchBar from '../component/SearchBar';

export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          type: 'header',
          key: 'header',
        }
      ],
    };
    this.mount = false;
  }

  loadData() {
    MusicApi.getTopSongs(0)
      .then(songs => {
        if (this.mount) {
          this.setState({
            items: this.state.items.concat(songs),
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
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <FlatList
          data={this.state.items}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={this._getItemLayout}
        />

        <SearchBar style={styles.searchBar} />

      </View>
    );
  }


  _onItemPress = item => {
    console.log('_onItemPressed: ' + item.name);
    this.props.navigation.navigate('MusicPlayer', { song: item });
  };

  _renderItem = ({ item }) => {
    if (item.type == 'header') {
      return (<ImageSwiper songs={this.state.items.length > 1 ? this.state.items.slice(1, 6) : []} />);
    } else {
      return (<SongListItem item={item} onPress={this._onItemPress} />);
    }
  };



}

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  searchBar: { 
    width: screen.width - 32 * 2,
    position: 'absolute', 
    top: StatusBar.currentHeight + 2,
    marginHorizontal: 32,
   }
})