import React from "react"
import NavBar from "../../Components/Navbar/Navbar"
import TableCompra from "../../Components/Details/Detalle_Compra"
import StyleDetalleCompra from './StyleDetalleCompras.module.scss'

export default function Detalle_Compra(){
    
    return(
        <div className={StyleDetalleCompra.ConteinerCompras}>
        <NavBar
        title={"Detalle"}
        />
        <div className={StyleDetalleCompra.TableCompras}>
        <TableCompra></TableCompra>
        </div>
        </div>

    )
}