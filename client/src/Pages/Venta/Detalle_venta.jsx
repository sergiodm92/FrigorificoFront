import React from "react"
import NavBar from "../../Components/Navbar/Navbar"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import TableVenta from "../../Components/Details/Detalle_Venta"
import StyleDetalleVenta from './StyleDetalleVenta.module.scss'
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import { deleteVentaById } from "../../Redux/Actions/Actions"
import { useDispatch } from "react-redux"

export default function Detalle_Venta(){

    const dispatch = useDispatch()
const {id}=useParams()
const Navigate = useNavigate()

const deleteVenta = ()=>{
    dispatch(deleteVentaById(id))
    Navigate('/Ventas')
}

    return(
        <div className={StyleDetalleVenta.ConteinerVenta}>
            <NavBar
                title={"Detalle"}
            />
            <div className={StyleDetalleVenta.page}>
                <div className={StyleDetalleVenta.buttonEdit}>
                    <ButtonNew
                        style={"edit"}
                        icon={"edit"}
                        onClick={()=>Navigate(`/Faenas`)}
                    />
                </div>
                <div className={StyleDetalleVenta.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteVenta}
                    />
                </div>
                <div className={StyleDetalleVenta.TableVenta}>
                    <TableVenta
                        id_v={id}
                    />        
                </div>
                <LargeButton
                    title="Detalle de Reses"
                    onClick={()=>Navigate(`/Detalle_Reses_Venta/${id}`)}
                />
            </div>
        </div>

    )
}