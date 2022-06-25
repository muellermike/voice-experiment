const initialState = {
    imageTime: 1000
};

const imageReducer = (state = initialState, action) => {
    switch(action.type) {
        case "STORE_IMG_TIME":
            return {
                ...state,
                imageTime: action.data.imageTime
            };
        default:
            return state;
    }
}

export default imageReducer;