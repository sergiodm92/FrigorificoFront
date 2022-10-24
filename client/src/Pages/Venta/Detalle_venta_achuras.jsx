import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import swal from "sweetalert"
import NavBar from "../../Components/Navbar/Navbar"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import TableVenta from "../../Components/Details/Detalle_Venta"
import StyleDetalleVenta from './StyleDetalleVenta.module.scss'
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import { deleteVentaAchurasById, getClienteByName, getPagosVentaAchurasByID, getVentaAchurasByID, putSaldoCliente } from "../../Redux/Actions/Actions"


export default function Detalle_Venta_Achuras(){

    const dispatch = useDispatch()
    const {id}=useParams()
    const Navigate = useNavigate()

    useEffect(() => {
        dispatch(getVentaAchurasByID(id))
    }, [dispatch])
    let venta = useSelector((state)=>state.VentaAchuraByID)

useEffect(() => {
    if(venta){
        dispatch(getClienteByName(venta.clien))
        dispatch(getPagosVentaAchurasByID(venta.id))
    }
}, [venta])

let cliente = useSelector((state)=>state.clienteByNombre)
console.log(cliente)
let pagos = useSelector((state)=>state.pagosByVentaAchuraID)
console.log(pagos)

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
                    let saldo= cliente.saldo - venta.saldo
                    dispatch(putSaldoCliente(cliente.id, saldo))
                    dispatch(deleteVentaAchurasById(id))
                    swal("Se eliminó la venta", {
                        icon: "success",
                    })
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
                <div className={StyleDetalleVenta.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteVenta}
                    />
                </div>
                <div className={StyleDetalleVenta.TableVenta}>
                    <TableVenta
                        venta={venta}
                        pagos={pagos}
                    />        
                </div>
            </div>
        </div>

    )
}
 // pagosByVentaID = {pagosByVentaID}