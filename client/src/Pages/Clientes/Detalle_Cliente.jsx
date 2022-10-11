import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteClienteById, getClienteByID, getVentasByCliente } from "../../Redux/Actions/Actions";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import styleCl from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import Table_Cliente from "../../Components/Details/Table_Cliente";


export default function Detalle_Cliente(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id}=useParams()

    useEffect(() => {
        dispatch(getClienteByID(id))
    }, [dispatch])

    const ClienteById = useSelector((state)=>(state.ClienteById))

    useEffect(() => {
        dispatch(getVentasByCliente(ClienteById.nombre))
    }, [ClienteById])

    const AllVentasByCliente = useSelector((state)=>state.AllVentasByCliente)
    const VentasPendientes = AllVentasByCliente.filter((a)=>a.cliente===ClienteById.nombre && a.saldo>0)

    const deleteCliente = ()=>{
        swal({
            title: "Está seguro que desea eliminar a "+ ClienteById.nombre,
            text: "Una vez eliminado perdera todos sus datos 😰",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                swal('Escriba "eliminar cliente" para confirmar:', {
                    content: "input",
                    })
                    .then((value) => {
                    if(value==="eliminar cliente"){
                        swal("Se eliminó a "+ ClienteById.nombre, {
                            icon: "success",
                        })
                    dispatch(deleteClienteById(id))
                    navigate('/Clientes')
                    }
                    else {
                        swal("Frase incorrecta, no se eliminó a "+ ClienteById.nombre);
                    }
                });
            } else {
                swal("No se eliminó a "+ ClienteById.nombre);
                }
        })

        
    }

    return(
        <div className={styleCl.Conteiner}>
            <NavBar
                title={ClienteById.nombre}
            />
            <div className={styleCl.page}>
                {/* <div className={styleCl.buttonEdit}>
                    <ButtonNew
                        style={"edit"}
                        icon={"edit"}
                        onClick={()=>navigate(`/Faenas`)}
                    />
                </div>
                <div className={styleCl.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteCliente}
                    />
                </div> */}
                <div className={styleCl.tablecliente}>
                <Table_Cliente
                email={ClienteById.email}
                telefono={ClienteById.telefono}
                direccion={ClienteById.direccion}
                />
                </div>
                <div className={styleCl.cont}>
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
                                    id={a.id}
                                    fecha={a.fecha}
                                    para={a.cliente}
                                    cant={a.cant}
                                    kg={a.kg_total}
                                    monto={a.saldo.toFixed(2)}
                                    tipo={"Ventas"}
                                    pago={true}
                                    bstyle={"new"}
                                    bicon={"new"}
                                    bonClick={()=>navigate(`/Form_Pago_Venta/${ClienteById.nombre}`)}
                                />
                            )
                        })
                        }
                    </div>
                    <div className={styleCl.buttonLarge}>
                        <LargeButton
                            title={"Historial de Ventas"}
                            onClick={()=>navigate(`/Historial_Ventas_Cliente/${id}`)}
                        ></LargeButton>
                    </div>
                    <div className={styleCl.buttonLarge}>
                        <LargeButton
                            title={"Detalle de Pagos"}
                            onClick={()=>navigate(`/Detalle_Pagos_Cliente/${id}`)}
                        ></LargeButton>
                    </div>
                </div>
            </div>
        </div>
    )
}