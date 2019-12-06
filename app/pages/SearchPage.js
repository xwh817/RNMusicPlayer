import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MusicApi from '../dao/MusicApi';
import SongList from '../component/SongList';
import SearchBar from '../component/SearchBar';
import Colors from '../values/Colors';
import Toast from 'react-native-easy-toast';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: null,
      isLoading: false,
    };
  }

  loadData(keywords) {
    if (keywords == '') {
      this.toast.show('请输入你想听的');
      return;
    }
    this.setState({
      isLoading: true,
    });
    MusicApi.search(keywords)
      .then(songs => {
        console.log(songs.length);
        if (this.mount) {
          this.setState({
            isLoading: false,
            songs: songs,
          });
          Keyboard.dismiss();
        }
      })
      .catch(error => console.log(error));
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    this.mount = true;
  }

  componentWillUnmount() {
    this.mount = false;
  }

  renderContent() {
    let songs = this.state.songs;
    if (songs == null && !this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: '#999999',
              fontSize: 12,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            {'搜你想听，例如：\n钢琴曲\n好听的歌\n轻音乐\n周杰伦\n...'}
          </Text>
        </View>
      );
    } else {
      return <SongList navigation={this.props.navigation} songs={songs} isLoading={this.state.isLoading}/>;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.colorPrimary}
          translucent={false}
        />
        <View style={styles.header}>
          <AntDesign
            name={'arrowleft'}
            size={24}
            style={styles.iconBack}
            color={'white'}
            onPress={() => this.props.navigation.pop()}
          />
          <SearchBar
            ref={ref => (this.searchBar = ref)}
            focus={true}
            style={styles.searchBar}
            height={36}
          />
          <TouchableOpacity
            onPress={() => {
              let keywords = this.searchBar.getValue();
              this.loadData(keywords);
            }}>
            <Text style={styles.textButton}>{'搜索'}</Text>
          </TouchableOpacity>
        </View>

        {this.renderContent()}


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
}

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: screen.width,
    height: 50,
    backgroundColor: Colors.colorPrimary,
    alignItems: 'center',
  },
  iconBack: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchBar: {
    width: screen.width - 36 * 2,
    height: 36,
  },
  textButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: 'white',
  },
});
