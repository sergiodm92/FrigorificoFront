import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComrpaByID, getPagosComprasByID } from "../../Redux/Actions/Actions";
import CardGruposDetalle from "../Cards/CardGruposDetalle/CardGruposDetalle.jsx";
import tableComprasStyle from "./tableCompraStyle.module.scss"


export default function TableCompra({id_c, comision_total}){

        const dispatch = useDispatch()

        useEffect(() => {
                dispatch(getComrpaByID(id_c))
                dispatch(getPagosComprasByID(id_c))
        }, [id_c])

        const CompraByID = useSelector((state)=>state.CompraByID)
        // useEffect(()=>{
        //         if(CompraByID.n_tropa)dispatch(getFaenasByTropa(CompraByID.n_tropa))
        // },[CompraByID])

        const AllPagosbyCompra= useSelector((state)=>state.AllPagosbyCompra)

        // const AllPagosbyFaena = useSelector((state)=>state.AllPagosbyFaena)
        // console.log(AllPagosbyFaena[0])
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
                let costovepstotalenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_veps_total
                        })
                // let pagofaenanpesos = currencyFormatter({
                //         currency: "USD",
                //         value : FaenaByTropa.saldo
                //         })
                let precioachuraspesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.precio_venta_achuras_unit
                                })
                let comision_total_pesos = currencyFormatter({
                        currency: "USD",
                        value : comision_total
                                })
                let pagos1
                // let pagos2


                const array=[]
        
        for(const [key,value] of Object.entries(CompraByID)){ //a 0 cambiar por id de compra
                if(key!=="saldo" && key!=="grupos")array.push({key,value})
        }
        if(comision_total) array.push({key: 'comision_total', value: comision_total_pesos })
     
        return(
                <div className={tableComprasStyle.conteiner}>
                        <table className="table">
                        <tbody>
                        {array.map((e,i) => {
                                return (
                                <tr key={i} className={"table-warning"}>
                                        <td>{e.key.includes("")?(e.key.replace(""," ").includes("")?e.key.replace(""," ").replace(""," "):e.key.replace(""," ")):e.key }</td>
                                        
                                        <td  className={tableComprasStyle.tdr}>{e.key=="fecha"?(new Date(e.value*1)).toLocaleDateString('es').replaceAll("/", "-"):e.key!=="costo_total_hac" && e.key!=="costo_flete"&& e.key!=="costo_veps_unit" && e.key!=="costo_veps_total"  && 
                                                e.key!=="id" && e.key!=="precio_venta_achuras_unit" && typeof(e.value)=="number"?e.value.toFixed(2):e.key=="costo_total_hac"?costohenpesos:e.key=="costo_flete"?
                                                costofleteenpesos:e.key=="costo_veps_unit"?costovepsenpesos:e.key=="costo_veps_total"?costovepstotalenpesos:e.key=="precio_venta_achuras_unit"?precioachuraspesos:e.value}</td>            
                                </tr>
                                );
                        })}
                                <tr>
                                        <td className="table-dark">Pagos Hacienda</td>
                                        <td className="table-dark"></td>
                                </tr>
                                
                                {AllPagosbyCompra.map((e,i)=>
                                        <tr key={i}>
                                                <td>{(new Date(e.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")}</td>
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

            </tbody>
        </table>

        <div>
        {CompraByID.grupos?CompraByID.grupos.map((a)=>{
                
                <CardGruposDetalle
                key={a.id}
                tropa={a.n_tropa}
                categoria={a.categoria}
                kgv_brutos={a.kgv_brutos}
                desbaste={a.desbaste}
                kgv_netos={a.kgv_netos}
                cant={a.cant}
                precio_kgv_netos={a.precio_kgv_netos}
                />

})
        :null}
        </div>
        </div>
    )
}

// ({ tropa, categoria, kgv_brutos, desbaste, kgv_netos, cant, precio_kgv_netos, onClick})