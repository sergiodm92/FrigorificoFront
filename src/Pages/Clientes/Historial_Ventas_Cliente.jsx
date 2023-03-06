import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import { getClienteByID, getVentasAchurasByCliente, getVentasByCliente } from "../../Redux/Actions/Actions";
import style from "./Clientes.module.scss";

export default function Historial_Ventas_Cliente(){

    const {id}=useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClienteByID(id))
    }, [dispatch])

    const ClienteById = useSelector((state)=>(state.ClienteById))

    useEffect(() => {
        dispatch(getVentasByCliente(ClienteById.nombre))
        dispatch(getVentasAchurasByCliente(ClienteById.nombre))
    }, [ClienteById])

    const AllVentasByCliente = useSelector((state)=>state.AllVentasByCliente)
    const AllVentasAchurasByCliente = useSelector((state)=>state.AllVentasAchurasByCliente)

    AllVentasByCliente.sort(function(a,b){
        if(a.fecha>b.fecha){return -1}
        if(a.fecha<b.fecha){return 1}
        return 0})
    
    AllVentasAchurasByCliente.sort(function(a,b){
        if(a.fecha>b.fecha){return -1}
        if(a.fecha<b.fecha){return 1}
        return 0})

    return(
        <div className={style.conteinerAll}>
            <NavBar
            title={ClienteById.nombre}
            />
            <div className={style.conteiner}>
                <h5 className={style.firstTitle}>Ventas de Carne</h5>
                <div className={style.title}>
                    <div><b>ID</b></div>
                    <div><b>|</b></div>
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
                <div className={style.cardsCont}>
                    {AllVentasByCliente.length!==0? AllVentasByCliente.map((a,i)=>{
                        return(
                            <CardLarge
                                key={i}
                                id={a.id}
                                fecha={a.fecha}
                                para={a.cliente?.length>10?a.cliente.slice(0,10):a.cliente}
                                cant={a.cant}
                                kg={a.kg}
                                total={a.total}
                                tipo={"Ventas"}
                                pago={false}
                            />
                        )
                    })
                    :null}
                </div>
                <div className={style.cardsCont}>
                        <h5 className={style.firstTitle}>Ventas de Achuras</h5>
                        <div className={style.title}>
                            <div><b>ID</b></div>
                            <div><b>|</b></div>
                            <div><b>Fecha</b></div>
                            <div><b>|</b></div>
                            <div><b>Cliente</b></div>
                            <div><b>|</b></div>
                            <div><b>Cant</b></div>
                            <div><b>|</b></div>
                            <div><b>Monto($)</b></div>
                            <div><b>|</b></div>
                            <div><b>Saldo($)</b></div>
                        </div>
                        <div className={style.cardsCont}>
                            {AllVentasAchurasByCliente.length!==0? AllVentasAchurasByCliente.map((a,i)=>{
                                return(
                                    <CardLarge
                                        key={i}
                                        id={a.id}
                                        fecha={a.fecha}
                                        para={a.clien}
                                        cant={a.cantidad}
                                        kg={a.total}
                                        total={a.saldo}
                                        tipo={"Ventas/Achuras"}
                                    />
                                )
                            })
                            :null}
                        </div>
                </div>
            </div>
        </div>
    )
}