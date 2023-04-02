import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../Components/Navbar/Navbar";
import styleSt from "./Stock.module.scss";
import Table_Stock from "../../Components/Details/Table_Stock";
import CardSmallStock from "../../Components/Cards/Card_Small_stock/Card_Small.jsx";
import {getFaenasUltimosVeinteDias } from "../../Redux/Actions/Actions";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import sumarStock from "./SumarStock";

export default function Stock() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFaenasUltimosVeinteDias())
    }, [dispatch])

    let AllFaenas = useSelector((state) => state.ultimasFaenas)
    let totales = sumarStock(AllFaenas)

    return (
        <div className={styleSt.Conteiner}>
            <NavBar
                title={"Stock"}
            />
            {AllFaenas.length ?
                <div className={styleSt.contTable}>
                    <Table_Stock
                        array={totales}
                    />
                </div>
                :
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                </Box>
            }
            <div className={styleSt.title}>
                <div><b>Fecha</b></div>
                <div><b>|</b></div>
                <div><b>Dias</b></div>
                <div><b>|</b></div>
                <div><b>Frigorífico</b></div>
                <div><b>|</b></div>
                <div><b>Tropa</b></div>
            </div>
            <div className={styleSt.cardsCont}>
                {AllFaenas.map((a, i) => {
                    return (
                        a.detalle.some((e) => e.stock == true) ?
                            <CardSmallStock
                                key={i}
                                fecha={a.fecha}
                                frigorifico={a.frigorifico}
                                tropa={a.tropa}
                                tipo={"Stock/DetalleTropa"}
                            />
                            : null
                    )
                })
                }
            </div>
        </div>
    )
}
