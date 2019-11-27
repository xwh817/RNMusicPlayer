import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';

export default class PlayListItem extends React.PureComponent {

  render() {
    var item = this.props.item;
    return (
      <View style={styles.item} roundAsCircle={true}>
        <Image
          source={{uri: `${item.coverImgUrl}?param=300y300`}}
          style={{width: itemWidth, height: itemWidth}}
        />
        <View style={styles.layoutText}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item['name']}
          </Text>
        </View>

        <TouchableNativeFeedback onPress={()=> this.props.onPress(item)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: itemWidth,
              height: itemWidth,
            }}
          />
        </TouchableNativeFeedback>
      </View>
    );
  };
}

const itemPadding = 10;
const screen = Dimensions.get('window');
const itemWidth = (screen.width - itemPadding * 3) / 2;
const styles = StyleSheet.create({
  item: {
    width: itemWidth,
    height: itemWidth,
    backgroundColor: '#eeeeee',
    marginLeft: itemPadding,
    marginTop: itemPadding,
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
  layoutText: {
    width: itemWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 6,
    position: 'absolute',
    bottom: 0,
  },
  itemTitle: {
    fontSize: 12,
    color: 'white',
  },
});
