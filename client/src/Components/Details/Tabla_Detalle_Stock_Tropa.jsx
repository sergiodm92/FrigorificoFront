import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"
const data = require("./data.json")


export default function Tabla_Detalle_Stock_Tropa({tropa}){
var array=[]
var arraydet=[]
    for(const [key,value] of Object.entries(data.stock.find(a=>a.Tropa==tropa))){ 
        if(key!=="Detalle")array.push({key,value}) 
        else arraydet=value 
        }

    return(
        <div className={tableVentaStyle.conteiner}>

<table class="table">

<tbody>
{array.map((e,i) => {
        return(

        <tr key={i} class={"table-primary"}>

            <td>{e.key.includes("_")?(e.key.replace("_"," ").includes("_")?e.key.replace("_"," ").replace("_"," "):e.key.replace("_"," ")):e.key }</td>
            <td>{e.value}</td>            
        </tr>
        )
})
}

        </tbody>
        </table>
        <table className="table">

        <tbody>
        <tr class={"table-primary"}>

            <td>Correlativo</td> 
            <td>Categoria</td> 
            <td>kg</td> 
            <td>Costo/kg</td> 

        </tr>

        {arraydet.map((e,i) => {
            return(
        <tr key={i} class={"table-primary"}>

        
            <td>{e.Correlativo}</td> 
            <td>{e.Categoria}</td> 
            <td>{e.kg}</td> 
            <td align="center">{e.Costo}</td> 

        </tr>
        )
            })
            } 

        </tbody>









        </table>
        </div>
    )
}




