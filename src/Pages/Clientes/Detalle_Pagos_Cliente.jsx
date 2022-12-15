import React, { useEffect} from "react"
import { useNavigate, useParams } from "react-router"
import NavBar from "../../Components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { deletePagoVentaAchurasById, deletePagoVentaById, getPagosVentaAchurasByCliente, getPagosVentasByCliente, getVentasAchurasByCliente, getVentasByCliente, putSaldoVenta, putSaldoVentaAchuras, setDeletePagos, setDeletePagosAchuras } from "../../Redux/Actions/Actions"
import style from "./Clientes.module.scss";
import swal from "sweetalert"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Detalle_Pagos_Clientes() {
    
    const dispatch = useDispatch()
    const {nombre}=useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPagosVentasByCliente(nombre))
        dispatch(getPagosVentaAchurasByCliente(nombre))
        dispatch(getVentasByCliente(nombre))
        dispatch(getVentasAchurasByCliente(nombre))
    }, [dispatch])

    const pagos = useSelector((state)=>state.pagosByCliente)
    const pagosAchuras = useSelector((state)=>state.pagosAchurasByCliente)
    const ventas = useSelector((state)=>state.AllVentasByCliente)
    const ventasAc = useSelector((state)=>state.AllVentasAchurasByCliente)
    const deletePagoVenta = useSelector ((state)=>state.deletePagoVenta)
    const deletePagoVentaAchuras = useSelector ((state)=>state.deletePagoVentaAchuras)

    useEffect(() => {
        dispatch(getVentasByCliente(nombre))
        dispatch(getPagosVentasByCliente(nombre))
        dispatch(setDeletePagos())
    }, [deletePagoVenta])
    
    useEffect(() => {
        dispatch(getVentasAchurasByCliente(nombre))
        dispatch(getPagosVentaAchurasByCliente(nombre))
        dispatch(setDeletePagosAchuras())
    }, [deletePagoVentaAchuras])

    let pagosT=[ ...pagos, ...pagosAchuras]
    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
    }
    let monto

    const deletePago = (id, ventaID, monto, cliente)=>{
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
                    
                        if(cliente){
                            let venta = ventas.find(a=>a.id==ventaID)
                            let saldo2= venta.saldo*1 + monto*1
                            dispatch(putSaldoVenta(ventaID, saldo2))
                            .then( (response) => {
                                if(response) dispatch(deletePagoVentaById(id))
                            })                                                      
                        }
                        else{
                            let venta = ventasAc.find(a=>a.id==ventaID)
                            let saldo2= venta.saldo*1 + monto*1
                            dispatch(putSaldoVentaAchuras(ventaID, saldo2))
                            .then( (response) => {
                                if(response) dispatch(deletePagoVentaAchurasById(id))
                            })                                              
                        }
                        swal("Se eliminó el pago", {
                            icon: "success",
                        })
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
        <div className={style.conteinerAll}>
            <NavBar
                title={`Pagos de ${nombre}`}
            />
            {pagosT[0]=="sin datos"?
            <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                <CircularProgress />
            </Box>
            : pagosT.length>0?
            <div>
                <div className={style.tablefaena}>
                    <table className="table">
                        <tbody>
                            <tr className="table-dark" align="center">
                                <td>ID</td>
                                <td>ID-V</td>  
                                <td>Fecha</td>  
                                <td>Forma de Pago</td>
                                <td>Monto</td>                            
                                <td>Comp</td>
                                <td>Recibo</td>
                                <td>Elim</td>
                            </tr>
                            {pagosT.map((e,i) => {
                                return(
                                    <tr key={i} className={"table-primary"} align="center"> 
                                        <td >{e.id}</td> 
                                        <td >{e.cliente?e.ventaID+"-V":e.ventaID+"-VAch"}</td> 
                                        <td>{(new Date(e.fecha*1)).toLocaleDateString('es').replaceAll("/", "-")}</td> 
                                        <td>{e.formaDePago}</td>
                                        <td>{
                                            monto = currencyFormatter({
                                            currency: "USD",
                                            value : e.monto
                                            })
                                        }</td>
                                        <td >{e.img_comp?<a href={e.img_comp}>Link</a>:<p>-</p>}</td>
                                        <td >{e.cliente?<a href={`/Clientes/DetallePagos/pdf/${nombre}/${e.id}`}>PDF</a>:<a href={`/Clientes/DetallePagosAchuras/pdf/${nombre}/${e.id}`}>PDF</a>}</td>
                                        <td>
                                        <ButtonNew
                                            style={"delete"}
                                            icon={"delete"}
                                            onClick={() => {deletePago(e.id, e.ventaID, e.monto, e.cliente?e.cliente:false)}}
                                        /></td>                                    
                                    </tr>
                                )
                            })} 
                        </tbody>
                    </table>
                </div>
                <div className={style.buttonLarge}>
                    <LargeButton
                        title={"Generar PDF todos los pagos"}
                        onClick={()=>navigate(`/Clientes/DetallePagos/pdf/${nombre}`)}
                    ></LargeButton>
                </div>
                <div className={style.buttonLarge}>
                    <LargeButton
                        title={"PDF personalizado"}
                        onClick={()=>navigate(`/Clientes/DetallePagos/PersonalizarDetalle/${nombre}`)}
                    ></LargeButton>
                </div>
            </div>
            :<div><h4 className={style.text}>No existen pagos de éste Cliente</h4></div>}           
        </div>            
    )
}