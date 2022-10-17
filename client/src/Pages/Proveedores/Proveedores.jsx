import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small Proveedores/Card_Small_Proveedores";
import stylePr from "./Proveedores.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import {getAllProveedores} from "../../Redux/Actions/Actions.js"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";




// const data = require("../../Components/Details/data.json")

export default function Proveedores(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProveedores())
    }, [dispatch])
    const AllProveedores = useSelector((state)=>state.AllProveedores)
    
    console.log(AllProveedores)
    return(
        <div className={stylePr.ConteinerProveedores}>
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
                    {AllProveedores.map((a)=>{

                        return(
                            <CardSmall
                                id={a.id}
                                nombre={a.nombre}
                                monto={a.saldo===null?0:a.saldo}
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