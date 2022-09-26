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
    console.log(AllClientes)
    console.log(AllClientes.length)
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
                    {AllClientes.length>0?AllClientes.map((a)=>{
                        return(
                            <CardSmall
                                id={a.ID}
                                fecha={a.nombre}
                                otro="08/08/2022"
                                monto="$125000"
                                tipo={"Detalle_Cliente"}
                                pago={false}
                            />
                        )
                    })
                        : (<></>) }
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