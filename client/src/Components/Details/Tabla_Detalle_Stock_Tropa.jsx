import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"


export default function Tabla_Detalle_Stock_Tropa({reses}){
    return(
        <div className={tableVentaStyle.conteiner}>

<table class="table">

<tbody>

<tr class="table-dark">

<td>Correlativo</td> 
<td>Categoria</td> 
<td>kg</td> 
<td>Costo/kg</td> 

</tr>

{reses.map((e,i) => {
return(
<tr key={i} class={"table-primary"}>


{e.stock==true?<td><b>{e.correlativo}</b></td>:<td>{e.correlativo}</td>} 
<td>{e.categoria}</td> 
<td>{e.kg}</td> 
<td align="center">{e.precio_kg}</td> 

</tr>
)
})
} 
        </tbody>
        </table>
        </div>
    )
}




