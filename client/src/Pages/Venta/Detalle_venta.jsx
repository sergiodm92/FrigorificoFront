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
import { deleteVentaById, getClienteByName, getPagosVentaByID, getVentaByID, putCuartoRes, putSaldoCliente, putStockResTrue } from "../../Redux/Actions/Actions"


export default function Detalle_Venta(){

const dispatch = useDispatch()
const {id}=useParams()
const Navigate = useNavigate()

useEffect(() => {
    dispatch(getVentaByID(id))
}, [dispatch])

let venta = useSelector((state)=>state.VentaByID)

useEffect(() => {
    if(venta)dispatch(getClienteByName(venta.cliente))
    if(venta)dispatch(getPagosVentaByID(venta.id))
}, [venta])

let cliente = useSelector((state)=>state.clienteByNombre)
let pagos = useSelector((state)=>state.pagosByVentaID)


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
                try{
                    dispatch(deleteVentaById(id))
                    venta.detalle.map(a=>{
                        if(a.total_media=="total"){
                            setTimeout(()=>{
                                dispatch(putStockResTrue(a.correlativo))
                            }, 1000)}
                        if(a.total_media!=="total"){
                            setTimeout(()=>{
                                let correlativo = a.correlativo.substring(0,a.correlativo.length)// elimina la ultima letra
                                let id= a.id
                                let kg= a.kg_total
                                dispatch(putCuartoRes(id, kg, correlativo))
                            }, 1000)
                        }
                    })
                    let saldo= cliente.saldo - venta.saldo
                    dispatch(putSaldoCliente(cliente.id, saldo))
                    swal("Se eliminó la venta", {
                        icon: "success",
                    })
                    Navigate('/Ventas')
                }
                catch{
                    swal(" no se pudo eliminar la venta");
                }}
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
                title={"Detalle de la Venta"}
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
                <LargeButton
                    title="Detalle de Reses"
                    onClick={()=>Navigate(`/Ventas/${id}/DetalleReses`)}
                />
            </div>
        </div>

    )
}