import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import NavBar from "../../Components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { deletePagoCompraById, getAllComrpasByProveedor, getPagosComprasByProveedor, getProveedorByName, putSaldoCompra} from "../../Redux/Actions/Actions"
import style from './Detalle_Pagos.module.scss'
import swal from "sweetalert"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"

export default function Detalle_Pagos_Proveedor() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {nombre}=useParams()

    useEffect(() => {
        dispatch(getPagosComprasByProveedor(nombre))
        dispatch(getAllComrpasByProveedor(nombre))
    }, [dispatch])

    const pagos = useSelector((state)=>state.pagosByProveedor)
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

    const deletePago = (id, compraID, Monto)=>{
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
                        let compra = compras.find(a=>a.id==compraID)
                        let saldo= compra.saldo + Monto
                        dispatch(putSaldoCompra(compraID, saldo))
                        dispatch(deletePagoCompraById(id))
                        dispatch(getPagosComprasByProveedor(nombre))
                        swal("Se eliminó el pago", {
                            icon: "success",
                        })
                        dispatch(getAllComrpasByProveedor(nombre))
                        dispatch(getPagosComprasByProveedor(nombre))
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
            {pagos.length>0?
            <div>
                <div className={style.tablefaena}>
                    <table className="table">
                        <tbody>
                            <tr className="table-dark" align="center">
                                <td>ID</td> 
                                <td>ID-C</td> 
                                <td>Fecha</td>  
                                <td>Forma de Pago</td>
                                <td>Monto</td>
                                <td>Comp</td>
                                <td>Recibo</td>
                                <td>Elim</td>
                            </tr>
                            {pagos.length!==0? pagos.map((e,i) => {
                                return(
                                    <tr key={i} className={"table-primary"} align="center">
                                        <td>{e.id}</td>
                                        <td>{e.compraID}</td>  
                                        <td>{(new Date(e.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")}</td> 
                                        <td>{e.formaDePago}</td>
                                        <td align="center">{
                                            monto = currencyFormatter({
                                            currency: "USD",
                                            value : e.monto
                                            })
                                        }</td>
                                        <td ><a href={e.img_comp}>Link</a></td>
                                        <td ><a href={`/Proveedores/DetallePagos/${nombre}/${e.id}/pdf`}>PDF</a></td>
                                        <td>
                                        <ButtonNew
                                            style={"delete"}
                                            icon={"delete"}
                                            onClick={() => {deletePago(e.id, e.compraID, e.monto)}}
                                        /></td>                                    
                                    </tr>
                                )
                            }):null}
                        </tbody>
                    </table>
                </div>
                <div className={style.buttonLarge}>
                    <LargeButton
                        title={"Generar PDF"}
                        onClick={()=>navigate(`/Proveedores/DetallePagos/${nombre}/pdf`)}
                    ></LargeButton>
                </div>  
            </div>
            :<div><h4 className={style.text}>No existen pagos a éste Proveedor</h4></div>}          
        </div>
    )
}