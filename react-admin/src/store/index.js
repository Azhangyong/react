import { createStore } from "redux";
//参数
const config = {
  status: [
    {
      label: "禁用",
      value: false,
    },
    {
      label: "启用",
      value: true,
    },
  ],
};
//Reducer
const configReducer = (state = config, action) => {
  console.log(state, action);
  return state;
};
const store = createStore(configReducer);
export default store;
