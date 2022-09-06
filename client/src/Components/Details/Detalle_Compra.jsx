import React from "react";
import tableComprasStyle from "./tableCompraStyle.module.scss"
const data = require("./data.json")
//los datos se colocaron en un json independiente por una mejor practica de manejo de datos ya que estos
//pueden venir del back-end o de una base de datos 

export default function TableCompra(){
    const array=[]

    for(const [key,value] of Object.entries(data.compra[0])){ //a 0 cambiar por id de compra

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
                        <td>{e.value}</td>            
                    </tr>
        );
            })}
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