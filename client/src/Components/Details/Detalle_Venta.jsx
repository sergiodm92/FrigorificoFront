import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"
const data = require("./data.json")


export default function TableVenta({id_v}){
    const array=[]

    for(const [key,value] of Object.entries(data.venta.find(a=>a.ID_Venta==id_v))){ 
    if(key!=="Detalle")array.push({key,value})   
    }

    return(
        <div className={tableVentaStyle.conteiner}>

            <table class="table">

            <tbody>
            {array.map((e,i) => {
                    return(

                    <tr key={i} class={e.key.includes("Margen")?"table-secondary":"table-primary"}>

                        <td>{e.key.includes("_")?(e.key.replace("_"," ").includes("_")?e.key.replace("_"," ").replace("_"," "):e.key.replace("_"," ")):e.key }</td>
                        <td className={tableVentaStyle.columnRight}>{e.value}</td>            
                    </tr>
                    )
            })
            }
                    <tr>
                            <td class="table-dark">Hacienda</td>
                            <td class="table-dark"></td>
                    </tr>
                    
                    <tr>
                            <td>Fecha</td>
                            <td>10/07/2022</td>
                    </tr>
                    <tr>
                            <td>saldo</td>
                            <td>$150000</td>
                    </tr>

                    <tr>
                            <td class="table-dark">Faena</td>
                            <td class="table-dark"></td>

                    </tr>
                    <tr>
                            <td>Fecha</td>
                            <td>10/07/2022</td>
                    </tr>
                    <tr>
                            <td>saldo</td>
                            <td>150000</td>
                    </tr>
            </tbody>
        </table>


        </div>
    )
}
