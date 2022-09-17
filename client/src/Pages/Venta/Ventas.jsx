import React from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import styleVen from "./Ventas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
const data = require("../../Components/Details/data.json")


export default function Ventas(){

    const navigate = useNavigate()

    const array=[];
    for(let i=0; i<8 && i<data.venta.length; i++){
        array.push(data.venta[i])
    }

    return(
        <div className={styleVen.ConteinerVentas}>
            <NavBar
            title={"Ventas"}
            />
            <div>
                <div className={styleVen.title}>
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
                <div className={styleVen.cardsCont}>
                    {array.map((a)=>{
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
                <div className={styleVen.buttonLarge}>
                    <LargeButton
                        title={"Mostrar todas"}
                        onClick={()=>navigate("/Historial_Ventas")}
                    />
                </div>
            </div>
        </div>
    )
}