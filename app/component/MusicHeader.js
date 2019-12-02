import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../values/Colors';
import SongUtil from '../model/SongUtil';
import StorageUtil from '../utils/StorageUtil';
import Toast from 'react-native-easy-toast';

export default class MusicHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.key = this.props.song.id.toString();
    StorageUtil.get(this.key).then(fav => {
      this.state.favorited = fav != null;
    });

  }

  render() {
    let song = this.props.song;
    return (
      <View style={[styles.item, this.props.style]}>
        <AntDesign
          name={'arrowleft'}
          size={24}
          style={styles.icon}
          color={'white'}
          onPress={this.props.onPress}
        />
        <View style={styles.layoutText}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {song.name}
          </Text>
          <Text style={styles.itemSubTitle} numberOfLines={1}>
            {SongUtil.getArtistNames(song)}
          </Text>
        </View>
        <Entypo name={'heart'} size={24} style={styles.icon}
          color={this.state.favorited ? Colors.colorPrimary : '#ffffff99'}
          onPress={() => {
            this.state.favorited ? this._removeFav() : this._addFav()
          }} />

        <Toast
          ref={toast => {
            this.toast = toast;
          }}
          position="center"
          style={{ backgroundColor: Colors.colorPrimary }}
        />
      </View>
    );
  }

  _addFav() {
    let song = this.props.song;
    let saveSong = {
      id: song.id,
      name: song.name,
      artistNames: SongUtil.getArtistNames(song),
      imageUrl: SongUtil.getSongImage(song, 0),
    }
    StorageUtil.put(this.key, saveSong)
      .then(() => {
        this.setState({favorited: true});
        this.toast.show('已添加收藏');
      }).catch(error => {
        this.toast.show('收藏失败');
      });
  }


  _removeFav() {
    let song = this.props.song;
    StorageUtil.delete(this.key)
      .then(() => {
        this.setState({favorited: false});
        this.toast.show('取消收藏');
      }).catch(error => {
        this.toast.show('取消收藏失败');
      });
  }

}


const styles = StyleSheet.create({
  item: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center', // 子元素沿主轴的对齐方式
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  icon: {
    padding: 12,
  },
  layoutText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', // 子元素沿主轴的对齐方式
    marginLeft: 10,
    overflow: 'hidden'
  },
  itemTitle: {
    fontSize: 15,
    color: '#ffffff'
  },
  itemSubTitle: {
    fontSize: 13,
    color: '#dddddddd',
    marginTop: 2,
  },
});