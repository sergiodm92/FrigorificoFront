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
                        <td>{e.value}</td>            
                    </tr>
                    )
            })
            }

            </tbody>
        </table>
        <table class="table">
            <thead>
                <tr>
                    <th>Hacienda</th>
                </tr>
            </thead>
            <tr>
                    <td>10/07/2022</td>
                    <td>11800</td>
            </tr>
            <tr>
                    <td>saldo</td>
                    <td>150000</td>
            </tr>
                <thead>
                <tr>
                    <th>Faena</th>

                </tr>
             
            </thead>
            <tr>
                    <td>10/07/2022</td>
                    <td>150000</td>
            </tr>
            <tr>
                    <td>saldo</td>
                    <td>150000</td>
            </tr>

        </table>

        </div>
    )
}
