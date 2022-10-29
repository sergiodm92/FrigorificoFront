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
            onClick={"/home"}
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
                    {AllCompras.map((a,i)=>{
                        return(
                            <CardLarge
                                id={a.id}
                                key={i}
                                fecha={a.fecha}
                                para={a.proveedor.length<20?a.proveedor:a.proveedor.slice(0,17)}
                                cant={a.cant_total}
                                kg={a.kg_carne_totales}
                                monto={a.costo_total_hac}
                                tipo={"Compras"}
                            />
                        )
                    })
                    }
                </div>
                <div className={styleCom.buttonLarge}>
                    <LargeButton
                        title={"Historial Compras"}
                        onClick={()=>navigate("/Compras/Historial")}
                    />
                </div>
            </div>
        </div>
    )
}