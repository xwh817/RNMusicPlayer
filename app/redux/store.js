import { createStore } from "redux";
import rootReducer from "./reducers";

/**
 * 从reducers目录获取所有的reducer
 * 生成store
 */
export default createStore(rootReducer);