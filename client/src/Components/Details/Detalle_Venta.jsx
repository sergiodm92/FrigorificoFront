import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPagosVentaByID } from "../../Redux/Actions/Actions"
import tableVentaStyle from "./tableVentaStyle.module.scss"



export default function TableVenta({venta, pagos}){
        const dispatch = useDispatch()
        const array=[]
        // useEffect(() => {
        //         if(venta)getPagosVentaByID(venta.id)
        // }, [dispatch])
        
        // let pagosByVentaID = useSelector((state)=>state.pagosByVentaID)
        
        

    for(const [key,value] of Object.entries(venta)){ 
    if(key!=="detalle")array.push({key,value})   
    }

    return(
        <div className={tableVentaStyle.conteiner}>

            <table class="table">

            <tbody>
            {array.map((e,i) => {
                    return(

                    <tr key={i} class={e.key.includes("Margen")?"table-secondary":"table-primary"}>

                        <td>{e.key.includes("_")?(e.key.replace("_"," ").includes("_")?e.key.replace("_"," ").replace("_"," "):e.key.replace("_"," ")):e.key }</td>
                        <td className={tableVentaStyle.columnRight}>{e.key!=="id" && typeof(e.value)=="number"?e.value.toFixed(2):e.value}</td>            
                    </tr>
                    )
            })
            }
                    <tr>
                            <td class="table-dark" colspan="2">Pagos</td>
                       
                    </tr>
                    {pagos?.map((a)=>
                    <tr>
                    
                            <td>{a.fecha}</td>
                            <td>{a.monto}</td>
                            
                    </tr>
                    )}
                    <tr>
                            <td>Saldo</td>
                            <td>{venta.saldo}</td>
                    </tr>

                    
            </tbody>
        </table>


        </div>
    )
}
