import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router"
import Tabla_Detalle_Stock_Tropa from "../../Components/Details/Tabla_Detalle_Stock_Tropa"
import NavBar from "../../Components/Navbar/Navbar"
import { getAllReses } from "../../Redux/Actions/Actions";
import styleDetTrop from "./Stock.module.scss"

export default function Detalle_Stock_Tropa(){
const {index}=useParams()
const dispatch = useDispatch()
useEffect(() => {
    dispatch(getAllReses())
}, [dispatch])
const arrayResByTropa = useSelector((state)=>(state.arrayResByTropa))
console.log(arrayResByTropa)
    return(
        <div className={styleDetTrop.Conteiner}>
        <NavBar
        title={arrayResByTropa[index][0].frigorifico+" | "+arrayResByTropa[index][0].tropa+" | "+arrayResByTropa[index][0].fecha}    
        />
        <div className={styleDetTrop.TableDetTropa}>
        <Tabla_Detalle_Stock_Tropa
        reses={arrayResByTropa[index]}
        />
        </div>
        </div>

    )
}