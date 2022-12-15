import React, { useEffect, useState } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import style from "./Ventas.module.scss";
import { filtrarVentasAchuras, getAllVentasAchuras } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { createTheme, TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



export default function Historial_Ventas_Achuras(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filter,setFilter] = useState("")

    useEffect(() => {
        dispatch(getAllVentasAchuras())
    }, [dispatch])
    const AllVentasAchuras= useSelector((state)=>(state.AllVentasAchuras))

    const filtrado = (e) =>{
        e.preventDefault()
        setFilter(e.target.value)
        dispatch(filtrarVentasAchuras(filter,AllVentasAchuras))
        if(e.target.value=="")dispatch(getAllVentasAchuras())
    }

   

    const outerTheme = createTheme({
        palette: {
        primary: {
        main: 'rgb(255, 159, 0)',
    }
}
})

    return(
        <div className={style.ConteinerVenta}>
            <NavBar
            title={"Hist. Ventas de Achuras"}
            />
            <div  className={style.search}>
                <ThemeProvider theme={outerTheme}>
                    <TextField value={filter} focused="true"  placeholder="ingrese nombre🔎"  onChange={filtrado}/>
                </ThemeProvider>
            </div>
            <div>
                <div className={style.title}>
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
                    {AllVentasAchuras.length>0?
                        AllVentasAchuras?.map((a,i)=>{
                        return(
                            <CardLarge
                                key={i}
                                id={a.id}
                                fecha={a.fecha}
                                para={a.clien}
                                cant={a.cantidad}
                                kg={a.total}
                                total={a.saldo}
                                tipo={"Ventas/Achuras"}
                            />
                        )
                    })
                    :
                    <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                        <CircularProgress />
                    </Box>}
                </div>
            </div>
        </div>
    )
}