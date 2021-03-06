
const initialState = {
  barStyle: 'dark-content'
};

/**
* reducer是一个纯函数，根据action返回新的状态
*/
export default function(state = initialState, action) {
  switch (action.type) {
      case 'light': {
          return {barStyle: 'light-content'}
      }
      case 'dark': {
          return {barStyle: 'dark-content'}
      }
      default:
          return state;
  }
}