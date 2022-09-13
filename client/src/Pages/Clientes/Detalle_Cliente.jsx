import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import styleCl from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
const data = require("../../Components/Details/data.json")

export default function Detalle_Cliente(){
    const {name}=useParams()
    const VentasPendientes=data.venta.filter((a)=>a.Cliente.toString("")===name.toString("") && a.Saldo>0)

    const navigate = useNavigate();

    return(
        <div className={styleCl.ConteinerCompras}>
            <NavBar
            title={name}
            />
            <div>
                <div className={styleCl.contTitle}><h1 className={styleCl.titleP}>Pendientes</h1></div>
                <div className={styleCl.title}>
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
                <div className={styleCl.cardsCont}>
                    {VentasPendientes.map((a)=>{
                        return(
                            <CardLarge
                                id={a.ID_Venta}
                                fecha={a.Fecha}
                                para={a.Cliente}
                                cant={a.Cant}
                                kg={a.kg_Total}
                                monto={a.Saldo}
                                tipo={"Ventas"}
                                pago={true}
                                nav={"Form_Pago_Venta"}
                            />
                        )
                    })
                    }
                </div>
                <div className={styleCl.buttonLarge}>
                    <LargeButton
                        title={"Historial de Ventas"}
                        onClick={()=>navigate(`/Historial_Ventas_Cliente/${name}`)}
                    ></LargeButton>
                </div>
            </div>
        </div>
    )
}