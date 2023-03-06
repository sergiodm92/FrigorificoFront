import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import stylePr from "./Proveedores.module.scss";
import { getAllComrpasByProveedor } from "../../Redux/Actions/Actions";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



export default function Historial_Compras_Proveedor(){

    const {name}=useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllComrpasByProveedor(name))
    }, [dispatch])
    
    const AllComprasByProveedor = useSelector((state)=>state.AllComprasByProveedor)

    AllComprasByProveedor.sort(function(a,b){
        if(a.fecha>b.fecha){return -1}
        if(a.fecha<b.fecha){return 1}
        return 0})

    return(
        <div className={stylePr.ConteinerProveedores}>
            <NavBar
            title={name}
            />
            <div>
            <div className={stylePr.titleCards}>
                    <div><b>ID</b></div>
                    <div><b>Fecha</b></div>
                    <div><b>Proveedor</b></div>
                    <div><b>Cant</b></div>
                    <div><b>kg</b></div>
                    <div><b>Saldo($)</b></div>
                </div>
                <div className={stylePr.cardsCont}>
                    {AllComprasByProveedor.length>0?
                        AllComprasByProveedor?.map((a,i)=>{
                        return(
                            <CardLarge
                                key={i}
                                id={a.id}
                                fecha={a.fecha}
                                para={a.proveedor.length>12?a.proveedor.slice(0,12):a.proveedor}
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