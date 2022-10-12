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
                        value : CompraByID.costo_hac
                        })
                let comisionenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.comision
                        })
                let costofleteenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_flete
                        })
                let costovepsenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_veps
                        })
                let costofaenaenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_faena
                        })
                let costototalenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_total
                        })
                let costokgenpesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.costo_kg
                        })
                let pagofaenanpesos = currencyFormatter({
                        currency: "USD",
                        value : FaenaByTropa.saldo
                        })
                let precioachuraspesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.precio_venta_achuras
                                })
                let preciokgnetospesos = currencyFormatter({
                        currency: "USD",
                        value : CompraByID.precio_kgv_netos
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
                                <tr key={i} class={e.key==="Comision"||e.key==="Costo_Hac($)"||e.key==="Costo_de_Flete"||e.key==="Costo_VEPS"||e.key==="Costo_Faena"||e.key==="Costo_Total"?"table-danger":e.key==="Kg_achuras"||
                                                        e.key==="$_Venta"||e.key==="Recupero_$/kg"||e.key==="Cant"||e.key==="Categoria"?"table-secondary":"table-primary"}>
                                        <td>{e.key.includes("_")?(e.key.replace("_"," ").includes("_")?e.key.replace("_"," ").replace("_"," "):e.key.replace("_"," ")):e.key }</td>
                                        
                                        <td  className={tableComprasStyle.tdr}>{e.key!=="costo_hac" && e.key!=="costo_flete"&& e.key!=="costo_veps" && e.key!=="costo_faena" && e.key!=="costo_total" && e.key!=="costo_kg" && 
                                                e.key!=="comision" && e.key!=="precio_kgv_netos" && e.key!=="id" && e.key!=="precio_venta_achuras" && typeof(e.value)=="number"?e.value.toFixed(2):e.key=="costo_hac"?costohenpesos:e.key=="comision"?comisionenpesos:e.key=="costo_flete"?
                                                costofleteenpesos:e.key=="costo_veps"?costovepsenpesos:e.key=="costo_faena"?costofaenaenpesos:e.key=="costo_total"?costototalenpesos:e.key=="costo_kg"?costokgenpesos:e.key=="precio_venta_achuras"?precioachuraspesos:e.key=="precio_kgv_netos"?preciokgnetospesos:e.value}</td>            
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