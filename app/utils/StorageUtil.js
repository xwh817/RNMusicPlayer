import {AsyncStorage} from 'react-native'

export default class StorageUtil {
    
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */
    static get(key) {
        return AsyncStorage.getItem(key).then(value =>{return JSON.parse(value)});
    }


    /**
     * 保存，value可以是javascript对象
     * @param key
     * @param value
     * @returns {*}
     */
    static put(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    // 更新
    static update(key, value) {
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
        return AsyncStorage.removeItem(key);
    }
}