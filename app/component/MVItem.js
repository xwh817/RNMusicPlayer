import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import Dimens from '../values/Dimens';
import SongUtil from '../model/SongUtil'

export default class MVItem extends React.PureComponent {

  render() {
    var item = this.props.item;
    var imageHeight = itemWidth * 9 / 16;
    return (
      <View style={styles.item} roundAsCircle={true}>
        <Image
          source={{uri: `${item['cover']}?param=640y360`}}
          style={{width: itemWidth, height: imageHeight}}
        />
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item['name']}
        </Text>
        <Text style={styles.itemSubTitle} numberOfLines={1}>
          {SongUtil.getArtistNames(item)}
        </Text>

        <TouchableNativeFeedback onPress={() => this.props.onPress(item)}>
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
      </View>
    );
  };
}

const screen = Dimensions.get('window');
const itemWidth = screen.width - Dimens.pagePadding * 2;
const styles = StyleSheet.create({
  item: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
    marginLeft: Dimens.pagePadding,
    marginRight: Dimens.pagePadding,
    marginTop: Dimens.pagePadding,
    marginBottom: Dimens.pagePadding,
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
});
