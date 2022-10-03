import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllComrpas} from "../../Redux/Actions/Actions.js"
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import styleCom from "./Compras.module.scss"

export default function Compras(){
    const AllCompras= useSelector((state)=>(state.AllCompras))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllComrpas())
    }, [dispatch])
    
    return(
        <div className={styleCom.ConteinerCompras}>
            <NavBar
            title={"Compras"}
            />
            <div>
                <div className={styleCom.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Proveedor</b></div>
                    <div><b>|</b></div>
                    <div><b>Cant</b></div>
                    <div><b>|</b></div>
                    <div><b>kg carne</b></div>
                    <div><b>|</b></div>
                    <div><b>Monto($)</b></div>
                </div>
                <div className={styleCom.cardsCont}>
                    {AllCompras.map((a)=>{
                        return(
                            <CardLarge
                                id={a.id}
                                fecha={a.fecha}
                                para={a.proveedor}
                                cant={a.cant}
                                kg={a.kg_carne}
                                monto={a.costo_total}
                                tipo={"Compras"}
                            />
                        )
                    })
                    }
                </div>
                <div className={styleCom.buttonLarge}>
                    <LargeButton
                        title={"Mostrar todas"}
                        onClick={()=>navigate("/Historial_Compras")}
                    />
                </div>
            </div>
        </div>
    )
}