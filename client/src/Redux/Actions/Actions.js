import axios from "axios";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
const URL=`https://frigorifico-backend.herokuapp.com`

// estado de login
export const login_state = () => {
    const e = localStorage.getItem("login")
    return ({ type: "LOGIN_STATE", payload: e  });
           
        };

// User Login
// export const postLogin = (payload) => {
//     return async function (dispatch){
//         try{
//             console.log(payload)
//             const json = await axios.post(`${URL}/user/login`, payload);
//             console.log(json)
//             localStorage.setItem("auth_token",json.data)
//             return dispatch ({
//               type:"LOGIN_TOKEN",
//               payload: json
//           })
//         }
//         catch(err){
//             console.log(err)
//         }
//     }
// }
console.log("hola")
export function postLogin(jsonUser){
  return async function (dispatch){
      try{
          const json = await axios.post(`${URL}/user/login`, jsonUser);
          localStorage.setItem("AuthLogin",json.data.data)   
      }
      catch(err){
          console.log(err)
      }
      
  }
 
}


//Traer Token de localstorage
const token = localStorage.getItem("AuthLogin")
console.log(token)

//Traer todas las compras
export const getAllComrpas = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`${URL}/compras/all`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/compras/all/${proveedor}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/compras/${id}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/faenas/all`,{
              headers: {
                'auth-token': `${token}`
              }
            })
            let faenasMap = json.data.data.map(e=>{
              return [e.tropa,e]
          });
          var faenasMapArr = new Map(faenasMap); 
          
          let unicas = [...faenasMapArr.values()]; 
        
            return dispatch({
            type: "GET_FAENAS",
            payload: unicas})

        }
        catch (error) {
            console.log(error);
          }
        };
      };

//Traer faena por numero de tropa
export const getFaenasByTropa = (tropa) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`${URL}/faenas/${tropa}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
            return dispatch({
            type: "GET_FAENA_BY_TROPA",
            payload: json.data.data})

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
            const json = await axios.get(`${URL}/ventas/all`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/ventas/${id}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/stock`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/clientes/all`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/cliente/${id}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/proveedores/all/`,{
            headers: {
              'auth-token': `${token}`
            }
            })
            console.log(json)
            return dispatch({
            type: "GET_PROVEEDORES",
            payload: json.data.data})

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
            const json = await axios.get(`${URL}/proveedores/${id}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/reses/all`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
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
            const json = await axios.get(`${URL}/reses/${correlativo}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
        
            return dispatch({
            type: "GET_RES_BY_CORRELATIVO",
            payload: json.data})

        }
        catch (error) {
            console.log(error);
          }
        };
      }; 

//Post porveedores
export const postNewProveedor = (proveedor_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`${URL}/proveedores`, proveedor_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_PROVEEDOR",
          payload: json.data.data})

      }
      catch (error) {
          console.log(error);
        }
      };
    };


//Post clientes
export const postNewCliente = (cliente_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`${URL}/clientes`, cliente_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_CLIENTE",
          payload: json.data.data})

      }
      catch (error) {
          console.log(error);
        }
      };
    };

//Post compra
export const postNewCompra = (compra_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`${URL}/crompras`, compra_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_COMPRA",
          payload: json.data.data})

      }
      catch (error) {
          console.log(error);
        }
      };
    };

//Post venta carne
export const postNewVentaCarne = (venta_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`${URL}/crompras`, venta_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_VENTA_CARNE",
          payload: json.data.data})

      }
      catch (error) {
          console.log(error);
        }
      };
    };

//Post venta achura
export const postNewVentaAchura = (venta_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`${URL}/crompras`, venta_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_VENTA_ACHURA",
          payload: json.data.data})

      }
      catch (error) {
          console.log(error);
        }
      };
    };

//Post faena
export const postNewFaena = (faena_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`${URL}/crompras`, faena_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_FAENA",
          payload: json.data.data})

      }
      catch (error) {
          console.log(error);
        }
      };
    };

