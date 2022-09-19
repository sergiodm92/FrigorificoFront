const initialState = {
    login_State: false,
    AuthLogin: {},
    Faenas:[]
}

const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case "LOGIN_STATE":
            return {
            ...state,
            login_State: action.payload,
            };
        case "GET_FAENAS":
        return{
            ...state,
            Faenas: action.payload,
        }
        case "AUTH_LOGIN":
        return{
            ...state,
            AuthLogin: action.payload
        }
        default:
        return state;
    }
}

export default rootReducer;