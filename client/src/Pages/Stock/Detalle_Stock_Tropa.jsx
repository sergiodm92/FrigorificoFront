import React from "react"
import { useParams } from "react-router"
import Tabla_Detalle_Stock_Tropa from "../../Components/Details/Tabla_Detalle_Stock_Tropa"
import NavBar from "../../Components/Navbar/Navbar"


export default function Detalle_Stock_Tropa(){
const {tropa}=useParams()
    return(
        <div>
        <NavBar
        title="Tropa"    
        />
        <Tabla_Detalle_Stock_Tropa
        tropa={tropa}
        />

        </div>

    )
}