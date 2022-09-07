import React from "react"
import NavBar from "../../Components/Navbar/Navbar"
import TableVenta from "../../Components/Details/Detalle_Venta"
import StyleDetalleVenta from './StyleDetalleVenta.module.scss'

export default function Detalle_Venta(){//{id_v}
const id_v=1
    return(
        <div className={StyleDetalleVenta.ConteinerVenta}>
        <NavBar
        title={"Detalle"}
        />
        <div className={StyleDetalleVenta.TableVenta}>
        <TableVenta
        id_v={id_v}
        />
        </div>
        </div>

    )
}