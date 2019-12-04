import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SongUtil from '../model/SongUtil';

// 利用PureComponent来进一步优化性能
export default class SongListItem extends React.PureComponent {
  // onPressItem属性使用箭头函数而非bind的方式进行绑定，
  // 使其不会在每次列表重新render时生成一个新的函数，从而保证了props的不变
  // ，不会触发自身无谓的重新render。
  _onPress = () => {
    this.props.onPress(this.props.item);
  };

  render() {
    let item = this.props.item;
    let source;
    let imageUrl = SongUtil.getSongImage(item);
    if (imageUrl == '') {
      source = require('../images/music_cover.jpg');
    } else {
      source = {uri: imageUrl};
    }
    //console.log('render item: ' + item.name);
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.item}>
          <Image
            roundAsCircle={true}
            source={source}
            style={{width: 60, height: 60, borderRadius: 6}}
          />
          <View style={styles.layoutText}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item['name']}
            </Text>
            <Text style={styles.itemSubTitle} numberOfLines={1}>
              {SongUtil.getArtistNames(item)}
            </Text>
          </View>

          {/* <TouchableNativeFeedback onPress={this._onPress}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: screen.width -20,
              height:60,
            }}
          />
        </TouchableNativeFeedback> */}
        </View>
      </TouchableOpacity>
    );
  }
}


const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: "#eeeeee",
    justifyContent: 'space-around', // 子元素沿主轴的对齐方式
    marginHorizontal: 10,
    marginVertical: 5,
    //padding: 10,
    //borderRadius: 4,    // 圆角
    /* shadowColor: 'grey', // 添加阴影效果
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2, */ // android端要加上这个属性，不然阴影不出来
  },
  layoutText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', // 子元素沿主轴的对齐方式
    marginLeft: 10,
    overflow: 'hidden'
    //padding: 10
  },
  itemTitle: {
    fontSize: 14,
  },
  itemSubTitle: {
    fontSize: 12,
    color: '#aaaaaa',
    marginTop: 2,
  },
});

