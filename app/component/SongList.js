import React, {Component} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import SongListItem from './SongListItem';

const itemHeight = 70; // 如果可以确定高度，免去了渲染计算高度

export default class SongList extends Component {
  render() {
    if (this.props.songs == null) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={46} color={'green'} animating={true} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.songs}
          renderItem={this._renderItem}
          //renderItem={(itemData) => this.getItemView(itemData.item)}
          //ItemSeparatorComponent={this.getSeparator}
          keyExtractor={(item, index) => index.toString()}
          //keyExtractor={(item) => item.id.toString()}
          //onPressItem={(index) => alert('item ' + index + 'pressed')}
          //refreshing={this.state.isLoading}
          getItemLayout={this._getItemLayout}
        />
      </View>
    );
  }

  _onItemPress = item => {
    console.log('_onItemPressed: ' + item.name);
    this.props.navigation.navigate('MusicPlayer', {song: item});
  };

  _getItemLayout = (data, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  _renderItem = ({item}) => (
    <SongListItem item={item} onPress={this._onItemPress} />
  );

  getSeparator = () => {
    return <View style={styles.separator} />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /* separator: {
    width: screen.width - 20,
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#eeeeee',
    borderStyle: 'dotted',
  }, */
});
