import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleCl from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
const data = require("../../Components/Details/data.json")

export default function Clientes(){

    const navigate = useNavigate();

    return(
        <div className={styleCl.ConteinerCompras}>
            <NavBar
            title={"Clientes"}
            />
            <div>
                <div className={styleCl.title}>
                    <div><b>Nombre</b></div>
                    <div><b>|</b></div>
                    <div><b>Ultima Venta</b></div>
                    <div><b>|</b></div>
                    <div><b>Saldo($)</b></div>
                </div>
                <div className={styleCl.cardsCont}>
                    {data.Cliente.map((a)=>{
                        return(
                            <CardSmall
                                id={a.Nombre}
                                fecha={a.Nombre}
                                otro={a.Ultima_Venta}
                                monto={a.Saldo}
                                tipo={"Detalle_Cliente"}
                                pago={false}
                            />
                        )
                    })
                    }
                </div>
                <div className={styleCl.buttonLarge}>
                    <LargeButton
                        title={"Agregar Cliente"}
                        onClick={()=>navigate("/Form_Cliente")}
                    ></LargeButton>
                </div>
            </div>
        </div>
    )
}