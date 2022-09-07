import React from "react";

import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleSt from "./Stock.module.scss";

const data = require("../../Components/Details/data.json")

export default function Stock(){

    return(
        <div className={styleSt.ConteinerCompras}>
            <NavBar
            title={"Stock"}
            />
            <div>
                <div className={styleSt.contTitle}>
                    <h1 className={styleSt.titleP}>Resumen</h1>
                    <div>

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