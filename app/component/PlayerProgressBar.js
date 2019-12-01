import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SeekBar from './SeekBar'
import StringUtil from '../utils/StringUtil'
import Colors from '../values/Colors';

export default class PlayerProgressBar extends Component {
  render() {
    return (
      <View style={[styles.progressBar, this.props.style]}>
        <Text style={styles.text}>{StringUtil.formatTime(this.props.position)}</Text>
        <SeekBar style={{ flex: 1, marginLeft: 20, marginRight:20 }}
          progressHeight = {2}
          onChanged={(progress) => this.props.onChanged(progress)}
          progress={this.props.position}
          min={0}
          max={this.props.duration}
          progressBackgroundColor='#663300'
          progressColor='#ff6633'
          thumbColor={Colors.colorPrimary}
          thumbColorPressed='#ff6633'
        />

        <Text style={styles.text}>{StringUtil.formatTime(this.props.duration)}</Text>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center', // 子元素沿主轴的对齐方式
  },
  text: {
    fontSize: 12,
    color: '#ffffff'
  }
});