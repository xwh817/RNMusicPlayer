import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

export default class RotateAnimator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      runnig: false,
    };
  }


  startAnim() {
    if (this.animator == undefined) {
      let duration = 16000;
      if (this.props.duration) {
        duration = this.props.duration;
      }

      this.animator = Animated.timing(                  // 随时间变化而执行动画
        this.state.animatedValue,            // 动画中的变量值
        {
          toValue: 360,                   // 透明度最终变为1，即完全不透明
          duration: duration,              // 让动画持续一段时间
          easing: Easing.linear,    // 匀速
        }
      );

      
      // 循环执行
      this.animator = Animated.loop(this.animator, { iterations: -1 });
    }

    /* this.state.animatedValue.setValue(90);*/
    /* this.setState({
      animatedValue : new Animated.Value(90)
    }); */

    this.animator.start();
    console.log('开始动画');
  }

  pauseAnim() {
    this.state.animatedValue.stopAnimation();
  }

  stopAnim() {
    if (this.animator != undefined && this.props.running) {
      this.animator.stop();
      console.log('停止动画');
    }
  }

  componentDidMount() {
    //this.startAnim();
  }

  componentWillUnmount() {
    this.stopAnim();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(`nextProps-->${nextProps.running} this.props--> ${this.props.running}`);
    if (nextProps.running != undefined && nextProps.running != this.props.running) {
      if (nextProps.running) {
        this.startAnim();
      } else {
        this.pauseAnim();
      }
    }
  }

  render() {
    const animRotate = this.state.animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg']
    });
    return (
      <Animated.View                 // 使用专门的可动画化的View组件
        style={{
          ...this.props.style,
          transform: [{ rotate: animRotate }],         // 将透明度指定为动画变量值
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}