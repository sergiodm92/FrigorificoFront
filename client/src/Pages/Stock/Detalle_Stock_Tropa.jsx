import React from "react"
import { useParams } from "react-router"
import Tabla_Detalle_Stock_Tropa from "../../Components/Details/Tabla_Detalle_Stock_Tropa"
import NavBar from "../../Components/Navbar/Navbar"
import styleDetTrop from "./Stock.module.scss"

export default function Detalle_Stock_Tropa(){
const {tropa}=useParams()
    return(
        <div className={styleDetTrop.Conteiner}>
        <NavBar
        title="Tropa"    
        />
        <div className={styleDetTrop.TableDetTropa}>
        <Tabla_Detalle_Stock_Tropa
        tropa={tropa}
        />
        </div>
        </div>

    )
}