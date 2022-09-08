import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss"
const data = require("./data.json")


export default function Table_Det_Faena({tropa}){
    
    var array1=[]
    const array2=[]
    const arrayDetFae=(data.faena.find(a=>a.Tropa==tropa)).Detalle
    arrayDetFae.map((a)=>{
        array1=[]
        // total$+=a.kg*a.$_kg
        // totalkg+=a.kg
        for(const [key,value] of Object.entries(a)){ 
        
            array1.push(value) 
            }
            array2.push(array1)
        })
    const array=[]
    for(const [key,value] of Object.entries(data.faena.find(a=>a.Tropa==tropa))){ 
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
        <table className="table">
            <thead>
                <tr>
                    <th>Correlativo</th>
                    <th>Categoria</th>
                        <th>kg</th>
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

        </div>
    )
}











   




