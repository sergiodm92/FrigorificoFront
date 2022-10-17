import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import styleCl from "./Clientes.module.scss";
import { getClienteByID, getVentasByCliente } from "../../Redux/Actions/Actions";


export default function Historial_Ventas_Cliente(){
    const {id}=useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClienteByID(id))
    }, [])
    const ClienteById = useSelector((state)=>(state.ClienteById))
    useEffect(() => {
        dispatch(getVentasByCliente(ClienteById.nombre))
    }, [])
    const AllVentasByCliente = useSelector((state)=>state.AllVentasByCliente)



    return(
        <div className={styleCl.ConteinerClientes}>
            <NavBar
            title={ClienteById.nombre}
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
                    {AllVentasByCliente.map((a)=>{
                        return(
                            <CardLarge
                                id={a.ID_Venta}
                                fecha={a.fecha}
                                para={a.cliente}
                                cant={a.cant}
                                kg={a.kg_total}
                                monto={a.total}
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