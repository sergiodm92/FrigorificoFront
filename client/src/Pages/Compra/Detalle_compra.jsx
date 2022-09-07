import React from "react"
import NavBar from "../../Components/Navbar/Navbar"
import { useParams } from "react-router"
import TableCompra from "../../Components/Details/Detalle_Compra"
import StyleDetalleCompra from './StyleDetalleCompras.module.scss'

export default function Detalle_Compra(){
const {id}=useParams()

    return(
        <div className={StyleDetalleCompra.ConteinerCompras}>
        <NavBar
        title={"Detalle"}
        />
        <div className={StyleDetalleCompra.TableCompras}>
        <TableCompra
        id_c={id}
        />
        </div>
        </div>

    )
}
// 