import React, { useEffect } from "react"
import { useParams } from "react-router"
import NavBar from "../../Components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { deletePagoCompraById, getAllComrpasByProveedor, getPagosComprasByProveedor, getProveedorByName, putSaldoCompra} from "../../Redux/Actions/Actions"
import style from './Detalle_Pagos.module.scss'
import swal from "sweetalert"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"

export default function Detalle_Pagos_Proveedor() {
    
    const dispatch = useDispatch()
    const {nombre}=useParams()

    useEffect(() => {
        dispatch(getPagosComprasByProveedor(nombre))
        dispatch(getProveedorByName(nombre))
        dispatch(getAllComrpasByProveedor(nombre))
    }, [dispatch])

    const pagos = useSelector((state)=>state.pagosByProveedor)
    const proveedor = useSelector((state)=>state.provByNombre)
    const compras = useSelector((state)=>state.AllComprasByProveedor)
    
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
    }
    let monto

    const deletePago = (id, compraID, monto)=>{
        swal({
            title: "¿Está seguro que desea eliminar el pago?",
            text: "Una vez eliminada perdera todos sus datos 😰",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                swal('Escriba "eliminar pago" para confirmar:', {
                    content: "input",
                    })
                    .then((value) => {
                    if(value==="eliminar pago"){
                        swal("Se eliminó el pago", {
                            icon: "success",
                        })
                        let compra = compras.find(a=>a.id==compraID)
                        let saldo= compra.saldo + monto
                        dispatch(putSaldoCompra(compraID, saldo))
                        dispatch(deletePagoCompraById(id))
                    }
                    else {
                        swal("Frase incorrecta, no se eliminó la faena");
                    }
                });
            } else {
                swal("No se eliminó la faena");
                }
        })
        
    }

    return(
        <div className={style.conteiner}>
            <NavBar
                title={`Pagos de ${nombre}`}
            />
            <div className={style.tablefaena}>
                <table class="table">
                    <tbody>
                        <tr class="table-dark">
                            <td>Fecha</td>  
                            <td>Forma de Pago</td>
                            <td>Monto</td>
                            <td>Eliminar</td>
                        </tr>
                        {pagos.map((e,i) => {
                            return(
                                <tr key={i} class={"table-primary"}> 
                                    <td>{e.fecha}</td> 
                                    <td>{e.formaDePago}</td>
                                    <td align="center">{
                                        monto = currencyFormatter({
                                        currency: "USD",
                                        value : e.monto
                                        })
                                    }</td>
                                    <td>
                                    <ButtonNew
                                        style={"delete"}
                                        icon={"delete"}
                                        onClick={() => {deletePago(e.id, e.compraID, e.monto)}}
                                    /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>            
        </div>
    )
}