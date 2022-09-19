import React from "react"
import { useParams } from "react-router"
import Tabla_Detalle_Stock_Tropa from "../../Components/Details/Tabla_Detalle_Stock_Tropa"
import NavBar from "../../Components/Navbar/Navbar"
import styleS from "./Stock.module.scss";

export default function Detalle_Stock_Tropa(){
const {tropa}=useParams()
    return(
        <div className={styleS.Conteiner}>
            <NavBar
                title="Tropa"    
            />
            <div className={styleS.tablecliente}>
                <Tabla_Detalle_Stock_Tropa
                    tropa={tropa}
                />
            </div>
        </div>

    )
}