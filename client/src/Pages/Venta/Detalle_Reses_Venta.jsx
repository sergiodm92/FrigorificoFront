import React from "react"
import TableDetRes from "../../Components/Details/Detalle_Reses_Venta"
import StyleDetalleVenta from './StyleDetalleVenta.module.scss'
import { useParams } from "react-router"
import NavBar from "../../Components/Navbar/Navbar"

export default function Detalle_Reses_Venta() 
{
const {id}=useParams()

    return(
        <div className={StyleDetalleVenta.ConteinerVenta}>
        <div>

        <NavBar
        title={"Detalle"}
        />
        </div>
        <div>
            <TableDetRes
            id_v={id}
            />
        </div>
        </div>

    )
}