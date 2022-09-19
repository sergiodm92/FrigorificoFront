import React from "react";
import tableComprasStyle from "./tableCompraStyle.module.scss"
const data = require("./data.json")



export default function TableCompra({id_c}){
    const array=[]

    for(const [key,value] of Object.entries(data.compra.find(a=>a.ID_compra==id_c))){ //a 0 cambiar por id de compra

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
                        <td  className={tableComprasStyle.tdr} >{e.value}</td>            
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
                            <td>$150000</td>
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
                            <td>150000</td>
                    </tr>
                    
            </tbody>
        </table>

        </div>
    )
}