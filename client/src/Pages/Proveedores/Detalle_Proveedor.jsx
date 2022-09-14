import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import stylePr from "./Proveedores.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import Table_Proveedor from "../../Components/Details/Table_Proveedor";
const data = require("../../Components/Details/data.json")

export default function Detalle_Proveedor(){
    const {name}=useParams()
    const ComprasPendientes=data.compra.filter((a)=>a.Proveedor.toString("")===name.toString("") && a.Saldo>0)

    const navigate = useNavigate();

    return(
        <div className={stylePr.ConteinerCompras}>
            <NavBar
            title={name}
            />
            <Table_Proveedor
            name={name}
            />
            <div>
                <div className={stylePr.contTitle}><h1 className={stylePr.titleP}>Pendientes</h1></div>
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
                    {ComprasPendientes.map((a)=>{
                        return(
                            <CardLarge
                                id={a.ID_compra}
                                fecha={a.Fecha}
                                para={a.Proveedor}
                                cant={a.Cant}
                                kg={a.Kg_carne}
                                monto={a.Saldo}
                                tipo={"Compras"}
                                pago={true}
                                nav={`Form_Pago_Compra/${name}`}
                            />
                        )
                    })
                    }
                </div>
                <div className={stylePr.buttonLarge}>
                    <LargeButton
                        title={"Historial de Compras"}
                        onClick={()=>navigate(`/Historial_Compras_Proveedor/${name}`)}
                    ></LargeButton>
                </div>
            </div>
        </div>
    )
}