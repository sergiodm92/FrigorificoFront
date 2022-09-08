import React from "react"
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import styleCom from "./Compras.module.scss"
const data = require("../../Components/Details/data.json")


export default function Historial_Compras(){

    return(
        <div className={styleCom.ConteinerCompras}>
            <NavBar
            title={"Hist. Compras"}
            />
            <div>
                <div className={styleCom.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Proveedor</b></div>
                    <div><b>|</b></div>
                    <div><b>Cant</b></div>
                    <div><b>|</b></div>
                    <div><b>kg carne</b></div>
                    <div><b>|</b></div>
                    <div><b>Monto($)</b></div>
                </div>
                <div className={styleCom.cardsCont}>
                    {data.compra.map((a)=>{
                        return(
                            <CardLarge
                                id={a.ID_compra}
                                fecha={a.Fecha}
                                para={a.Proveedor}
                                cant={a.Cant}
                                kg={a.Kg_carne}
                                monto={a.Costo_Total}
                                tipo={"Compras"}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}