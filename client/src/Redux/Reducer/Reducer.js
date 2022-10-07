const initialState = {
    login_State: false,
    AllFaenas:[],
    AllProveedores:[],
    ProveedorById:{},
    FaenaByTropa:[],
    postProveedor:"",
    postCliente:"",
    postCompra:"",
    postVentaCarne:"",
    postVentaAchura:"",
    postFaena:"",
    postRes:"",
    deleteFaena:"",
    deleteCompra:"",
    deleteCliente:"",
    deleteVenta:"",
    deleteProveedor:"",
    login_status:"",
    AllCompras:[],
    CompraByID:{},
    AllVentas:[],
    VentaByID:{},
    AllClientes:[],
    AllStock:[],
    faenasPendientes:[],
    ClienteById:{},
    AllVentasByCliente:[],
    AllReses:[],
    AllResesStockTrue:[],
    arrayResByTropa:[]
}

const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case "LOGIN_STATE":
            return {
            ...state,
            login_State: action.payload,
            };
        case "GET_ALL_COMPRAS":
            return {
            ...state,
            AllCompras: action.payload,
            }
        case "GET_COMPRA_BY_ID":
            return {
            ...state,
            CompraByID: action.payload,
            }
        case "GET_ALL_VENTAS":
            return {
            ...state,
            AllVentas: action.payload,
            }
        case "GET_VENTA_BY_ID":
            return {
                ...state,
                VentaByID:action.payload,
            }
        case "GET_ALL_VENTAS_BY_CLIENTE":
            return {
            ...state,
            AllVentasByCliente: action.payload
            }
        case "GET_ALL_CLIENTES":
            return {
            ...state,
            AllClientes: action.payload,
            }
        case "GET_CLIENTE_BY_ID":
            return {
            ...state,
            ClienteById:action.payload
            }
        case "GET_RESES":
            return {
            ...state,
            AllReses: action.payload[0],
            AllResesStockTrue: action.payload[1],
            arrayResByTropa: action.payload[2],
            }
        case "GET_ALL_FAENAS":
            return{
            ...state,
            AllFaenas: action.payload[0],
            faenasPendientes: action.payload[1],
            }
        case "GET_PROVEEDORES":
        return{
            ...state,
            AllProveedores: action.payload,
        }
        case "GET_PROVEEDOR_BY_ID":
            return{
                ...state,
                ProveedorById: action.payload,
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
        case "POST_NEW_RES":
            return{
                ...state,
                postRes:action.payload
            }
        case "DELETE_FAENA":
            return{
                ...state,
                deleteFaena:action.payload
            }
        case "DELETE_COMPRA":
            return{
                ...state,
                deleteCompra:action.payload
            }
        case "DELETE_CLIENTE":
            return{
                ...state,
                deleteCliente:action.payload
            }
        case "DELETE_VENTA":
            return{
                ...state,
                deleteVenta:action.payload
            }
        case "DELETE_PROVEEDOR":
            return{
                ...state,
                deleteProveedor:action.payload
            }
        case "LOGIN_STATUS":
            return{
                ...state,
                login_status:action.payload
            }
        default:
        return state;
    }
}

export default rootReducer;