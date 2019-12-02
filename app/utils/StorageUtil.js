import AsyncStorage from '@react-native-community/async-storage';

export default class StorageUtil {

  static isDataChanged = false;
  /**
   * 获取
   * @param key
   * @returns {Promise<T>|*|Promise.<TResult>}
   */
  static get(key) {
    return AsyncStorage.getItem(key)
      .then(value => JSON.parse(value))
      .catch(error => null);
  }

  /**
   * 获取所有
   */
  static async getAll() {
    this.isDataChanged = false;
    const keys = await AsyncStorage.getAllKeys();
    return AsyncStorage.multiGet(keys).then(items => {
      return items.map(item => JSON.parse(item[1]))
    })
  }

  /**
   * 保存，value可以是javascript对象
   * @param key
   * @param value
   * @returns {*}
   */
  static put(key, value) {
    this.isDataChanged = true;
    console.log("put: " + key  + StorageUtil.isDataChanged);
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  // 更新
  static update(key, value) {
    this.isDataChanged = true;
    return get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  /**
   * 删除
   * @param key
   * @returns {*}
   */
  static delete(key) {
    this.isDataChanged = true;
    return AsyncStorage.removeItem(key);
  }
}