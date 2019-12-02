import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../values/Colors'

var valueChanged = false;

export default class SeekBar extends Component {
  containerLeft = 0;
  progressLeft = 0;
  progressRight = 0;
  // 默认props
  static defaultProps = {
    progressHeight: 4,
    progressBackgroundColor: Colors.colorGrey,
    progressColor: '#ff6633',
    thumbSize: 12,      // thumbSize为0则进度条不可拖动
    thumbColor: Colors.colorPrimary,
    thumbColorPressed: '#ff6633',
    min: 0,
    max: 100,
    progress: 0,    // 初始值
  }

  // propTypes用于验证转入的props，当向 props 传入无效数据时，JavaScript 控制台会抛出警告
  /* static propTypes = {
       value: React.PropTypes.number.isRequired,
   }*/

  constructor(props) {
    super(props);
    // 初始化state
    this.state = {
      value: this.props.progress,
      isPressed: false,
    };


    let containerHeight = Math.max(this.props.progressHeight, this.props.thumbSize) * 2;

    // 外部style覆盖内部默认style
    this.styles = StyleSheet.create({
      container: {
        height: containerHeight,
        padding: this.props.progressHeight,
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      progressBackground: {
        height: this.props.progressHeight,
        borderRadius: this.props.progressHeight / 2,
        overflow: 'hidden',
        backgroundColor: this.props.progressBackgroundColor,
      },
      innerProgressCompleted: {
        height: this.props.progressHeight,
        backgroundColor: this.props.progressColor,
      },
      progressThumb: {
        width: this.props.thumbSize,
        height: this.props.thumbSize,
        position: 'absolute',
        backgroundColor: this.props.thumbColor,
        borderStyle: 'solid',
        borderRadius: this.props.thumbSize / 2,
      },

    })
  }

  render() {
    //console.log("render: " + this.props.progress);
    let progressPosition= this.getPositionFromValue(this.props.progress);   // 当前进度的位置（界面位置）
    return (
      <View style={[this.styles.container, this.props.style]}
        onLayout={(e) => {
          this.containerLeft = e.nativeEvent.layout.x;
          console.log("获取容器位置：" + this.containerLeft);
          this.setProgress(this.state.value);
        }}

        onStartShouldSetResponder={() => this.props.thumbSize > 0}
        onMoveShouldSetResponder={() => this.props.thumbSize > 0}
        onResponderGrant={(event) => this.onGrant(event)}
        onResponderMove={(event) => this.onMoving(event)}
        onResponderEnd={(event) => this.onPressEnd(event)}
      >

        <View style={this.styles.progressBackground}
          onLayout={(e) => {
            this.progressLeft = e.nativeEvent.layout.x;
            this.progressRight = this.progressLeft + e.nativeEvent.layout.width;
            console.log("获取进度条位置：" + this.progressLeft + ", " + this.progressRight);
          }}
        >
          <View style={[this.styles.innerProgressCompleted,
          {
            width: progressPosition - this.progressLeft,
            backgroundColor: this.props.progressColor || this.styles.innerProgressCompleted.backgroundColor
          }
          ]} />
          {/*如果还要加其他进度条，在这儿加*/}
        </View>

        <View style={[this.styles.progressThumb,
        {
          left: progressPosition - this.props.thumbSize / 2,
          backgroundColor: this.state.isPressed ? this.props.thumbColorPressed : this.props.thumbColor,
        }]}
        />
      </View>
    );
  }


  // 从父组件获取props更新，转成本组件的state
  // 如果没有更新，返回null
  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("nextProps.progress: " + nextProps.progress + "pre: " + prevState.progress);
    if (Math.round(nextProps.progress) != Math.round(prevState.progress)) {
      valueChanged = true;
      return ({
        progress: nextProps.progress
      });
    } else {
      return null;
    }
  }


  componentDidUpdate() {
    if (valueChanged) {
      valueChanged = false;
      //console.log("SeekBar componentDidUpdate, progress:" + this.state.progress + ", duration: " + this.props.max)
      if (!this.state.isPressed) {
        this.setProgress(this.state.progress);
      }
    }
    
  }



  /**
   * 把对外的value值转成界面对应的位置。
   * @param value
   */
  setProgress(value) {
    if (value < this.props.min) {
      value = this.props.min;
    } else if (value > this.props.max) {
      value = this.props.max;
    }
    let position = this.getPositionFromValue(value);
    this.updatePosition(position);
  }

  getPositionFromValue(value) {
    if (this.props.max <= this.props.min) { // 防止传入不合法的值。
      return 0;
    }
    let position = this.progressLeft + (this.progressRight - this.progressLeft) * (value - this.props.min) / (this.props.max - this.props.min);
    return position;
  }

  getPositionFromEvent(event) {
    let mX = event.nativeEvent.pageX;   // 相对于父组件位置
    let position = mX - this.containerLeft;  // 计算在组件内的位置
    //let position2 = event.nativeEvent.locationX; // 超出范围时会突然变很小，Bug??
    //console.log("getPositionFromEvent:" + mX + ", " + position + ", " + position2);
    return position;
  }

  /**
   *  刷新进度条位置
   * @param position  新的位置
   * @param fromUser  是否是用户手动更新，自动刷新不通知监听器，以免事件死循环。
   */
  updatePosition(position, fromUser = false) {
    let newValue;
    if (position < this.progressLeft) {
      newValue = this.props.min;
    } else if (position > this.progressRight) {
      newValue = this.props.max;
    } else {
      // 去除两边间距，按比例计算出对应值
      newValue = this.props.min + (this.props.max - this.props.min) * (position - this.progressLeft) / (this.progressRight - this.progressLeft);
    }

    this.setState(
      {
        value: newValue,
      }
    )

    // 用户手动拖动才触发监听
    if (fromUser && this.props.onProgressChanged !== undefined) {
      this.props.onProgressChanged(newValue)
    }


    //console.log("updatePosition: " + position + ", value:"+ newValue);

  }


  onGrant(event) {
    console.log("onGrant");
    let position = this.getPositionFromEvent(event);
    this.updatePosition(position, true);
    this.setState(
      {
        isPressed: true,
      }
    )

    if (this.props.onStartTouch !== undefined) {
      this.props.onStartTouch(this.state.value)
    }

  }

  onMoving(event) {
    let position = this.getPositionFromEvent(event);
    this.updatePosition(position, true);
  }

  onPressEnd(event) {
    console.log("onPressEnd");
    let position = this.getPositionFromEvent(event);
    this.updatePosition(position, true);
    this.setState(
      {
        isPressed: false,
      }
    )

    if (this.props.onStopTouch !== undefined) {
      this.props.onStopTouch(this.state.value)
    }
  }

}

