import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import stylePr from "./Proveedores.module.scss";
import { getAllComrpasByProveedor } from "../../Redux/Actions/Actions";


export default function Historial_Compras_Proveedor(){

    const {name}=useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllComrpasByProveedor(name))
    }, [dispatch])
    
    const AllComprasByProveedor = useSelector((state)=>state.AllComprasByProveedor)

    return(
        <div className={stylePr.ConteinerProveedores}>
            <NavBar
            title={name}
            />
            <div>
                <div className={stylePr.title}>
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
                <div className={stylePr.cardsCont}>
                    {AllComprasByProveedor.map((a,i)=>{
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