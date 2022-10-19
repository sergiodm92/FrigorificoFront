import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComrpaByID, getFaenasByTropa, getPagosComprasByID, getPagosFaenaByID } from "../../Redux/Actions/Actions";
import tableComprasStyle from "./tableCompraStyle.module.scss"




export default function TableCompra({id_c}){

        const dispatch = useDispatch()

        useEffect(() => {
                dispatch(getComrpaByID(id_c))
        }, [id_c])

        const CompraByID = useSelector((state)=>state.CompraByID)
        console.log(CompraByID.n_tropa)
        useEffect(()=>{
                if(CompraByID.n_tropa)dispatch(getFaenasByTropa(CompraByID.n_tropa))
        },[CompraByID])
        console.log(CompraByID)

        const FaenaByTropa = useSelector((state)=>state.FaenaByTropa)

        useEffect(() => {
                if(id_c)dispatch(getPagosComprasByID(id_c))
                if(FaenaByTropa.id)dispatch(getPagosFaenaByID(FaenaByTropa.id))
        }, [FaenaByTropa])
        const AllPagosbyCompra= useSelector((state)=>state.AllPagosbyCompra)

        // useEffect(() => {
        //  dispatch(getPagosFaenaByID(FaenaByTropa.id))
        // }, [])
        const AllPagosbyFaena = useSelector((state)=>state.AllPagosbyFaena)
        console.log(AllPagosbyFaena[0])
        function currencyFormatter({ currency, value}) {
                const formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        minimumFractionDigits: 2,
                        currency
                }) 
                return formatter.format(value)
                }
        
                let saldoEnPesos = currencyFormatter({
                currency: "USD",
                value : CompraByID.saldo
                })

                let costohenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_total_hac
                        })
                let costofleteenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_flete
                        })
                let costovepsenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_veps_unit
                        })
                let pagofaenanpesos = currencyFormatter({
                        currency: "USD",
                        value : FaenaByTropa.saldo
                        })
                let precioachuraspesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.precio_venta_achuras_unit
                                })
                let pagos1
                let pagos2


                





        const array=[]
        for(const [key,value] of Object.entries(CompraByID)){ //a 0 cambiar por id de compra
               if(key!=="saldo")array.push({key,value})

        }

        return(
                <div className={tableComprasStyle.conteiner}>
                        <table class="table">

                        <tbody>
                        {array.map((e,i) => {
                                return (
                                <tr key={i} class={e.key==="costo_total_hac"||e.key==="costo_flete"||e.key==="costo_veps_unit"?"table-danger":e.key==="Kg_achuras"||
                                                        e.key==="Cant"||e.key==="Categoria"?"table-secondary":"table-warning"}>
                                        <td>{e.key.includes("_")?(e.key.replace("_"," ").includes("_")?e.key.replace("_"," ").replace("_"," "):e.key.replace("_"," ")):e.key }</td>
                                        
                                        <td  className={tableComprasStyle.tdr}>{e.key!=="costo_total_hac" && e.key!=="costo_flete"&& e.key!=="costo_veps_unit"  && 
                                                e.key!=="id" && e.key!=="precio_venta_achuras_unit" && typeof(e.value)=="number"?e.value.toFixed(2):e.key=="costo_total_hac"?costohenpesos:e.key=="costo_flete"?
                                                costofleteenpesos:e.key=="costo_veps_unit"?costovepsenpesos:e.key=="precio_venta_achuras_unit"?precioachuraspesos:e.value}</td>            
                                </tr>
                                );
                        })}
                                <tr>
                                        <td class="table-dark">Pagos Hacienda</td>
                                        <td class="table-dark"></td>
                                </tr>
                                
                                {AllPagosbyCompra.map((e)=>
                                        <tr>
                                                <td>{e.fecha}</td>
                                                <td>{pagos1 = currencyFormatter({
                        currency: "USD",
                        value : e.monto
                                })}</td>
                                        </tr>
                                 )}
                    <tr>
                            <td>Saldo</td>
                            <td>{saldoEnPesos}</td>
                    </tr>

                    <tr>
                            <td class="table-dark">Pagos Faena</td>
                            <td class="table-dark"></td>

                    </tr>
                    {AllPagosbyFaena.length>0?AllPagosbyFaena.map((e)=>
                    <tr>
                            <td>{e.fecha}</td>
                            <td>{pagos2 = currencyFormatter({
                        currency: "USD",
                        value : e.monto
                                })}</td>
                    </tr>
                    ):<td></td>}
                    <tr>
                            <td>Saldo</td>
                            <td>{pagofaenanpesos}</td>
                    </tr>
                    
            </tbody>
        </table>

        </div>
    )
}

// proveedor: '',//
//     fecha: '',//
//     lugar: '',//
//     n_dte: '',//
//     kgv_brutos_totales:0,//
//     kgv_netos_totales:0,//
//     kg_carne_totales:0,//
//     costo_flete: null,//
//     cant_achuras: 0,//
//     precio_venta_achuras_unit: null,//
//     recupero_precio_kg: null, //precio_venta_achuras/kg_carne//
//     costo_total_hac:null,//kgv_netos * precio_kgv_netos//
//     costo_flete: null,//
//     costo_veps_unit: null,//
//     cant_total:1,//
//     grupos:[],//
//     saldo:null //saldo