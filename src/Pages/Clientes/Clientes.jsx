import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import { getAllClientes } from "../../Redux/Actions/Actions";
import CardSmallCliente from "../../Components/Cards/Card_Small Cliente/Card_Small_Cliente";

export default function Clientes(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllClientes())
    }, [dispatch])

    const AllClientes = useSelector((state)=>(state.AllClientes))

    return(
        <div className={style.conteinerAll}>
                <NavBar
                title={"Clientes"}
                onClick={"/home"}
                />
                <div>
                    <div className={style.title}>
                        <div><b>Nombre</b></div>
                        <div><b>|</b></div>
                        <div><b>Cuil</b></div>
                        <div><b>|</b></div>
                        <div><b>Saldo($)</b></div>
                    </div>
                    <div className={style.cardsCont}>
                    {AllClientes.map((a)=>{

                        return(
                            <CardSmallCliente
                                key={a.id}
                                id={a.id}
                                nombre={a.nombre}
                                tipo={"Clientes"}
                                pago={false}
                                cuil= {a.cuil}
                            />
                        )
                    })}
                    
                    </div>
                    <div className={style.buttonLarge}>
                        <LargeButton
                            title={"Agregar Cliente"}
                            onClick={()=>navigate("/Clientes/Form/0")}
                        ></LargeButton>
                    </div>
                </div>
            
            {/* <div className={styleCl.marca}>
                <Marca/>
            </div> */}
        </div>
    )
}