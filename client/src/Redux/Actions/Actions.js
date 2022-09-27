import axios from "axios";
const URL=`https://frigorifico-backend.herokuapp.com`


// estado de login
export const login_state = () => {
    const e = localStorage.getItem("login")
    return ({ type: "LOGIN_STATE", payload: e  });
        };
export const setlogin_state = (value) => {
    
    return ({ type: "LOGIN_STATE", payload: value  });
        };

// User Login
// export const postLogin = (payload) => {
//     return async function (dispatch){
//         try{
//             const json = await axios.post(`${URL}/user/login`, payload);
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

export function postLogin(jsonUser){
  return async function (dispatch){
      try{
          const json = await axios.post(`${URL}/user/login`, jsonUser);
          if(json.data.status==="ok")localStorage.setItem("AuthLogin",json.data.data)   
          return dispatch({
            type: "LOGIN_STATUS",
            payload: json.data.status})
        }
      catch(err){
        return dispatch({
          type: "LOGIN_STATUS",
          payload: "error"})
      }
      
  }
}

export function setStatus(value){
  return async function (dispatch){
      try{
          return dispatch({
            type: "LOGIN_STATUS",
            payload: value})
        }
      catch(err){
        console.log(err)
      }
      
  }
}

//Traer Token de localstorage
const token = localStorage.getItem("AuthLogin")
console.log("token")
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
            type: "GET_ALL_COMPRAS",
            payload: json.data.data})
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
            payload: json.data.data})

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
            payload: json.data.data})
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
            var faenasPendientes=[]
            let faenasMap = json.data.data.map(e=>{
              if(e.saldo!==null && e.saldo>0)faenasPendientes.push(e)
              return [e.tropa,e]
          });
          var faenasMapArr = new Map(faenasMap); 
          let unicas = [...faenasMapArr.values()]; 
          const response = [unicas,faenasPendientes]
            return dispatch({
            type: "GET_ALL_FAENAS",
            payload: response},{
            } )
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
            type: "GET_ALL_VENTAS",
            payload: json.data.data})
        }
        catch (error) {
            console.log(error);
          }
        };
      }; 
      
//Ventas por cliente
export const getVentasByCliente = (name) => {
  return async (dispatch) => {
      try {
          const json = await axios.get(`${URL}/ventas/all`,{
            headers: {
              'auth-token': `${token}`
            }
          });
          const response = json.data.data.filter((a)=>a.cliente===name)
          return dispatch({
          type: "GET_ALL_VENTAS_BY_CLIENTE",
          payload: response})
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
            payload: json.data.data})
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
            type: "GET_ALL_STOCK",
            payload: json.data.data})
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
            type: "GET_ALL_CLIENTES",
            payload: json.data.data})
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
            const json = await axios.get(`${URL}/clientes/${id}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
            return dispatch({
            type: "GET_CLIENTE_BY_ID",
            payload: json.data.data})
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
            payload: json.data.data})
        }
        catch (error) {
            console.log(error);
          }
        };
      };

//Get todas las reses
export const getAllReses = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`${URL}/reses/all`,{
              headers: {
                'auth-token': `${token}`
              }
            });
            const ResStock = json.data.data.filter((a)=>a.stock===true)
            const response = [json.data.data,ResStock]
            return dispatch({
            type: "GET_RESES",
            payload: response
            })
        }
        catch (error) {
            console.log(error);
          }
        };
      }; 



//Get res por correlativo
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
            payload: json.data.data})
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
          const json = await axios.post(`${URL}/compras`, compra_json,{
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
          const json = await axios.post(`${URL}/ventacarne`, venta_json,{
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
          const json = await axios.post(`${URL}/ventaachuras`, venta_json,{
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
          const json = await axios.post(`${URL}/faenas`, faena_json,{
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



//Post res
export const postNewRes = (res_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`${URL}/res`, res_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_RES",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };


