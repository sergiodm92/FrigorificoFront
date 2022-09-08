import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import styleCl from "./Clientes.module.scss";
const data = require("../../Components/Details/data.json")

export default function Historial_Ventas_Cliente(){
    const {name}=useParams()
    const VentasPendientes=data.venta.filter((a)=>a.Cliente.toString("")===name.toString(""))

    return(
        <div className={styleCl.ConteinerCompras}>
            <NavBar
            title={name}
            />
            <div>
                <div className={styleCl.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Cliente</b></div>
                    <div><b>|</b></div>
                    <div><b>Cant</b></div>
                    <div><b>|</b></div>
                    <div><b>kg</b></div>
                    <div><b>|</b></div>
                    <div><b>Monto($)</b></div>
                </div>
                <div className={styleCl.cardsCont}>
                    {VentasPendientes.map((a)=>{
                        return(
                            <CardLarge
                                id={a.ID_Venta}
                                fecha={a.Fecha}
                                para={a.Cliente}
                                cant={a.Cant}
                                kg={a.kg_Total}
                                monto={a.Total}
                                tipo={"Ventas"}
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