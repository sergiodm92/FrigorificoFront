import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import stylePr from "./Proveedores.module.scss";
const data = require("../../Components/Details/data.json")

export default function Historial_Compras_Proveedor(){

    const {name}=useParams()
    const allCompras=data.compra.filter((a)=>a.Proveedor.toString("")===name.toString(""))

    return(
        <div className={stylePr.ConteinerCompras}>
            <NavBar
            title={name}
            />
            <div>
                <div className={stylePr.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Cliente</b></div>
                    <div><b>|</b></div>
                    <div><b>Cant</b></div>
                    <div><b>|</b></div>
                    <div><b>kg</b></div>
                    <div><b>|</b></div>
                    <div><b>Saldo($)</b></div>
                </div>
                <div className={stylePr.cardsCont}>
                    {allCompras.map((a)=>{
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