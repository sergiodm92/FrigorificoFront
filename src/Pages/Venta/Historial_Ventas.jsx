import React, { useEffect, useState } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import style from "./Ventas.module.scss";
import { filtrarVentas, getAllVentas } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createTheme, Input, TextField, ThemeProvider } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";



export default function Historial_Ventas(){

    const AllVentas= useSelector((state)=>(state.AllVentas))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filter,setFilter] = useState("")
    const [Ventas,setVentas] = useState(AllVentas)

    useEffect(() => {
        dispatch(getAllVentas())
    }, [dispatch])

    const onChangefiltrado = (e) =>{
        e.preventDefault()
        setFilter(e.target.value)
    }
    const filtrarPorCorrelativo = ()=>{
        let filterVentas = []
        filterVentas = AllVentas.filter((venta) =>
        venta.detalle.some((res) => res.correlativo.includes(filter)))
        setVentas(filterVentas.length===0?AllVentas:filterVentas)
        if(filterVentas.length===0){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'warning',
            title: `No se encontraron ventas que incluyan el correlativo ${filter}`
          })  
    }
    }

    AllVentas.sort(function(a,b){
        if(a.fecha>b.fecha){return -1}
        if(a.fecha<b.fecha){return 1}
        return 0})

        useEffect(() => {
            setVentas(AllVentas)
    }, [AllVentas])

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
            title={"Hist. Ventas"}
            />
            <div>
            <div className={style.search}>
                <div>
                    <ThemeProvider theme={outerTheme}>
                    <Input  value={filter}   placeholder="ingrese un correlativo" onChange={onChangefiltrado} />
                    </ThemeProvider>
                </div>
                <div>
                    <Button onClick={filtrarPorCorrelativo}>ok</Button>
                </div>
            </div>
            <div className={style.titleCards} >
                <div><b>ID</b></div>
                <div><b>Fecha</b></div>
                <div><b>Cliente</b></div>
                <div><b>Cant</b></div>
                <div><b>kg</b></div>
                <div><b>Saldo($)</b></div>
            </div>
                <div className={style.cardsCont}>
                    {Ventas.length?
                        Ventas?.map((a, i)=>{
                        return(
                            <CardLarge
                                key={i}
                                id={a.id}
                                fecha={a.fecha}
                                para={a.cliente.slice(0,15)}
                                cant={a.cant}
                                kg={a.kg}
                                total={a.total}
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
            </div>
        </div>
    )
}