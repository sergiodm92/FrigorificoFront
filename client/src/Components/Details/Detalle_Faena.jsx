import tableVentaStyle from "./tableVentaStyle.module.scss"
import {getFaenaById} from "../../Redux/Actions/Actions.js"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Table_Det_Faena({id}){

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFaenaById(id))
    }, [dispatch])
    const FaenaById = useSelector((state)=>state.FaenaById)

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

    const array=[];
    for(const [key,value] of Object.entries(FaenaById)){ 
        if(key!=="detalle" && key !=="estado_compra")array.push({key,value}) 
    }
    console.log(array)


    return(
        <div className={tableVentaStyle.conteiner}>

            <table class="table">

            <tbody>
            {array.map((e,i) => {
                    return(
                    <tr key={i} class={e.key.includes("Margen")?"table-secondary":"table-warning"}>
                        <td>{e.key.includes("_")?(e.key.replaceAll("_"," ")):(e.key)}</td>
                        <td className={tableVentaStyle.tdDF}>{e.key!=="costo_total" && e.key!=="saldo" && e.key!=="costo_faena_kg"? e.value :
                            currencyFormatter({
                                currency: "USD",
                                value : e.value
                            })}
                        </td>            
                    </tr>
                    )
            })
            }
            </tbody>
        </table>
       
        </div>
    )

}








