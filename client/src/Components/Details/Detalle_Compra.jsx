import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComrpaByID, getFaenasByTropa } from "../../Redux/Actions/Actions";
import tableComprasStyle from "./tableCompraStyle.module.scss"




export default function TableCompra({id_c}){

        const dispatch = useDispatch()

        useEffect(() => {
                dispatch(getComrpaByID(id_c))
        }, [id_c])

        const CompraByID = useSelector((state)=>state.CompraByID)
        console.log(CompraByID.n_tropa)
        useEffect(()=>{
                dispatch(getFaenasByTropa(CompraByID.n_tropa))
        },[CompraByID])

        const FaenaByTropa = useSelector((state)=>state.FaenaByTropa)
        console.log(FaenaByTropa)

        const array=[]
        for(const [key,value] of Object.entries(CompraByID)){ //a 0 cambiar por id de compra
                array.push({key,value})
        }

        return(
                <div className={tableComprasStyle.conteiner}>
                        <table class="table">

                        <tbody>
                        {array.map((e,i) => {
                                return (
                                <tr key={i} class={e.key==="Comision"||e.key==="Costo_Hac($)"||e.key==="Costo_de_Flete"||e.key==="Costo_VEPS"||e.key==="Costo_Faena"||e.key==="Costo_Total"?"table-danger":e.key==="Kg_achuras"||e.key==="$_Venta"||e.key==="Recupero_$/kg"||e.key==="Cant"||e.key==="Categoria"?"table-secondary":"table-primary"}>
                                        <td>{e.key.includes("_")?(e.key.replace("_"," ").includes("_")?e.key.replace("_"," ").replace("_"," "):e.key.replace("_"," ")):e.key }</td>
                                        <td  className={tableComprasStyle.tdr} >{e.key!=="id" && typeof(e.value)=="number"?e.value.toFixed(2):e.value}</td>            
                                </tr>
                                );
                        })}
                                <tr>
                                        <td class="table-dark">Pagos Hacienda</td>
                                        <td class="table-dark"></td>
                                </tr>
                    <tr>
                            <td>10/07/2022</td>
                            <td>$150000</td>
                    </tr>
                    <tr>
                            <td>Saldo</td>
                            <td>{CompraByID.saldo}</td>
                    </tr>

                    <tr>
                            <td class="table-dark">Pagos Faena</td>
                            <td class="table-dark"></td>

                    </tr>
                    <tr>
                            <td>10/07/2022</td>
                            <td>$110000</td>
                    </tr>
                    <tr>
                            <td>Saldo</td>
                            <td>{FaenaByTropa.saldo}</td>
                    </tr>
                    
            </tbody>
        </table>

        </div>
    )
}