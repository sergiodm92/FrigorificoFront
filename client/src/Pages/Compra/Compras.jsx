import React from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import styleCom from "./Compras.module.scss"
const data = require("../../Components/Details/data.json")


export default function Compras(){

    const navigate = useNavigate()

    const array=[];
    for(let i=0; i<8 && i<data.compra.length; i++){
        array.push(data.compra[i])
    }
    return(
        <div className={styleCom.ConteinerCompras}>
            <NavBar
            title={"Compras"}
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
                    {array.map((a)=>{
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
                <div className={styleCom.buttonLarge}>
                    <LargeButton
                        title={"Mostrar todas"}
                        onClick={()=>navigate("/Historial_Compras")}
                    />
                </div>
            </div>
        </div>
    )
}