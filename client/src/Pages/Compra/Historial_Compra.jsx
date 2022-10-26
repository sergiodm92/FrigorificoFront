import React, { useEffect } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import styleCom from "./Compras.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { getAllComrpas } from "../../Redux/Actions/Actions"


export default function Historial_Compras(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllComrpas())
    }, [dispatch])

    const AllCompras = useSelector((state)=>state.AllCompras)

    return(
        <div className={styleCom.ConteinerCompras}>
            <NavBar
            title={"Hist. Compras"}
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
                    {AllCompras?.map((a,i)=>{
                        return(
                            <CardLarge
                                key={i}
                                id={a.id}
                                fecha={a.fecha}
                                para={a.proveedor}
                                cant={a.cant_total}
                                kg={a.kg_carne_totales}
                                monto={a.costo_total_hac}
                                tipo={"Compras"}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}