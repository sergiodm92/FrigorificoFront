import React from "react"
import TableDetRes from "../../Components/Details/Detalle_Reses_Venta"
import StyleDetalleVenta from './StyleDetalleVenta.module.scss'


export default function Detalle_Reses_Venta({
	match: {
	params: {id_v},
	},
}) 

{

    return(
        <div className={StyleDetalleVenta.ConteinerVenta}>
            <TableDetRes
            id_v={id_v}
            />

        </div>

    )
}