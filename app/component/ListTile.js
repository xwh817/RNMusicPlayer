import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../values/Colors';

export default class ListTile extends Component {
  render() {
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
            {this.props.title}
          </Text>
          <Text style={styles.itemSubTitle} numberOfLines={1}>
            {this.props.subTitle}
          </Text>
        </View>
        <Entypo name={'heart'} size={24} style={styles.icon} color={Colors.colorGrey} />
      </View>
    );
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