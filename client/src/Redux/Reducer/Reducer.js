const initialState = {
    login_State: false,
    AllFaenas:[],
    AllProveedores:[],
    FaenaByTropa:[],
    postProveedor:"",
    postCliente:"",
    postCompra:"",
    postVentaCarne:"",
    postVentaAchura:"",
    postFaena:"",
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
            AllFaenas: action.payload,
        }
        case "GET_PROVEEDORES":
        return{
            ...state,
            AllProveedores: action.payload,
        }
        case "GET_FAENA_BY_TROPA":
            return{
                ...state,
                FaenaByTropa: action.payload,
            }
        case "POST_NEW_PROVEEDOR":
            return{
                ...state,
                postProveedor:action.payload
            }
        case "POST_NEW_CLIENTE":
            return{
                ...state,
                postCliente:action.payload
            }
        case "POST_NEW_COMPRA":
            return{
                    ...state,
                    postCompra:action.payload
            }
        case "POST_NEW_VENTA_CARNE":
            return{
                        ...state,
                        postVentaCarne:action.payload
            }
        case "POST_NEW_VENTA_ACHURA":
            return{
                    ...state,
                    postVentaAchura:action.payload
            }
        case "POST_NEW_FAENA":
            return{
                    ...state,
                    postFaena:action.payload
            }
        default:
        return state;
    }
}

export default rootReducer;