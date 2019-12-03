import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, StatusBar } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../values/Colors';


export default class SearchBar extends Component {

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <AntDesign name={'search1'} size={20} color={Colors.colorPrimary} />
        <TextInput style={styles.text}
          placeholder={'请输入你想听的'}
          editable={true}
        />
        <Entypo name={'mic'} size={20} color={Colors.colorPrimary} />
      </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 8,
    backgroundColor: '#ffffffdd',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 13,
    marginLeft: 4,
    padding: 0,
    color: '#333333'
  }
});