import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./caja.module.scss";
import {  getAllIngresosExtras, getAllPagosCompras, getAllPagosExtras, getAllPagosFaenas, getAllPagosVentas, getAllPagosVentasAchuras } from "../../Redux/Actions/Actions";
import Table_Det_Caja from "../../Components/Details/Detalle_Caja";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";



export default function Caja(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllPagosCompras())
        dispatch(getAllPagosFaenas())
        dispatch(getAllPagosVentasAchuras())
        dispatch(getAllPagosVentas())
        dispatch(getAllPagosExtras())
        dispatch(getAllIngresosExtras())
    }, [dispatch])

    const allPagosCompras= useSelector((state)=>(state.allPagosCompras))
    const allPagosFaenas= useSelector((state)=>(state.allPagosFaenas))
    const allPagosVentasAchuras= useSelector((state)=>(state.allPagosVentasAchuras))
    const allPagosVentas= useSelector((state)=>(state.allPagosVentas))
    const allPagosExtras= useSelector((state)=>(state.allPagosExtras))
    const allIngresosExtras= useSelector((state)=>(state.allIngresosExtras))


    let pagos=[...allPagosVentasAchuras, ...allPagosVentas, ...allPagosCompras, ...allPagosFaenas, ...allPagosExtras, ...allIngresosExtras]
    let total = 0
    pagos.map(a=>{
        if(a.ventaID)total+=a.monto
        else total-=a.monto
        })
    return(
        <div className={style.conteinerCaja}>
            <NavBar
                    title={"Caja"}
            />
            <div>
                <Table_Det_Caja
                    pagos={pagos}
                    total={total}                />
            </div>
            <div className={style.divButtons}>
                <ShortButton
                    title={"Detalle de Extracciones"}
                    onClick={()=>navigate('/Caja/DetalleExtracciones')}
                    color={"secondary"}
                />
                <ShortButton
                    title={"Agregar Extracción"}
                    onClick={()=>navigate('/Caja/FormExtraccion')}
                    color={"primary"}
                />

            </div>
            <div className={style.divButtons}>

                        <ShortButton
                    title={"Detalle de Ingresos Extras"}
                    onClick={()=>navigate('/Caja/DetalleIngresos')}
                    color={"secondary"}
                />
                                <ShortButton
                    title={"Agregar ingreso Extra"}
                    onClick={()=>navigate('/Caja/FormIngresoExtra')}
                    color={"primary"}
                />
            </div>
        </div>
    )
}