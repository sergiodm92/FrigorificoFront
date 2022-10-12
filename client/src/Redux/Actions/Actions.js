import axios from "axios";

// estado de login
export const login_state = () => {
    const e = localStorage.getItem("login")
    return ({ type: "LOGIN_STATE", payload: e  });
        };
export const setlogin_state = (value) => {
    
    return ({ type: "LOGIN_STATE", payload: value  });
        };
        
export const setAlertFaena = () => {
    
    return ({ type: "POST_NEW_FAENA", payload: ""  });
              };
export const setAlertCompra = () => {
    
    return ({ type: "POST_NEW_COMPRA", payload: ""  });
};
export const setAlertVentaCarne = () => {
    
  return ({ type: "POST_NEW_VENTA_CARNE", payload: ""  });
};
export const setAlertVentaAchuras = () => {
    
  return ({ type: "POST_NEW_VENTA_ACHURA", payload: ""  });
};
export const setAlertPagoCompra = () => {
    
  return ({ type: "POST_NEW_PAGO_COMPRA", payload: ""  });
};
export const setAlertPagoFaena = () => {
    
  return ({ type: "POST_NEW_PAGO_FAENA", payload: ""  });
};
export const setAlertPagoVenta = () => {
    
  return ({ type: "POST_NEW_PAGO_VENTA", payload: ""  });
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
          const json = await axios.post(`/user/login`, jsonUser);
          localStorage.setItem("AuthLogin",json.data.data)   
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
            const json = await axios.get(`/compras/all`,{
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
            const json = await axios.get(`/compras/all/${proveedor}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
            let ultimaCompra=""
            if(json.data.data.length>0){
            let arrayAños=[]
            let arrayMeses=[]
            let arrayDias=[]
            json.data.data.map((a)=>arrayAños.push(a.fecha.split("-")[2]))
            let añoMayor = Math.max(...arrayAños)
            json.data.data.map((a)=>{if(a.fecha.split("-")[2]==añoMayor)arrayMeses.push(a.fecha.split("-")[1])})
            let mesMayor = Math.max(...arrayMeses)
            json.data.data.map((a)=>{if(a.fecha.split("-")[1]==mesMayor && a.fecha.split("-")[2]==añoMayor)arrayDias.push(a.fecha.split("-")[0])})
            let diaMayor = Math.max(...arrayDias)
            ultimaCompra=diaMayor+"-"+mesMayor+"-"+añoMayor
            }
            return dispatch({
            type: "GET_COMPRAS_BY_PROVEEDOR",
            payload: [json.data.data,ultimaCompra]})

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
            const json = await axios.get(`/compras/${id}`,{
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
            const json = await axios.get(`/faenas/all`,{
              headers: {
                'auth-token': `${token}`
              }
            })
            var faenasPendientes=[]
            let faenasMap = json.data.data.map(e=>{
                return [e.tropa,e]
          });
          var faenasMapArr = new Map(faenasMap); 
          let unicas = [...faenasMapArr.values()]; 
          unicas.map(e=> {if(e.saldo!==null && e.saldo>0)faenasPendientes.push(e)})
          const response = [unicas,faenasPendientes]
          console.log(response)
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


//Traer todas las faenas
export const getFaenaById = (id) => {
  return async (dispatch) => {
      try {
          const json = await axios.get(`/faenas/all`,{
            headers: {
              'auth-token': `${token}`
            }
          })
          let response= json.data.data.find(a=>a.id==id)
          return dispatch({
          type: "GET_FAENA_BY_ID",
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
            const json = await axios.get(`/faenas/${tropa}`,{
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
            const json = await axios.get(`/ventas/all`,{
              headers: {
                'auth-token': `${token}`
              }
            });
            const venta = json.data.data;
            const fecha = new Date()
            let ventasUltimos30Dias = [];
            venta.map(e=>{
              e.cant=0
              e.kg_total=0
              e.total=0
              e.margen=0
              e.detalle.map(a=>{
                if(a.total_media=="total")e.cant++
                if(a.total_media!=="total")e.cant+=0.5
                e.kg_total+=a.kg
                e.total+=a.kg*a.precio_kg
                e.margen+=a.precio_kg*a.kg-a.costo_kg*a.kg
              })
              if(e.fecha.split("-")[2]==fecha.getFullYear() 
              && e.fecha.split("-")[1]>(fecha.getMonth()-1) 
              && e.fecha.split("-")[0]>=fecha.getDate()){
              ventasUltimos30Dias.push(e)
              }
              if(e.fecha.split("-")[2]==fecha.getFullYear() 
              && e.fecha.split("-")[1]==(fecha.getMonth()+1)){
              ventasUltimos30Dias.push(e)
              }
            
            })
            console.log(ventasUltimos30Dias)
            console.log(venta)

            return dispatch({
            type: "GET_ALL_VENTAS",
            payload: [venta,ventasUltimos30Dias]})
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
          const json = await axios.get(`/ventas/all`,{
            headers: {
              'auth-token': `${token}`
            }
          });
          const response = json.data.data.filter((a)=>a.cliente===name)
          let ultimaVenta=""
            if(response.length>0){
            let arrayAños=[]
            let arrayMeses=[]
            let arrayDias=[]
            response.map((a)=>arrayAños.push(a.fecha.split("-")[2]))
            let añoMayor = Math.max(...arrayAños)
            response.map((a)=>{if(a.fecha.split("-")[2]==añoMayor)arrayMeses.push(a.fecha.split("-")[1])})
            let mesMayor = Math.max(...arrayMeses)
            response.map((a)=>{if(a.fecha.split("-")[1]==mesMayor && a.fecha.split("-")[2]==añoMayor)arrayDias.push(a.fecha.split("-")[0])})
            let diaMayor = Math.max(...arrayDias)
            ultimaVenta=diaMayor+"-"+mesMayor+"-"+añoMayor
            }
            response.map(e=>{
              e.cant=0
              e.kg_total=0
              e.total=0
              e.margen=0
              e.detalle.map(a=>{
                if(a.total_media=="total")e.cant++
                if(a.total_media!=="total")e.cant+=0.5
                e.kg_total+=a.kg
                e.total+=a.kg*a.precio_kg
                e.margen+=a.precio_kg*a.kg-a.costo_kg*a.kg
              })})
          return dispatch({
          type: "GET_ALL_VENTAS_BY_CLIENTE",
          payload: [response, ultimaVenta]})
      }
      catch (error) {
          console.log(error);
        }
      };
    }; 

//Pagos por ID de cliente
// export const getPagosClienteByID = (id) => {
//   return async (dispatch) => {
//       try {
//           const json = await axios.get(`${URL}/ventas/all`,{
//             headers: {
//               'auth-token': `${token}`
//             }
//           });
//           const response = json.data.data.filter((a)=>a.cliente===name)
//           return dispatch({
//           type: "GET_ALL_VENTAS_BY_CLIENTE",
//           payload: response})
//       }
//       catch (error) {
//           console.log(error);
//         }
//       };
//     }; 


//Traer venta por ID
export const getVentaByID = (id) => {
    let pxk=0
    let cost=0
    return async (dispatch) => {
        try {
            
            const json = await axios.get(`/ventas/${id}`,{
              headers: {
                'auth-token': `${token}`
              }
            });
            const venta = json.data.data
            venta.kg_total=0
            venta.total=0
            venta.detalle.map(a=>{
              venta.kg_total+=a.kg*1
              pxk+=a.precio_kg
              venta.precio_kg_prom=pxk/venta.kg_total
              venta.total+=a.kg*a.precio_kg
              cost+=a.costo_kg*a.kg
            })
            venta.margen=venta.total-cost
            venta.margen_porc=(cost/venta.total)*100
            console.log(venta)
            return dispatch({
            type: "GET_VENTA_BY_ID",
            payload: venta})
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
            const json = await axios.get(`/stock`,{
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
            const json = await axios.get(`/clientes/all`,{
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
            const json = await axios.get(`/clientes/${id}`,{
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

      //Traer cliente por nombre
      export const getClienteByName = (nombre) => {
        return async (dispatch) => {
            try {
                const json = await axios.get(`/clientes/all`,{
                headers: {
                  'auth-token': `${token}`
                }
                })
                let response = json.data.data
                let clienteByNombre= response.find(a=>a.nombre==nombre)
                console.log(clienteByNombre)
                return dispatch({
                type: "GET_CLIENTE_BY_NAME",
                payload: clienteByNombre
              })
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
            const json = await axios.get(`/proveedores/all/`,{
            headers: {
              'auth-token': `${token}`
            }
            })
            return dispatch({
            type: "GET_PROVEEDORES",
            payload: json.data.data })
        }
        catch (error) {
            console.log(error);
          }
        };
      }; 

      export const getProveedorByName = (nombre) => {
        return async (dispatch) => {
            try {
                const json = await axios.get(`/proveedores/all`,{
                headers: {
                  'auth-token': `${token}`
                }
                })
                let response = json.data.data
                let provByNombre= response.find(a=>a.nombre==nombre)
                console.log(provByNombre)
                return dispatch({
                type: "GET_PROVEEDOR_BY_NAME",
                payload: provByNombre
              })
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
            const json = await axios.get(`/proveedores/${id}`,{
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
          
            const json = await axios.get(`/res/all`,{
              headers: {
                'auth-token': `${token}`
              }
            });
            const ResStock = json.data.data.filter((a)=>a.stock===true)
            ResStock.sort(function(a,b){
              if(a.tropa>b.tropa){return 1}
              if(a.tropa<b.tropa){return -1}
              return 0}) 
            let arrayAux = []
            let arrayResByTropa = []
            let pos=0
            let constTropa=ResStock.length?ResStock[0].tropa:0

            if(ResStock.length>1){
              for(let i=0;i<ResStock.length;i++){
                if(ResStock[i].tropa==constTropa){
                  arrayAux.push(ResStock[i])
                  arrayResByTropa[pos]=arrayAux
                }
                else{
                  arrayResByTropa.push(arrayAux)
                  pos++
                  arrayAux=[]
                  constTropa=ResStock[i].tropa
                  arrayAux.push(ResStock[i])
                }
              }
              }
              else if(ResStock.length===1){
                arrayResByTropa[0]=ResStock
              }
            const response = [json.data.data,ResStock,arrayResByTropa]
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
            const json = await axios.get(`/reses/${correlativo}`,{
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


//Traer pagos por clientes
export const getPagosVentasByCliente = (nombre) => {
  return async (dispatch) => {
      try {
          const json = await axios.get(`/pagoVentas/all/${nombre}`,{
            headers: {
              'auth-token': `${token}`
            }
          });
          return dispatch({
          type: "GET_PAGOS_VENTAS_BY_CLIENTE",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };

//Traer pagos por Proveedor
export const getPagosComprasByProveedor = (nombre) => {
  return async (dispatch) => {
      try {
          const json = await axios.get(`/pagoCompras/all/${nombre}`,{
            headers: {
              'auth-token': `${token}`
            }
          });
          return dispatch({
          type: "GET_PAGOS_COMPRAS_BY_PROVEEDOR",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };

//Traer pagos por ID de compra
export const getPagosComprasByID = (compraID) => {
  return async (dispatch) => {
      try {
          const json = await axios.get(`/pagoCompras/${compraID}`,{
            headers: {
              'auth-token': `${token}`
            }
          });
          return dispatch({
          type: "GET_PAGOS_COMPRAS_BY_ID",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };
  
  //Traer pagos por ID de faena
export const getPagosFaenaByID = (faenaID) => {
  return async (dispatch) => {
      try {
          const json = await axios.get(`/pagoFaenas/${faenaID}`,{
            headers: {
              'auth-token': `${token}`
            }
          });
          return dispatch({
          type: "GET_PAGOS_FAENAS_BY_ID",
          payload: json.data.data})     
      }
      catch (error) {
          console.log(error);
        }
      };
    };


 //Traer pagos por ID de faena
    export const getPagosVentaByID = (ventaID) => {
      return async (dispatch) => {
          try {
              const json = await axios.get(`/pagoVentas/${ventaID}`,{
                headers: {
                  'auth-token': `${token}`
                }
              });
              console.log(json.data.data)
              return dispatch({
              type: "GET_PAGOS_VENTAS_BY_ID",
              payload: json.data.data})     
          }
          catch (error) {
              console.log(error);
            }
          };
        };
    



//Traer pagos por Frigorifico
export const getPagosFaenasByFrigorifico = (nombre) => {
  return async (dispatch) => {
      try {
          const json = await axios.get(`/pagoFaenas/all/${nombre}`,{
            headers: {
              'auth-token': `${token}`
            }
          });
          return dispatch({
          type: "GET_PAGOS_FAENAS_BY_FRIGORIFICO",
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
          const json = await axios.post(`/proveedores`, proveedor_json,{
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
          const json = await axios.post(`/clientes`, cliente_json,{
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
          const json = await axios.post(`/compras`, compra_json,{
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
          const json = await axios.post(`/ventas`, venta_json,{
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
          const json = await axios.post(`/ventaachuras`, venta_json,{
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
          const json = await axios.post(`/faenas`, faena_json,{
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
          const json = await axios.post(`/res`, res_json,{
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

    //Post pagoCompras
export const postNewPagoCompra = (pago_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`/pagoCompras`, pago_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_PAGO_COMPRA",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };

     //Post pagoVenta
export const postNewPagoVenta = (pago_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`/pagoVentas`, pago_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_PAGO_VENTA",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };
    //Post pagoFaena
export const postNewPagoFaena = (pago_json) => {
  return async (dispatch) => {
      try {
          const json = await axios.post(`/pagoFaenas`, pago_json,{
          headers: {
            'auth-token': `${token}`
          }
          })
          return dispatch({
          type: "POST_NEW_PAGO_FAENA",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };

//eliminar faena

    export const deleteFaenaById = (id) => {
      return async (dispatch) => {
          try {
              const json = await axios.delete(`/faenas`,{
              headers: {
                'auth-token': `${token}`
              },
              data: {
                faena_id: id
              }
              })
              return dispatch({
              type: "DELETE_FAENA",
              payload: json.data.data})
          }
          catch (error) {
              console.log(error);
            }
          };
        };
// elimina las reses cuando se elimina una faena
export const deleteResById = (id) => {
  return async (dispatch) => {
      try {
          const json = await axios.delete(`/res`,{
          headers: {
            'auth-token': `${token}`
          },
          data: {
            res_id: id
          }
          })
          return dispatch({
          type: "DELETE_RES",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };
        //eliminar compra

    export const deleteCompraById = (id) => {
      return async (dispatch) => {
          try {
              const json = await axios.delete(`/compras`,{
              headers: {
                'auth-token': `${token}`
              },
              data: {
                compra_id: id
              }
              })
              return dispatch({
              type: "DELETE_COMPRA",
              payload: json.data.data})
          }
          catch (error) {
              console.log(error);
            }
          };
        };
        //eliminar cliente
        export const deleteClienteById = (id) => {
          return async (dispatch) => {
              try {
                  const json = await axios.delete(`/clientes`,{
                  headers: {
                    'auth-token': `${token}`
                  },
                  data: {
                    cliente_id: id
                  }
                  })
                  return dispatch({
                  type: "DELETE_CLIENTE",
                  payload: json.data.data})
              }
              catch (error) {
                  console.log(error);
                }
              };
            };
            //eliminar proveedor
export const deleteProveedorById = (id) => {
  return async (dispatch) => {
      try {
          const json = await axios.delete(`/proveedores`,{
          headers: {
            'auth-token': `${token}`
          },
          data: {
            proveedor_id: id
          }
          })
          return dispatch({
          type: "DELETE_PROVEEDOR",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };
//eliminar venta
export const deleteVentaById = (id) => {
  return async (dispatch) => {
      try {
          const json = await axios.delete(`/ventas`,{
          headers: {
            'auth-token': `${token}`
          },
          data: {
            venta_id: id
          }
          })
          return dispatch({
          type: "DELETE_VENTA",
          payload: json.data.data})
      }
      catch (error) {
          console.log(error);
        }
      };
    };

    //eliminar pago faena por id

    export const deletePagoFaenaById = (id) => {
      return async (dispatch) => {
          try {
              const json = await axios.delete(`/pagoFaenas`,{
              headers: {
                'auth-token': `${token}`
              },
              data: {
                pf_id: id
              }
              })
              return dispatch({
              type: "DELETE_PAGO_FAENA",
              payload: json.data.data})
          }
          catch (error) {
              console.log(error);
            }
          };
        };

    //eliminar pago venta por id

    export const deletePagoVentaById = (id) => {
      return async (dispatch) => {
          try {
              const json = await axios.delete(`/pagoVentas`,{
              headers: {
                'auth-token': `${token}`
              },
              data: {
                pv_id: id
              }
              })
              return dispatch({
              type: "DELETE_PAGO_VENTA",
              payload: json.data.data})
          }
          catch (error) {
              console.log(error);
            }
          };
        };
    
    //eliminar pago compra por id

    export const deletePagoCompraById = (id) => {
      return async (dispatch) => {
          try {
              const json = await axios.delete(`/pagoCompras`,{
              headers: {
                'auth-token': `${token}`
              },
              data: {
                pc_id: id
              }
              })
              return dispatch({
              type: "DELETE_PAGO_COMPRA",
              payload: json.data.data})
          }
          catch (error) {
              console.log(error);
            }
          };
        };

    //Se actualiza al cargar la compra
export const putReses = (precio_kg, tropa, categoria)=>{
  return async (dispatch)=>{
    let data_json= {
      precio_kg: precio_kg,
      tropa: tropa,
      categoria: categoria
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/res`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 
//pasa el estado de stock a false
export const putStockRes = (correlativo)=>{
  return async (dispatch)=>{
    let data_json= {
      correlativo: correlativo,
      stock: "false"
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/res/stock`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_STOCK_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 
//pasa el estado de stock a true
export const putStockResTrue = (correlativo)=>{
  return async (dispatch)=>{
    let data_json= {
      correlativo: correlativo,
      stock: "true"
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/res/stock`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_STOCK_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 

//resta cuarto de res vendida
export const putCuartoRes = (id, kg, correlativo)=>{
  return async (dispatch)=>{
    let data_json= {
      id: id,
      kg: kg,
      correlativo: correlativo
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/res/cuartoRes`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_CUARTO_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 


//actualiza saldo proveedor
export const putSaldoProveedor = (id, saldo)=>{
  return async (dispatch)=>{
    let data_json= {
      id: id,
      saldo: saldo,
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/proveedores/saldo`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_CUARTO_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 

//actualiza saldo Cliente
export const putSaldoCliente = (id, saldo)=>{
  return async (dispatch)=>{
    let data_json= {
      id: id,
      saldo: saldo,
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/clientes/saldo`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_CUARTO_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 

//actualiza saldo Compra
export const putSaldoCompra = (id, saldo)=>{
  return async (dispatch)=>{
    let data_json= {
      id: id,
      saldo: saldo,
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/compras/saldo`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_CUARTO_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 

//actualiza saldo Venta
export const putSaldoVenta = (id, saldo)=>{
  return async (dispatch)=>{
    let data_json= {
      id: id,
      saldo: saldo,
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/ventas/saldo`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_CUARTO_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 

//actualiza saldo Faenas
export const putSaldoFaena = (id, saldo)=>{
  return async (dispatch)=>{
    let data_json= {
      id: id,
      saldo: saldo,
    }
    console.log(data_json)
    try{
      const json = await axios.put(`/faenas/saldo`,data_json,{
        headers: {
          'auth-token': `${token}`
        }
        })
        return dispatch({
        type: "PUT_CUARTO_RESES",
        payload: json.data.data})
    }
    catch(err){
      console.log(err)
    }
  }
} 