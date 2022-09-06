import React from "react"
import StyleCompras from './StyleCompras.module.scss'
import NavBar from "../../Components/Navbar/Navbar"
import TableCompra from "../../Components/Details/Detalle_Compra"

export default function Compras(){

    return(
        <div className={StyleCompras.ConteinerCompras}>
        <NavBar
        title={"Compras"}
        />
        <div className={StyleCompras.TableCompras}>
        <TableCompra></TableCompra>
        </div>
        </div>

    )
}