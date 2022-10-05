import React, { useEffect } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import styleVen from "./Ventas.module.scss";
import { getAllVentas } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
const data = require("../../Components/Details/data.json")


export default function Historial_Ventas(){

    const AllVentas= useSelector((state)=>(state.AllVentas))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllVentas())
    }, [dispatch])

    return(
        <div className={styleVen.ConteinerCompras}>
            <NavBar
            title={"Hist. Ventas"}
            />
            <div>
                <div className={styleVen.title}>
                    <div><b>Fecha</b></div>
                    <div><b>|</b></div>
                    <div><b>Proveedor</b></div>
                    <div><b>|</b></div>
                    <div><b>Cant</b></div>
                    <div><b>|</b></div>
                    <div><b>kg</b></div>
                    <div><b>|</b></div>
                    <div><b>Monto($)</b></div>
                </div>
                <div className={styleVen.cardsCont}>
                    {AllVentas.map((a)=>{
                        return(
                            <CardLarge
                                id={a.ID_Venta}
                                fecha={a.Fecha}
                                para={a.Cliente}
                                cant={a.Cant}
                                kg={a.kg_Total}
                                monto={a.Total}
                                tipo={"Ventas"}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}