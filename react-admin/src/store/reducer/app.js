import { setTokens, setName } from "../Type.js"
const app={
    token:"",
    username:""
}
const configReducer = function (state = app, action) {
    console.log(action,3);
    return state
}
export default configReducer