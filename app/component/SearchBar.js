import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../values/Colors';

export default class SearchBar extends Component {

  value = '';

  getValue() {
    return this.value;
  }

  render() { 
    let enable = this.props.enable == undefined ? true : this.props.enable;
    return (
      <View style={[this.props.style, styles.container]}>
        <AntDesign name={'search1'} size={20} color={Colors.colorPrimary} />
        <TextInput
          style={styles.text}
          placeholder={'请输入你想听的'}
          editable={enable}
          autoFocus={this.props.focus}
          onChangeText={value => (this.value = value)}
        />
        <Feather name={'mic'} size={20} color={Colors.colorPrimary} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 10,
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