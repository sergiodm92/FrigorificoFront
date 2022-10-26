import React, { useEffect } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import styleVen from "./Ventas.module.scss";
import { getAllVentas } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";



export default function Historial_Ventas(){

    const AllVentas= useSelector((state)=>(state.AllVentas))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllVentas())
    }, [dispatch])

    return(
        <div className={styleVen.ConteinerVentas}>
            <NavBar
            title={"Hist. Ventas"}
            />
            <div>
                <div className={styleVen.title}>
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
                <div className={styleVen.cardsCont}>
                    {AllVentas.map((a, i)=>{
                        return(
                            <CardLarge
                                key={i}
                                id={a.id}
                                fecha={a.fecha}
                                para={a.cliente}
                                cant={a.cant}
                                kg={a.kg_total}
                                monto={a.total}
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