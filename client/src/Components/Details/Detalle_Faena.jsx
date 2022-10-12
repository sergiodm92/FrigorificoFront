import tableVentaStyle from "./tableVentaStyle.module.scss"
import {getFaenasByTropa} from "../../Redux/Actions/Actions.js"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Table_Det_Faena({tropa}){

    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(getFaenasByTropa(tropa))
    }, [dispatch])
    const FaenaByTropa = useSelector((state)=>state.FaenaByTropa)
    console.log(FaenaByTropa)


    const array=[];
    for(const [key,value] of Object.entries(FaenaByTropa)){ 
        if(key!=="detalle" && key !=="updatedAt" && key !=="createdAt")array.push({key,value}) 
    }



    return(
        <div className={tableVentaStyle.conteiner}>

            <table class="table">

            <tbody>
            {array.map((e,i) => {
                    return(

                    <tr key={i} class={e.key.includes("Margen")?"table-secondary":"table-primary"}>

                        <td>{e.key.includes("_")?(e.key.replaceAll("_"," ")):(e.key)}</td>
                        <td className={tableVentaStyle.tdDF}>{e.key!=="id" && typeof(e.value)=="number"?e.value.toFixed(2):e.value}</td>            
                    </tr>
                    )
            })
            }
                    {/* <tr>
                        <td>categoria</td>
                        <td>correlativo</td>
                        <td>kg</td>
                        
                    </tr>
                    {FaenaByTropa.detalle.map((e,i) => {
                    return(

                    <tr key={i}>
                        <td>{e.categoria}</td>
                        <td>{e.correlativo}</td>
                        <td>{e.kg}</td>

                    </tr>
                    )
            })
            } */}
            </tbody>
        </table>
       
        </div>
    )

}








