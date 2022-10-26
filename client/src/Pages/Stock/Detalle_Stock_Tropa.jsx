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

    let arrayResByTropa = useSelector((state)=>(state.arrayResByTropa))
    let array
    array = arrayResByTropa.slice()
    
    
    array[index]?.sort(function(a,b){
        if(a.correlativo>b.correlativo){return 1}
        if(a.correlativo<b.correlativo){return -1}
        return 0
    })

    return(
        <div className={styleDetTrop.Conteiner}>
            <NavBar
                title={array.length!==0?array[index][0].frigorifico+" | "+array[index][0].tropa+" | "+array[index][0].fecha:''}  
            />
        <div className={styleDetTrop.TableDetTropa}>
            <Tabla_Detalle_Stock_Tropa
                reses={array[index]?array[index]:[]}
            />
        </div>
        </div>

    )

}