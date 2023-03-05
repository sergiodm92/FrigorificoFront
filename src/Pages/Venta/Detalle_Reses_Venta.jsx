import React, { useEffect } from "react"
import TableDetRes from "../../Components/Details/Detalle_Reses_Venta"
import style from './Ventas.module.scss'
import { useNavigate, useParams } from "react-router"
import NavBar from "../../Components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { getVentaByID } from "../../Redux/Actions/Actions"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"

export default function Detalle_Reses_Venta() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const {id}=useParams()

    useEffect(() => {
        dispatch(getVentaByID(id))
    }, [dispatch])

    const venta = useSelector((state)=>state.VentaByID)

    return(
        <div className={style.ConteinerVenta}>
            <NavBar
                title={"Detalle de Reses(Venta)"}
            />
            <div className={style.page}>
                <div>
                    <TableDetRes
                    venta={venta}
                    />
                </div>
            </div>
            <LargeButton
                    title="Generar PDF"
                    onClick={()=>Navigate(`/Ventas/DetalleReses/pdf/${id}`)}
                />
        </div>

    )
}