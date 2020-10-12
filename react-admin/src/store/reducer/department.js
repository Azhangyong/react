const stateData = {
    departmentList: []
}


//部门
const departmentReducer = function (state = stateData, action) {
    console.log(456)
    switch (action.type) {
        case "aaa":
            return {
                ...state,
                departmentList: []
            }
        default:
            return state
    }

}
export default departmentReducer