import React from "react";
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleF from "./Faenas.module.scss";
const data = require("../../Components/Details/data.json")

export default function Historial_Faena(){

    return(
        <div className={styleF.ConteinerCompras}>
            <NavBar
            title={"Hist. Faenas"}
            />
            <div>
                <div className={styleF.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Frigorífico</b></div>
                    <div><b>|</b></div>
                    <div><b>Monto($)</b></div>
                </div>
                <div className={styleF.cardsCont}>
                    {data.faena.map((a)=>{
                        return(
                            <CardSmall
                                id={a.Tropa}
                                fecha={a.Fecha}
                                otro={a.Frigorifico}
                                monto={a.Saldo}
                                tipo={"Faenas"}
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