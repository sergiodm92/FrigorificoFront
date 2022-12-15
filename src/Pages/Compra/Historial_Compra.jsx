import React, { useEffect } from "react";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import style from "./Compras.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllComrpas } from "../../Redux/Actions/Actions";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Historial_Compras(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllComrpas())
    }, [dispatch])

    const AllCompras = useSelector((state)=>state.AllCompras)

    return(
        <div className={style.ConteinerCompras}>
            <NavBar
            title={"Hist. Compras"}
            />
            <div>
                <div className={style.title}>
                    <div><b>ID</b></div>
                    <div><b>|</b></div>
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
                <div className={style.cardsCont}>
                    {AllCompras.length>0?
                        AllCompras?.map((a,i)=>{
                        return(
                            <CardLarge
                                key={i}
                                id={a.id}
                                fecha={a.fecha}
                                para={a.proveedor.length<10?a.proveedor:a.proveedor.slice(0,15)}
                                cant={a.cant_total}
                                kg={a.kg_carne_totales}
                                total={a.costo_total_hac}
                                tipo={"Compras"}
                            />
                        )
                    })
                    :
                    <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                        <CircularProgress />
                    </Box>
                    }
                </div>
            </div>
        </div>
    )
}