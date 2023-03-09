import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVentasAchurasConSaldo, getAllVentasConSaldo } from "../../Redux/Actions/Actions";
import { useFetcher, useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import style from "./Ventas.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider } from "@emotion/react";
import { createTheme, Input, TextField } from "@mui/material";
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";


export default function Ventas() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllVentasConSaldo())
        dispatch(getAllVentasAchurasConSaldo())
    }, [dispatch])



    let AllVentas = useSelector((state) => (state.AllVentasConSaldo))
    let AllVentasAchuras = useSelector((state) => (state.AllVentasAchurasConSaldo))


    const [filter, setFilter] = useState("")
    const [Ventas, setVentas] = useState(AllVentas)
    console.log(Ventas)
    console.log(AllVentas)


    AllVentas.sort(function (a, b) {
        if (a.fecha > b.fecha) { return -1 }
        if (a.fecha < b.fecha) { return 1 }
        return 0
    })

    AllVentasAchuras.sort(function (a, b) {
        if (a.fecha > b.fecha) { return -1 }
        if (a.fecha < b.fecha) { return 1 }
        return 0
    })

    useEffect(() => {
        setVentas(AllVentas)
    }, [AllVentas])


    const onChangefiltrado = (e) => {
        e.preventDefault()
        setFilter(e.target.value)
    }

    const filtrarPorCorrelativo = () => {
        let filterVentas = []
        filterVentas = AllVentas.filter((venta) =>
            venta.detalle.some((res) => res.correlativo.includes(filter)))
        setVentas(filterVentas.length === 0 ? AllVentas : filterVentas)
        if (filterVentas.length === 0) {
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

    const outerTheme = createTheme({
        palette: {
            primary: {
                main: 'rgb(255, 159, 0)',
            }
        }
    })

    function currencyFormatter({ currency, value }) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 0,
            currency
        })
        return formatter.format(value)
    }

    return (
        <div className={style.ConteinerVenta}>
            <NavBar
                title={"Ventas"}
                onClick={"/home"}
            />
            <div>

                <div className={style.contV}>
                    <h1 className={style.firstTitle}>Ventas de Carne</h1>
                    <div className={style.search}>
                        <div>
                            <ThemeProvider theme={outerTheme}>
                                <Input value={filter} placeholder="ingrese un correlativo" onChange={onChangefiltrado} />
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
                        {Ventas.length ?
                            Ventas.map((a, i) => {
                                return (
                                    <CardLarge
                                        id={a.id}
                                        key={i}
                                        fecha={a.fecha}
                                        para={a.cliente.length > 15 ? a.cliente.slice(0, 15) : a.cliente}
                                        cant={a.cant}
                                        kg={a.kg}
                                        total={a.saldo}
                                        tipo={"Ventas"}
                                    />
                                )
                            })
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <CircularProgress />
                            </Box>
                        }
                    </div>
                    <div className={style.buttonLarge}>
                        <LargeButton
                            title={"Historial Ventas de Carne"}
                            onClick={() => navigate("/Ventas/Historial")}
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
                        {AllVentasAchuras.length ?
                            AllVentasAchuras.map((a, i) => {
                                return (
                                    <CardLarge
                                        id={a.id}
                                        key={i}
                                        fecha={a.fecha}
                                        para={a.clien.length > 10 ? a.clien.slice(0, 8) : a.clien}
                                        cant={a.cantidad}
                                        kg={currencyFormatter({
                                            currency: "USD",
                                            value: a.total
                                        })}
                                        total={a.saldo}
                                        tipo={"Ventas/Achuras"}
                                    />
                                )
                            })
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <CircularProgress />
                            </Box>
                        }
                    </div>
                    <div className={style.buttonLarge}>
                        <LargeButton
                            title={"Historial Ventas de Achuras"}
                            onClick={() => navigate("/Ventas/HistorialAchuras")}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
