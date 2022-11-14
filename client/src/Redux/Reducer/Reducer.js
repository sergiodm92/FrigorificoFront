const initialState = {
    login_State: false,
    alert_msj:'',
    AllFaenas:[],
    AllProveedores:[],
    ProveedorById:{},
    FaenaByTropa:{},
    editarCliente:'',
    deleteFaena:'',
    deleteCompra:'',
    deleteCliente:'',
    deleteVenta:'',
    deleteProveedor:'',
    resesAct: '',
    kgReses:'',
    login_status:'',
    urlImg: '',
    alertRes:[],//------------------------------
    saldoprov:0,
    saldoCliente:0,
    saldoAllCompras:0,
    saldoAllVentas:0,
    saldoAllFaenas:0,
    grupos: [],
    pagosByCliente:[],
    pagosAchurasByCliente:[],
    pagosByProveedor:[],
    pagosByFrigorifico:[],
    provByNombre:{},
    clienteByNombre:{},
    AllCompras:[],
    CompraByID:{},
    AllVentas:[],
    AllVentasAchuras:[],
    VentasUltimos30Dias:[],
    ventAchurasult30:[],
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
    arrayResByTropa:[],
    AllPagosbyCompra:[],
    AllPagosbyFaena:[],
    pagosByVentaID:[],
    pagosByVentaAchuraID:[],
    allPagosVentas:[],
    allPagosVentasAchuras:[],
    allPagosCompras:[],
    allPagosFaenas:[],
    allPagosExtras:[],
    allIngresosExtras:[]
}

const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (action.type) {
        case "LOGIN_STATE":
            return {
            ...state,
            login_State: action.payload,
            };
        case "ALERT_MSJ":
            return{
                ...state,
                alert_msj:action.payload
            }
        case "GET_ALL_COMPRAS":
            return {
            ...state,
            AllCompras: action.payload,
            }
        case "GET_SALDO_ALL_COMPRAS":
            return {
            ...state,
            saldoAllCompras: action.payload,
            }
        case "GET_SALDO_ALL_VENTAS":
            return {
            ...state,
            saldoAllVentas: action.payload,
            }
        case "GET_SALDO_ALL_FAENAS":
            return {
            ...state,
            saldoAllFaenas: action.payload,
            }
        case "GET_COMPRAS_BY_PROVEEDOR":
            return {
            ...state,
            AllComprasByProveedor:action.payload,
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
        case "GET_ALL_VENTAS_ULTIMOS_30_DIAS":
            return {
            ...state,
            VentasUltimos30Dias: action.payload
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
            AllVentasByCliente: action.payload,
            }
        case "GET_ALL_VENTAS_ACHURAS_BY_CLIENTE":
            return {
            ...state,
            AllVentasAchurasByCliente: action.payload,
            }
        case "GET_ALL_VENTAS_ACHURAS":
            return {
            ...state,
            AllVentasAchuras: action.payload,
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
        case "URL_IMG":
            return{
            ...state,
            urlImg: action.payload
            }
        case "GET_GRUPOS_BY_TROPA":
            return{
            ...state,
            grupos: action.payload
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
        case "GET_PAGOS_VENTAS_ACHURAS_BY_CLIENTE":
            return{
                ...state,
                pagosAchurasByCliente: action.payload,
            }
        case "GET_PAGOS_COMPRAS_BY_PROVEEDOR":
            return{
                ...state,
                pagosByProveedor: action.payload,
            }
        case "GET_RESES_ALERT":
            return{
                ...state,
                alertRes: action.payload,
            }
        case "GET_PAGOS_VENTAS_BY_ID":
            return{
                ...state,
                pagosByVentaID: action.payload,
                }
        case "GET_PAGOS_VENTA_ACHURAS_BY_ID":
            return{
                ...state,
                pagosByVentaAchuraID: action.payload,
                }
        case "GET_PAGOS_FAENAS_BY_FRIGORIFICO":
            return{
                ...state,
                pagosByFrigorifico: action.payload,
            }
        case "GET_PAGOS_COMPRAS_BY_ID":
            return{
                ...state,
                AllPagosbyCompra: action.payload,
            }
        case "GET_PAGOS_FAENAS_BY_ID":
            return{
                ...state,
                AllPagosbyFaena: action.payload,
            }
        case "GET_ALL_INGRESOS_EXTRAS":
            return{
                ...state,
                allIngresosExtras: action.payload,
                }
        case "GET_SALDO_BY_PROVEEDOR":
            return{
                ...state,
                saldoprov: action.payload,
            }
        case "GET_SALDO_BY_CLIENTE":
            return{
                ...state,
                saldoCliente: action.payload,
                }
        case "GET_ALL_PAGOS_VENTAS":
            return {
            ...state,
            allPagosVentas: action.payload,
            }
        case "GET_ALL_PAGOS_VENTAS_ACHURAS":
            return {
            ...state,
            allPagosVentasAchuras: action.payload,
        }
        case "GET_ALL_PAGOS_COMPRAS":
            return {
            ...state,
            allPagosCompras: action.payload,
            }
        case "GET_ALL_PAGOS_FAENAS":
            return {
            ...state,
            allPagosFaenas: action.payload,
            }
        case "GET_ALL_PAGOS_EXTRAS":
            return{
                ...state,
                allPagosExtras:action.payload
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
        case "PUT_KG_RESES":
            return{
                ...state,
                kgReses: action.payload
            }
        case "PUT_EDITAR_CLIENTE":
            return{
                ...state,
                editarCliente: action.payload
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