import Faenas from "../../Pages/Faenas/Faenas";

const initialState = {
    login_State: false,
    auth_token:"",
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
        case "USER_LOGIN":
            return{
            ...state,
            auth_token: action.payload,
            }
        case "GET_FAENAS":
        return{
            ...state,
            Faenas: action.payload,
        }
        
        default:
        return state;
    }
}

export default rootReducer;