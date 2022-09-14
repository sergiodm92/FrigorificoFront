const initialState = {
    login_State: true
}

const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case "LOGIN_STATE":
            return {
            ...state,
            login_State: action.payload,
            };
        
        default:
        return state;
    }
}

export default rootReducer;