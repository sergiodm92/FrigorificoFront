import React from "react"
import swal from "sweetalert"
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
    swal({
        title: "Está seguro que desea eliminar la venta?",
        text: "Una vez eliminada perdera todos sus datos 😰",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            swal('Escriba "eliminar venta" para confirmar:', {
                content: "input",
                })
                .then((value) => {
                if(value==="eliminar venta"){
                    swal("Se eliminó la venta", {
                        icon: "success",
                    })
                    dispatch(deleteVentaById(id))
                    Navigate('/Ventas')
                }
                else {
                    swal("Frase incorrecta, no se eliminó la venta");
                }
            });
        } else {
            swal("No se eliminó la venta");
            }
    })
  
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