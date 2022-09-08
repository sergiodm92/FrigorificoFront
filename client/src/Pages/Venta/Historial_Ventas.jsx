import React from "react"
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import styleVen from "./Ventas.module.scss";
const data = require("../../Components/Details/data.json")


export default function Historial_Ventas(){

    return(
        <div className={styleVen.ConteinerCompras}>
            <NavBar
            title={"Hist. Ventas"}
            />
            <div>
                <div className={styleVen.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Proveedor</b></div>
                    <div><b>|</b></div>
                    <div><b>Cant</b></div>
                    <div><b>|</b></div>
                    <div><b>kg</b></div>
                    <div><b>|</b></div>
                    <div><b>Monto($)</b></div>
                </div>
                <div className={styleVen.cardsCont}>
                    {data.venta.map((a)=>{
                        return(
                            <CardLarge
                                id={a.ID_Venta}
                                fecha={a.Fecha}
                                para={a.Cliente}
                                cant={a.Cant}
                                kg={a.kg_Total}
                                monto={a.Total}
                                tipo={"Ventas"}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}