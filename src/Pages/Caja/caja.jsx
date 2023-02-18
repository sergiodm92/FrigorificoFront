import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./caja.module.scss";
import {  getAllIngresosExtras, getAllPagosCompras, getAllPagosExtras, getAllPagosFaenas, getAllPagosVentas, getAllPagosVentasAchuras, getCaja } from "../../Redux/Actions/Actions";
import Table_Det_Caja from "../../Components/Details/Detalle_Caja";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';




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
        dispatch(getCaja())

    }, [dispatch])

    const allPagosCompras= useSelector((state)=>(state.allPagosCompras))
    const allPagosFaenas= useSelector((state)=>(state.allPagosFaenas))
    const allPagosVentasAchuras= useSelector((state)=>(state.allPagosVentasAchuras))
    const allPagosVentas= useSelector((state)=>(state.allPagosVentas))
    const allPagosExtras= useSelector((state)=>(state.allPagosExtras))
    const allIngresosExtras= useSelector((state)=>(state.allIngresosExtras))
    const totalCaja = useSelector((state)=>(state.caja))
    const [cant, setcant] = useState(5);


    let pagos=[...allPagosVentasAchuras, ...allPagosVentas, ...allPagosCompras, ...allPagosFaenas, ...allPagosExtras, ...allIngresosExtras]

    pagos.sort(function(a,b){
        if(a.fecha>b.fecha){return -1}
        if(a.fecha<b.fecha){return 1}
        return 0})

    

    const handleChange = (e) => {
        setcant(e.target.value)
    };

    const outerTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: 'rgb(255,255,255)',
                contrastText: 'rgb(255,255,255)'
            },
            secondary: {
                main: 'rgb(255,255,255)',
                contrastText: 'rgb(255,255,255)'
            },
            info: {
                main: 'rgb(255,255,255)',
                contrastText: 'rgb(255,255,255)'
            },

        },
        });


    return(
        
        <div className={style.conteiner}>
            <NavBar
                    title={"Caja"}
            />
            {totalCaja.total?
            <div>
            <FormControl className={style.conteinerRadio}>
            <ThemeProvider theme={outerTheme}>
                <FormLabel id="demo-row-radio-buttons-group-label">Ultimos Movimientos</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="controlled-radio-buttons-group"
                    value={cant}
                    onChange={handleChange}
                    
                >
                    <FormControlLabel value={5} control={<Radio />} label="5"  />
                    <FormControlLabel value={10} control={<Radio />} label="10" />
                    <FormControlLabel value={20} control={<Radio />} label="20" />
                    <FormControlLabel value={pagos.length} control={<Radio />} label="Todo" />
                </RadioGroup>
                </ThemeProvider>
            </FormControl>

                <Table_Det_Caja
                    pagos={pagos.slice(0,cant)}
                    total={totalCaja?.total}
                    fechaMod={totalCaja?.fecha}             
                    />
            </div>

            :

            <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                        <CircularProgress />
            </Box>
            }

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