import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"
const data = require("./data.json")


export default function TableDetRes({id_v}){
    var totalkg=0
    var total$=0
    var array=[]
    const array2=[]
    const arrayDetRes=(data.venta.find(a=>a.ID_Venta==id_v)).Detalle
    // console.log(arrayDetRes)
    arrayDetRes.map((a)=>{
    array=[]
    total$+=a.kg*a.$_kg
    totalkg+=a.kg
    if(a.Total_Media=="1/4D")a.Correlativo.concat(" D")
    if(a.Total_Media=="1/4T")a.Correlativo.concat(" T")
    for(const [key,value] of Object.entries(a)){ 
    
        array.push(value) 
        }
        array2.push(array)
    })
    return(
        <div className={tableVentaStyle.conteiner}>

            <table className="table">
            <thead>
                <tr>
                    <th>Correlativo</th>
                    <th>Categoria</th>
                    <th>1/2 Res</th>
                    <th>kg</th>
                    <th>$/kg</th>
                    
                </tr>
            </thead>
            <tbody>
            {array2.map((e,j) => {

                    return(

                    <tr key={j}  class={"table-primary"}>
                    {e.map((a,i) => {
                        return(
                        <td key={i}>{a}</td>    
                        )
                    })}    
                    </tr>
                    )
            })
            }
            </tbody>
        </table>
        <table class="table">
            <thead>
                <tr>
                    <th>Total KG</th>
                    <th>{totalkg}kg</th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>Total $</th>
                    <th>${total$}</th>
                </tr>
            </thead>
        </table>
        </div>
    )
}




