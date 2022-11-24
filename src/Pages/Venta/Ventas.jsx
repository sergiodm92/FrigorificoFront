import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVentas, getAllVentasAchuras } from "../../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import style from "./Ventas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";


export default function Ventas(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllVentas())
        dispatch(getAllVentasAchuras())
    }, [dispatch])

    const AllVentas= useSelector((state)=>(state.AllVentas))
    const AllVentasAchuras= useSelector((state)=>(state.AllVentasAchuras))

    AllVentas.sort(function(a,b){
        if(a.fecha>b.fecha){return -1}
        if(a.fecha<b.fecha){return 1}
        return 0})

    return(
        <div className={style.ConteinerVenta}>
            <NavBar
            title={"Ventas"}
            onClick={"/home"}
            />
            <div>
                <div className={style.contV}>
                    <h1 className={style.firstTitle}>Ventas de Carne</h1>
                    <div className={style.titleCards} >
                        <div><b>ID</b></div>
                        <div><b>Fecha</b></div>
                        <div><b>Cliente</b></div>
                        <div><b>Cant</b></div>
                        <div><b>kg</b></div>
                        <div><b>Monto($)</b></div>
                    </div>
                    <div className={style.cardsCont}>
                        {AllVentas.map((a,i)=>{
                            return(
                                <CardLarge
                                    id={a.id}
                                    key={i}
                                    fecha={a.fecha}
                                    para={a.cliente.length>15?a.cliente.slice(0,15):a.cliente}
                                    cant={a.cant}
                                    kg={a.kg_total}
                                    monto={a.total}
                                    tipo={"Ventas"}
                                />
                            )
                        })
                        }
                    </div>
                    <div className={style.buttonLarge}>
                        <LargeButton
                            title={"Historial Ventas de Carne"}
                            onClick={()=>navigate("/Ventas/Historial")}
                        />
                    </div>
                </div>
                <div className={style.contV}>
                    <h1 className={style.firstTitle}>Ventas de Achuras</h1>
                    <div className={style.titleVenta} >
                        <div><b>ID</b></div>
                        <div><b>|</b></div>
                        <div><b>Fecha</b></div>
                        <div><b>|</b></div>
                        <div><b>Cliente</b></div>
                        <div><b>|</b></div>
                        <div><b>Cant</b></div>
                        <div><b>|</b></div>
                        <div><b>Monto($)</b></div>
                        <div><b>|</b></div>
                        <div><b>Saldo($)</b></div>
                    </div>
                    <div className={style.cardsCont}>
                        {AllVentasAchuras.map((a,i)=>{
                            return(
                                <CardLarge
                                    id={a.id}
                                    key={i}
                                    fecha={a.fecha}
                                    para={a.clien.length>10?a.clien.slice(0,8):a.clien}
                                    cant={a.cantidad}
                                    kg={a.total}
                                    monto={a.saldo}
                                    tipo={"Ventas/Achuras"}
                                />
                            )
                        })
                        }
                    </div>
                    <div className={style.buttonLarge}>
                        <LargeButton
                            title={"Historial Ventas de Achuras"}
                            onClick={()=>navigate("/Ventas/HistorialAchuras")}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
