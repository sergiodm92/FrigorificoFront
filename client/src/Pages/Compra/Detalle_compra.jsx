import React, { useEffect } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import { useParams, useNavigate } from "react-router"
import TableCompra from "../../Components/Details/Detalle_Compra"
import StyleDetalleCompra from './StyleDetalleCompras.module.scss'
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import { useDispatch, useSelector } from "react-redux"
import { deleteCompraById, getAllComrpas } from "../../Redux/Actions/Actions"

export default function Detalle_Compra(){

    const dispatch = useDispatch()
    const {id}=useParams()
    const navigate = useNavigate()

    const deleteCompra = ()=>{
        dispatch(deleteCompraById(id))
        navigate('/Compras')
    }

    return(
        <div className={StyleDetalleCompra.ConteinerCompras}>
            <NavBar
                title={"Detalle"}
            />
            <div className={StyleDetalleCompra.page}>
                <div className={StyleDetalleCompra.buttonEdit}>
                    <ButtonNew
                        style={"edit"}
                        icon={"edit"}
                        onClick={()=>navigate(`/Compras`)}
                    />
                </div>
                <div className={StyleDetalleCompra.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteCompra}
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