import React, { useEffect } from "react"
import TableDetRes from "../../Components/Details/Detalle_Reses_Venta"
import StyleDetalleVenta from './StyleDetalleVenta.module.scss'
import { useNavigate, useParams } from "react-router"
import NavBar from "../../Components/Navbar/Navbar"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import { useDispatch, useSelector } from "react-redux"
import { getVentaByID } from "../../Redux/Actions/Actions"



export default function Detalle_Reses_Venta() {
    const dispatch = useDispatch()
const {id}=useParams()
const Navigate = useNavigate()

useEffect(() => {
    dispatch(getVentaByID(id))
}, [dispatch])

const venta = useSelector((state)=>state.VentaByID)
    


    return(
        <div className={StyleDetalleVenta.ConteinerVenta}>
            <NavBar
                title={"Detalle"}
            />
            <div className={StyleDetalleVenta.page}>
                <div>
                    <TableDetRes
                    venta={venta}
                    />
                </div>
            </div>
            
        </div>

    )
}