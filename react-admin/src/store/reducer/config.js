//Reducer
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
const configReducer = (state = config, action) => {
    return state;
};
export default configReducer