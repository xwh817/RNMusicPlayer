import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import MusicApi from '../dao/MusicApi';
import PlayListItem from '../component/PlayListItem';

var mount;

export default class PlayListTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  loadData() {
    this.setState({isLoading: true});

    MusicApi.getPlayList(this.props.cat)
      .then(items => {
        if (mount) {
          this.setState({
            isLoading: false,
            data: items,
          });
        }
      })
      .catch(error => console.error(error));
  }

  // 页面加载完成之后，获取数据。
  componentDidMount() {
    mount = true;
    this.loadData();
  }

  componentWillUnmount() {
    mount = false;
  }

  render() {
    if (this.isLoading) {
      return (
        <ActivityIndicator size={'large'} color={'green'} animating={true} />
      );
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
    );
  }

  _onItemPress = item => {
    console.log('_onItemPressed: ' + item.name);
  };

  _renderItem = ({item}) => (
    <PlayListItem item={item} onPress={this._onItemPress} />
  );
}
