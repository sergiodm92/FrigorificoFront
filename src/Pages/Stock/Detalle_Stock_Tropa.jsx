import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import Tabla_Detalle_Stock_Tropa from "../../Components/Details/Tabla_Detalle_Stock_Tropa"
import NavBar from "../../Components/Navbar/Navbar"
import { getAllFaenas, getAllGruposReses } from "../../Redux/Actions/Actions";
import styleDetTrop from "./Stock.module.scss"

export default function Detalle_Stock_Tropa(){
    const {tropa}=useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllFaenas())
    }, [tropa])

    let AllFaenas = useSelector((state)=>state.AllFaenas)
    let faena = AllFaenas.find((a)=>a.tropa==tropa)

    faena.detalle?.sort(function(a,b){
        if(a.correlativo>b.correlativo){return 1}
        if(a.correlativo<b.correlativo){return -1}
        return 0
    })

    return(
        
        <div className={styleDetTrop.Conteiner}>
            <NavBar/>
        <div className={styleDetTrop.buttonEdit}>
            <ButtonNew
                style={"edit"}
                icon={"edit"}
                onClick={tropa?()=>navigate(`/Faenas/editarRes/${tropa}`):null}
            />
        </div>
        <div className={styleDetTrop.TableDetTropa}>
            <Tabla_Detalle_Stock_Tropa
                reses={faena?.detalle}
            />
        </div>
        </div>

    )

}