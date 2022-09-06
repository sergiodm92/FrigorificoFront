import React from "react"
import NavBar from "../../Components/Navbar/Navbar"
import TableCompra from "../../Components/Details/Detalle_Compra"
import StyleDetalleCompra from './StyleDetalleCompras.module.scss'

export default function Detalle_Compra(){//{id_compra}
const id_c=2
    return(
        <div className={StyleDetalleCompra.ConteinerCompras}>
        <NavBar
        title={"Detalle"}
        />
        <div className={StyleDetalleCompra.TableCompras}>
        <TableCompra
        id_c={id_c}
        />
        </div>
        </div>

    )
}