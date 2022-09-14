import React from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import stylePr from "./Proveedores.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";

const data = require("../../Components/Details/data.json")

export default function Proveedores(){

    const navigate = useNavigate();

    return(
        <div className={stylePr.ConteinerCompras}>
            <NavBar
            title={"Proveedores"}
            />
            <div>
                <div className={stylePr.title}>
                    <div><b>Nombre</b></div>
                    <div><b>|</b></div>
                    <div><b>Ultima Compra</b></div>
                    <div><b>|</b></div>
                    <div><b>Saldo($)</b></div>
                </div>
                <div className={stylePr.cardsCont}>
                    {data.Proveedor.map((a)=>{
                        return(
                            <CardSmall
                                id={a.Nombre}
                                fecha={a.Nombre}
                                otro={a.Ultima_Compra}
                                monto={a.Saldo}
                                tipo={"Detalle_Proveedor"}
                                pago={false}
                            />
                        )
                    })
                    }
                </div>
                <div className={stylePr.buttonLarge}>
                    <LargeButton
                        title={"Agregar Proveedor"}
                        onClick={()=>navigate("/Form_Proveedor")}
                    ></LargeButton>
                </div>
            </div>
        </div>
    )
}