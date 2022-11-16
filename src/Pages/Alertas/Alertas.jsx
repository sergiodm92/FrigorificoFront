import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  getAlertRes, getSaldoAllVentas} from "../../Redux/Actions/Actions.js"
import NavBar from "../../Components/Navbar/Navbar"
import style from "./Alert.module.scss"
import Marca from "../../Components/Marca/Marca.jsx";
import Graph from "../../Components/Graph/Graph.jsx";



export default function Alertas(){

const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAlertRes())
    }, [dispatch])

    const alertRes = useSelector((state)=>state.alertRes)


    let fecha = Date.now()
    return(
        <div className={style.ConteinerBalance}>
                <NavBar
                title="Alertas"
                />
                {alertRes?.map(a=>{
                    return(
                    <div className={style.cont}>
                        <h5>{"🔔 La Res "+a.correlativo+" del frigorífico "+a.frigorifico+" ya tiene "+Math.floor((fecha - a.fecha)/(24*3600*1000))+ "días."}</h5> 
                    </div>
                )
                }
                )}

            <div className={style.marca}>
                <Marca/>
            </div>
            
        </div>
    )
}