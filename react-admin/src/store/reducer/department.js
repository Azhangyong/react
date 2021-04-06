import { setToken, setUsername } from "../action/app";

const stateData = {
  departmentList: [],
};

//部门
const departmentReducer = function (state = stateData, action) {
  console.log(321);
  switch (action.type) {
    case "ADD_TOKEN":
      // return {
      //     ...state,
      //     departmentList: []
      // }
      console.log(123);
      break;
    default:
      console.log(123);
      return state;
  }
};
export default departmentReducer;
