import React from "react";

import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleSt from "./Stock.module.scss";

const data = require("../../Components/Details/data.json")

export default function Stock(){

    const total_kg=0
    for(let i=0; i<data.stock.Detalle.length; i++){
        total_kg = total_kg+data.stock.Detalle[i].kg
    }

    return(
        <div className={styleSt.ConteinerCompras}>
            <NavBar
            title={"Stock"}
            />
            <div>
                <div className={styleSt.contTitle}>

                    <div>
                        <div><b>Resumen</b></div>
                        <div><p>1/2Res</p></div>
                        <div><p>|</p></div>
                        <div><p>1/4D</p></div>
                        <div><p>|</p></div>
                        <div><p>1/4T</p></div>
                    </div>
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