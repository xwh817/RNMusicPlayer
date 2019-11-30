import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

export default class RotateAnimator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      running: false,
    };
  }


  startAnim() {
    if (this.animator == undefined) {
      let duration = 16000;
      if (this.props.duration) {
        duration = this.props.duration;
      }

      this.animator = Animated.timing(     // 随时间变化而执行动画
        this.state.animatedValue,          // 动画中的变量值
        {
          toValue: 360,
          duration: duration,              // 让动画持续一段时间
          easing: Easing.linear,    // 匀速
        }
      );
      // 循环执行
      this.animator = Animated.loop(this.animator, { iterations: -1 });
    }

    this.animator.start();
    console.log('开始动画' + this.lastValue);
  }

  pauseAnim() {
    console.log('暂停动画');
    this.state.animatedValue.stopAnimation(value => {
      // 保存偏移量，不知道为啥要手动保存，不然又重新开始。
      this.state.animatedValue.setOffset(value);
    });
  }

  stopAnim() {
    if (this.animator != undefined) {
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

  // 从父组件获取props更新，转成本组件的state
  // 如果没有更新，返回null
   static getDerivedStateFromProps(nextProps, prevState) {
    console.log(`nextProps-->${nextProps.running} this.props--> ${prevState.running}`);
    if (nextProps.running != prevState.running) {
      return ({
        running: nextProps.running
      });
    } else {
      return null;
    }
  }


  componentDidUpdate(){
    if (this.state.running) {
      this.startAnim();
    } else {
      this.pauseAnim();
    }
  }

  // componentWillReceiveProps 过时被弃用
  /* componentWillReceiveProps(nextProps, nextContext) {
    console.log(`nextProps-->${nextProps.running} this.props--> ${this.props.running}`);
    if (nextProps.running != undefined && nextProps.running != this.props.running) {
      if (nextProps.running) {
        this.startAnim();
      } else {
        this.pauseAnim();
      }
    }
  } */

  render() {
    const animRotate = this.state.animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg']
    });
    return (
      <Animated.View
        style={{
          ...this.props.style,
          transform: [{ rotate: animRotate }], 
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}