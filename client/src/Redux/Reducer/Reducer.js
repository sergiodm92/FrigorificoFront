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
    postNewPagoCompra:"",
    postNewPagoFaena:"",
    postNewPagoVenta:"",
    deleteFaena:"",
    deleteCompra:"",
    deleteCliente:"",
    deleteVenta:"",
    deleteProveedor:"",
    resesAct: "",
    login_status:"",
    ultimaCompra:"",
    ultimaVenta:"",
    ultimaVentaAchura:"",
    pagosByCliente:[],
    pagosByProveedor:[],
    pagosByFrigorifico:[],
    provByNombre:{},
    clienteByNombre:{},
    AllCompras:[],
    CompraByID:{},
    AllVentas:[],
    AllVentasAchuras:[],
    VentasUltimos30Dias:[],
    VentaByID:{},
    VentaAchuraByID:{},
    AllClientes:[],
    AllStock:[],
    faenasPendientes:[],
    ClienteById:{},
    FaenaById:{},
    AllVentasByCliente:[],
    AllVentasAchurasByCliente:[],
    AllComprasByProveedor:[],
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
        case "GET_COMPRAS_BY_PROVEEDOR":
            return {
            ...state,
            AllComprasByProveedor:action.payload[0],
            ultimaCompra:action.payload[1]
            }
        case "GET_COMPRA_BY_ID":
            return {
            ...state,
            CompraByID: action.payload,
            }
        case "GET_ALL_VENTAS":
            return {
            ...state,
            AllVentas: action.payload[0],
            VentasUltimos30Dias: action.payload[1]
            }
        case "GET_VENTA_BY_ID":
            return {
                ...state,
                VentaByID:action.payload,
            }
        case "GET_VENTA_ACHURA_BY_ID":
            return {
                ...state,
                VentaAchuraByID:action.payload,
            }
        case "GET_ALL_VENTAS_BY_CLIENTE":
            return {
            ...state,
            AllVentasByCliente: action.payload[0],
            ultimaVenta: action.payload[1]
            }
        case "GET_ALL_VENTAS_ACHURAS_BY_CLIENTE":
            return {
            ...state,
            AllVentasAchurasByCliente: action.payload[0],
            ultimaVentaAchura: action.payload[1]
            }
        case "GET_ALL_VENTAS_ACHURAS":
            return {
            ...state,
            AllVentasAchuras: action.payload
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
        case "GET_CLIENTE_BY_NAME":
            return{
                ...state,
                clienteByNombre: action.payload
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
                AllProveedores: action.payload
            }
        case "GET_PROVEEDOR_BY_NAME":
            return{
                ...state,
                provByNombre: action.payload
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
        case "GET_FAENA_BY_ID":
            return{
                ...state,
                FaenaById: action.payload,
            }
        case "GET_PAGOS_VENTAS_BY_CLIENTE":
            return{
                ...state,
                pagosByCliente: action.payload,
            }
        case "GET_PAGOS_COMPRAS_BY_PROVEEDOR":
            return{
                ...state,
                pagosByProveedor: action.payload,
            }
        case "GET_PAGOS_FAENAS_BY_FRIGORIFICO":
            return{
                ...state,
                pagosByFrigorifico: action.payload,
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
        case "POST_NEW_PAGO_COMPRA":
            return{
                ...state,
                postNewPagoCompra: action.payload
            }
        case "POST_NEW_PAGO_FAENA":
            return{
                ...state,
                postNewPagoFaena: action.payload
            }
        case "POST_NEW_PAGO_VENTA":
            return{
                ...state,
                postNewPagoVenta: action.payload
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
        case "PUT_RESES":
            return{
                ...state,
                resesAct: action.payload
            }
        case "PUT_STOCK_RESES":
            return{
                ...state,
                resesAct: action.payload
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