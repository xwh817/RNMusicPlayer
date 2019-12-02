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
    this.animStarted = false;
  }


  startAnim() {
    if (this.animStarted) {
      return; // 如果动画已经开始，就不要重复开始
    }
    this.animStarted = true;
    if (this.animator == undefined) {
      let duration = 24000;
      if (this.props.duration) {
        duration = this.props.duration;
      }

      // 注意useNativeDriver实现动画流畅，打开Perf Monitor,查看界面的fps，动画时 js:低于30，UI:60
      this.animator = Animated.timing(
        // 随时间变化而执行动画
        this.state.animatedValue, // 动画中的变量值
        {
          toValue: 360,
          duration: duration, // 让动画持续一段时间
          easing: Easing.linear, // 匀速
          useNativeDriver: true,  // 使用原生驱动，动画的刷新交给native端，js端fps低，会造成动画不流畅。
        },
      );
      // 循环执行
      this.animator = Animated.loop(this.animator, { iterations: -1 });
    }

    this.animator.start();
    console.log('开始动画');
  }

  pauseAnim() {
    if (!this.animStarted) {
      return; // 如果动画已经开始，就不要重复开始
    }
    console.log('暂停动画');
    this.animStarted = false;
    this.state.animatedValue.stopAnimation(value => {
      // 保存偏移量，不知道为啥要手动保存，不然又重新开始。
      this.state.animatedValue.setOffset(value);
    });
  }

  stopAnim() {
    if (this.animator != undefined) {
      this.animStarted = false;
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
    //console.log(`nextProps-->${nextProps.running} this.props--> ${prevState.running}`);
    if (nextProps.running != prevState.running) {
      return ({
        running: nextProps.running
      });
    } else {
      return null;
    }
  }


  componentDidUpdate(){
    //console.log("componentDidUpdate, running: " + this.state.running);
    if (this.state.running) {
      this.startAnim();
    } else {
      this.pauseAnim();
    }
  }

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