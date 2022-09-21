import React from "react"
import NavBar from "../../Components/Navbar/Navbar"
import { useParams, useNavigate } from "react-router"
import TableCompra from "../../Components/Details/Detalle_Compra"
import StyleDetalleCompra from './StyleDetalleCompras.module.scss'
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"

export default function Detalle_Compra(){

    const {id}=useParams()
    const navigate = useNavigate()

    return(
        <div className={StyleDetalleCompra.ConteinerCompras}>
            <NavBar
                title={"Detalle"}
            />
            <div className={StyleDetalleCompra.page}>
                <div className={StyleDetalleCompra.buttonEdith}>
                    <ButtonNew
                        style={"edith"}
                        icon={"edith"}
                        onClick={()=>navigate(`/Faenas`)}
                    />
                </div>
                <div className={StyleDetalleCompra.TableCompras}>
                    <TableCompra
                        id_c={id}
                    />
                </div>
            </div>
        </div>

    )
}
// 