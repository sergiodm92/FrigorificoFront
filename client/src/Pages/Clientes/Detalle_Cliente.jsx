import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import styleCl from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import Table_Cliente from "../../Components/Details/Table_Cliente";
const data = require("../../Components/Details/data.json")

export default function Detalle_Cliente(){
    const {name}=useParams()
    const VentasPendientes=data.venta.filter((a)=>a.Cliente.toString("")===name.toString("") && a.Saldo>0)

    const navigate = useNavigate();

    return(
        <div className={styleCl.Conteiner}>
            <NavBar
                title={name}
            />
            <div className={styleCl.buttonEdith}>
                <ButtonNew
                    style={"edith"}
                    icon={"edith"}
                    onClick={()=>navigate(`/Faenas`)}
                />
            </div>
            <div className={styleCl.tablecliente}>
            <Table_Cliente
            name={name}
            />
            </div>
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
                                bstyle={"new"}
                                bicon={"new"}
                                bonClick={()=>navigate(`/Form_Pago_Venta/${name}`)}
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