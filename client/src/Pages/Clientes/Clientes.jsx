import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleCl from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import { getAllClientes } from "../../Redux/Actions/Actions";


export default function Clientes(){
    const AllClientes = useSelector((state)=>(state.AllClientes))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllClientes())
    }, [dispatch])


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
                    {AllClientes.map((a)=>{
                        return(
                            <CardSmall
                                id={a.nombre}
                                fecha={a.nombre}
                                otro={a.ultima_venta}
                                monto={a.saldo}
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