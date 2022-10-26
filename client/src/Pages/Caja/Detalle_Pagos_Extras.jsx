import React, { useEffect } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { deletePagoExtra, getAllPagosExtras} from "../../Redux/Actions/Actions"
import style from './caja.module.scss'
import swal from "sweetalert"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import moment from "moment"

export default function Detalle_Pagos_Extras() {
    
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPagosExtras())
    }, [dispatch])

    const pagos = useSelector((state)=>state.allPagosExtras)

    
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
    }
    let monto

    const deletePago = (id)=>{
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
                        dispatch(deletePagoExtra(id))
                        swal("Se eliminó el pago", {
                            icon: "success",
                        })
                        dispatch(getAllPagosExtras())
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
                title={`Detalle de Extracciones`}
            />
            <div className={style.tablefaena}>
                <table className="table">
                    <tbody>
                        <tr className="table-dark">
                            <td>Fecha</td>
                            <td>Concepto</td>  
                            <td>Forma de Pago</td>
                            <td>Monto</td>
                            <td>Eliminar</td>
                        </tr>
                        {pagos.map((e,i) => {
                            return(
                                <tr key={i} className={"table-primary"}>
                                    <td>{e.fecha}</td>
                                    <td>{e.concepto}</td>
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
                                        onClick={() => {deletePago(e.id)}}
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