import axios from "axios";
import swal from "sweetalert";

// estado de login
export const login_state = (e) => {
 
    return ({ type: "LOGIN_STATE", payload: e  });
           
        };


//Traer todas las compras
export const getAllComrpas = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/compras/all`);
        
            return dispatch({
            type: "GET_COMPRAS",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      };

//Traer todas las compras de un proveedor
export const getAllComrpasByProveedor = (proveedor) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/compras/all/${proveedor}`);
        
            return dispatch({
            type: "GET_COMPRAS_BY_PROVEEDOR",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      };

//Traer compra por ID
export const getComrpaByID = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/compras/${id}`);
        
            return dispatch({
            type: "GET_COMPRA_BY_ID",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      };


//Traer todas las faenas
export const getAllFaenas = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/faenas/all`);
        
            return dispatch({
            type: "GET_FAENAS",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      };

//Traer faena por numero de tropa
export const getFaenasByID = (tropa) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/faenas/${tropa}`);
        
            return dispatch({
            type: "GET_FAENA_BY_TROPA",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      };


//Traer todas las ventas
export const getAllVentas = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/ventas/all`);
        
            return dispatch({
            type: "GET_VENTAS",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      };   

//Traer venta por ID
export const getVentaByID = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/ventas/${id}`);
        
            return dispatch({
            type: "GET_VENTA_BY_ID",
            payload: json.data})
        }
        catch (error) {
            console.log(error);
          }
        };
      };

//Traer todo el stock
export const getAllStock = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/stock`);
        
            return dispatch({
            type: "GET_STOCK",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      };  

//Traer todos los clientes
export const getAllClientes = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/clientes/all`);
        
            return dispatch({
            type: "GET_CLIENTES",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      };   

//Traer cliente por ID
export const getClienteByID = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/cliente/${id}`);
        
            return dispatch({
            type: "GET_CLIENTE_BY_ID",
            payload: json.data})
        }
        catch (error) {
            console.log(error);
          }
        };
      };

//Traer todos los proveedores
export const getAllProveedores = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/proveedores/all`);
        
            return dispatch({
            type: "GET_PROVEEDORES",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      }; 

//Traer Proveedor por ID
export const getProveedorByID = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/proveedores/${id}`);
        
            return dispatch({
            type: "GET_PROVEEDOR_BY_ID",
            payload: json.data})
        }
        catch (error) {
            console.log(error);
          }
        };
      };

//Traer todas las reses
export const getAllReses = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/reses/all`);
        
            return dispatch({
            type: "GET_RESES",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      }; 

//Traer res por correlativo
export const getResByCorrelativo = (correlativo) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`/reses/${correlativo}`);
        
            return dispatch({
            type: "GET_RES_BY_CORRELATIVO",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      }; 






