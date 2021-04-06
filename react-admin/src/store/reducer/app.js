// import { setTokens, setName } from "../Type.js";
// import { setToken } from "../action/app";
const app = {
  token: "",
  username: "",
};
const configReducer = function (state = app, action) {
  console.log(action);
  return state;
};
export default configReducer;
