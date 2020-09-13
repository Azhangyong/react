import { createStore, combineReducers } from "redux";
//reducer
import departmentReducer from "./reducer/department"
import jobReducer from "./reducer/job"
import configReducer from "./reducer/config"
//创建reducer对象
const allReducer = {
  department: departmentReducer,
  job: jobReducer,
  config: configReducer
}
const rootReducer = combineReducers(allReducer)
//创建Store实例
const store = createStore(rootReducer);
export default store;
