import { setTokens, setName } from "../Type.js"
export function setToken(params) {
    console.log(params, 2)
    return {
        type: setTokens,
        payload:params
    }
}
export function setUsername(params) {
    console.log(params, 1)
    return {
        type: setName,
        payload:params
    }
}