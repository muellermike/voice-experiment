const initialState = {
    experimentName: ""
};

const experimentReducer = (state = initialState, action) => {
    switch(action.type) {
        case "STORE_EXP_NAME":
            return {
                ...state,
                experimentName: action.data.experimentName
            };
        default:
            return state;
    }
}

export default experimentReducer;