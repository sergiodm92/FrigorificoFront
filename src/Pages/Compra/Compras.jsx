import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllComrpas, getAllComrpasConSaldo} from "../../Redux/Actions/Actions.js"
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import style from "./Compras.module.scss"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Compras(){
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllComrpasConSaldo())
    }, [dispatch])

    const AllCompras= useSelector((state)=>(state.AllComprasConSaldo))

    AllCompras.sort(function(a,b){
        if(a.fecha>b.fecha){return -1}
        if(a.fecha<b.fecha){return 1}
        return 0})
        
    return(
        <div className={style.ConteinerCompras}>
            <NavBar
            title={"Compras"}
            onClick={"/home"}
            />
            <div>
                <div className={style.titleCards}>
                    <div><b>ID</b></div>
                    <div><b>Fecha</b></div>
                    <div><b>Proveedor</b></div>
                    <div><b>Cant</b></div>
                    <div><b>kg</b></div>
                    <div><b>Saldo($)</b></div>
                </div>
                <div className={style.cardsCont}>
                    {AllCompras.length>0?
                    AllCompras.map((a,i)=>{
                        return(
                            <CardLarge
                                id={a.id}
                                key={i}
                                fecha={a.fecha}
                                para={a.proveedor.length<10?a.proveedor:a.proveedor.slice(0,15)}
                                cant={a.cant_total}
                                kg={a.kg_carne_totales}
                                total={a.saldo}
                                tipo={"Compras"}
                            />
                        )
                        
                    }):<Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                            <CircularProgress />
                        </Box>
                    }
                </div>
                <div className={style.buttonLarge}>
                    <LargeButton
                        title={"Historial Compras"}
                        onClick={()=>navigate("/Compras/Historial")}
                    />
                </div>
            </div>
        </div>
    )
}