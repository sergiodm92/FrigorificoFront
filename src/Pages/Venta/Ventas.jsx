import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllVentasAchurasConSaldo, getAllVentasConSaldo } from "../../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import style from "./Ventas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



export default function Ventas(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllVentasConSaldo())
        dispatch(getAllVentasAchurasConSaldo())
    }, [dispatch])

    const AllVentas= useSelector((state)=>(state.AllVentasConSaldo))
    const AllVentasAchuras= useSelector((state)=>(state.AllVentasAchurasConSaldo))


    AllVentas.sort(function(a,b){
        if(a.fecha>b.fecha){return -1}
        if(a.fecha<b.fecha){return 1}
        return 0})

    
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 0,
            currency
        }) 
        return formatter.format(value)
        }

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
                        <div><b>Saldo($)</b></div>
                    </div>
                    <div className={style.cardsCont}>
                        {AllVentas.length?
                            AllVentas.map((a,i)=>{
                            return(
                                <CardLarge
                                    id={a.id}
                                    key={i}
                                    fecha={a.fecha}
                                    para={a.cliente.length>15?a.cliente.slice(0,15):a.cliente}
                                    cant={a.cant}
                                    kg={a.kg}
                                    total={a.saldo}
                                    tipo={"Ventas"}
                                />
                            )
                        })
                        :
                        <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                            <CircularProgress />
                        </Box>
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
                    <div className={style.titleCards} >
                    <div><b>ID</b></div>
                        <div><b>Fecha</b></div>
                        <div><b>Cliente</b></div>
                        <div><b>Cant</b></div>
                        <div><b>Total</b></div>
                        <div><b>Saldo($)</b></div>
                    </div>
                    <div className={style.cardsCont}>
                        {AllVentasAchuras.length?
                            AllVentasAchuras.map((a,i)=>{
                            return(
                                <CardLarge
                                    id={a.id}
                                    key={i}
                                    fecha={a.fecha}
                                    para={a.clien.length>10?a.clien.slice(0,8):a.clien}
                                    cant={a.cantidad}
                                    kg={currencyFormatter({
                                            currency: "USD",
                                            value : a.total
                                    })}
                                    total={a.saldo}
                                    tipo={"Ventas/Achuras"}
                                />
                            )
                        })
                        :
                        <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                            <CircularProgress />
                        </Box>
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
