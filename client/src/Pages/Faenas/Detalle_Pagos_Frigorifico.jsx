import React, { useEffect } from "react"
import { useParams } from "react-router"
import NavBar from "../../Components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { deletePagoFaenaById, getAllFaenas, getPagosFaenasByFrigorifico, putSaldoFaena } from "../../Redux/Actions/Actions"
import style from './Detalle_Pagos.module.scss'
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import swal from "sweetalert"

export default function Detalle_Pagos_Frigorifico() {
    
    const dispatch = useDispatch()
    const {nombre}=useParams()

    useEffect(() => {
        dispatch(getPagosFaenasByFrigorifico(nombre))
        dispatch(getAllFaenas())
    }, [dispatch])

    const pagos = useSelector((state)=>state.pagosByFrigorifico)
    const faenas = useSelector((state)=>state.AllFaenas)
    
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
    }
    let monto
    let faena = {}

    const deletePago = (id, faenaID, monto)=>{
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
                        let faena = faenas?.find(a=>a.id==faenaID)
                        let saldo = faena.saldo + monto
                        dispatch(putSaldoFaena(faenaID, saldo))
                        dispatch(deletePagoFaenaById(id))
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
                <table className="table">
                    <tbody>
                        <tr className="table-dark">
                            <td>Tropa</td>
                            <td>Fecha</td>  
                            <td>Forma de Pago</td>
                            <td>Monto</td>
                            <td>Eliminar</td>
                        </tr>
                        {pagos.length!==0 && faenas.length!==0?pagos.map((e,i) => {
                            faena=faenas.find(a=>a.id==e.faenaID)
                            return(
                                <tr key={i} className="table-primary">
                                    <td>{faena.tropa}</td> 
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
                                        onClick={() => {deletePago(e.id, e.faenaID, e.monto)}}
                                    /></td>
                                </tr>
                            )
                        }):null} 
                    </tbody>
                </table>
            </div>            
        </div>
    )
}