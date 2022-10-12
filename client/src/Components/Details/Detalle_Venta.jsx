import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"



export default function TableVenta({venta}){
    const array=[]
        console.log(venta)
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
                    
                    <tr>
                            <td>10/07/2022</td>
                            <td>$60000</td>
                    </tr>
                    <tr>
                            <td>20/07/2022</td>
                            <td>$80000</td>
                    </tr>
                    <tr>
                            <td>Saldo</td>
                            <td>{venta.saldo}</td>
                    </tr>

                    
            </tbody>
        </table>


        </div>
    )
}
