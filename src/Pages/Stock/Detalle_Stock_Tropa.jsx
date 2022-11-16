import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import Tabla_Detalle_Stock_Tropa from "../../Components/Details/Tabla_Detalle_Stock_Tropa"
import NavBar from "../../Components/Navbar/Navbar"
import { getAllReses } from "../../Redux/Actions/Actions";
import styleDetTrop from "./Stock.module.scss"

export default function Detalle_Stock_Tropa(){
    const {index}=useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllReses())
    }, [dispatch])

    let arrayResByTropa = useSelector((state)=>(state.arrayResByTropa))
    let array
    array = arrayResByTropa.slice()
    let tropa=array[0]?array[index][0].tropa:0
    
    
    array[index]?.sort(function(a,b){
        if(a.correlativo>b.correlativo){return 1}
        if(a.correlativo<b.correlativo){return -1}
        return 0
    })
    
    return(
        <div className={styleDetTrop.Conteiner}>
            <NavBar
                title={array.length!==0?array[index][0].frigorifico+" | "+array[index][0].tropa+" | "+(new Date(array[index][0].fecha*1)).toLocaleDateString('es').replaceAll("/", "-"):''}  
            />
        {tropa?<div className={styleDetTrop.buttonEdit}>
            <ButtonNew
                style={"edit"}
                icon={"edit"}
                onClick={()=>navigate(`/Faenas/editarRes/${tropa}`)}
            />
        </div>:<div></div>}
        <div className={styleDetTrop.TableDetTropa}>
            <Tabla_Detalle_Stock_Tropa
                reses={array[index]?array[index]:[]}
            />
        </div>
        </div>

    )

}