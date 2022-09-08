import React from "react";

import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleSt from "./Stock.module.scss";

const data = require("../../Components/Details/data.json")

export default function Stock(){

    let total_kg=["Total kg","","",0]
    let vaq=["Vaquillon",0,0,0]
    let vaca=["Vaca",0,0,0]
    let nov=["Novillo",0,0,0]
    let toro=["Toro",0,0,0]
    
    data.stock.map((a)=>{
        a.Detalle.map((a)=>{
            total_kg[3]+=a.kg;
            if(a.Categoria==="Vaquillon"){
                if(a.Correlativo.includes("D")) vaq[2]++
                if(a.Correlativo.includes("T")) vaq[3]++
                else vaq[1]++
            }
            if(a.Categoria==="Vaca"){
                if(a.Correlativo.includes("D")) vaca[2]++
                if(a.Correlativo.includes("T")) vaca[3]++
                else vaca[1]++
            }
            if(a.Categoria==="Novillo"){
                if(a.Correlativo.includes("D")) nov[2]++
                if(a.Correlativo.includes("T")) nov[3]++
                else nov[1]++
            }
            if(a.Categoria==="Toro"){
                if(a.Correlativo.includes("D")) toro[2]++
                if(a.Correlativo.includes("T")) toro[3]++
                else toro[1]++
            }
        })
    })

    return(
        <div className={styleSt.ConteinerCompras}>
            <NavBar
            title={"Stock"}
            />
            <div>
                <div className={styleSt.contTable}>
                    //inserte aqui su código
                </div>
                <div className={styleSt.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Frigorífico</b></div>
                    <div><b>|</b></div>
                    <div><b>Tropa</b></div>
                </div>
                <div className={styleSt.cardsCont}>
                    {data.stock.map((a)=>{
                        
                        return(
                            <CardSmall
                                id={a.Tropa}
                                fecha={a.Fecha}
                                otro={a.Frigorifico}
                                monto={a.Tropa}
                                tipo={"Detalle_Stock_Tropa"}
                                pago={false}
                            />
                        )
                        
                    })
                    }
                </div>
            </div>
        </div>
    )
}