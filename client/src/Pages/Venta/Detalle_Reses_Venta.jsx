import React from "react"
import TableDetRes from "../../Components/Details/Detalle_Reses_Venta"
import StyleDetalleVenta from './StyleDetalleVenta.module.scss'
import { useNavigate, useParams } from "react-router"
import NavBar from "../../Components/Navbar/Navbar"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"

export default function Detalle_Reses_Venta() {
    
    const {id}=useParams()
    const Navigate = useNavigate()

    return(
        <div className={StyleDetalleVenta.ConteinerVenta}>
            <NavBar
                title={"Detalle"}
            />
            <div className={StyleDetalleVenta.page}>
                <div className={StyleDetalleVenta.buttonEdith}>
                    <ButtonNew
                        style={"edith"}
                        icon={"edith"}
                        onClick={()=>Navigate(`/Faenas`)}
                    />
                </div>
                <div>
                    <TableDetRes
                    id_v={id}
                    />
                </div>
            </div>
            
        </div>

    )
}