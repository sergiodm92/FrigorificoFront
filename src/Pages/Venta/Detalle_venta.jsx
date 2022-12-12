import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import swal from "sweetalert"
import NavBar from "../../Components/Navbar/Navbar"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import TableVenta from "../../Components/Details/Detalle_Venta"
import style from './Ventas.module.scss'
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew"
import { deleteVentaById, getAllFaenas, getClienteByName, getPagosVentaByID, getVentaByID, putStockReses } from "../../Redux/Actions/Actions"


export default function Detalle_Venta(){

const dispatch = useDispatch()
const {id}=useParams()
const Navigate = useNavigate()

useEffect(() => {
    dispatch(getVentaByID(id))
    dispatch(getAllFaenas())
}, [id])

let venta = useSelector((state)=>state.VentaByID)
let AllFaenas = useSelector((state)=>state.AllFaenas)

useEffect(() => {
    if(venta)dispatch(getClienteByName(venta.cliente))
    if(venta)dispatch(getPagosVentaByID(venta.id))
}, [venta])

let cliente = useSelector((state)=>state.clienteByNombre)
let pagos = useSelector((state)=>state.pagosByVentaID)

const deleteVenta = ()=>{
    if(pagos.length>0){
        swal({
            title: "¡Error! No puede eliminar ventas con pagos",
            text: "Primero debe eliminar los pagos de la venta. ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
    }
    else swal({
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
                    let detallesPut=[]
                    venta.detalle.map((a)=>{                            
                            AllFaenas.map((g)=>{
                                if(g.detalle.some((f)=>(f.correlativo==a.correlativo))){
                                    let current = {}
                                    g.detalle.map((f,i)=>{if(f.correlativo==a.correlativo)current={res:f, pos:i, tropa:g.tropa, detalle:g.detalle}})
                                    if(a.total_media=="total"){
                                        current.res.stock = true;
                                        current.res.ventaID = null
                                        current.detalle[current.pos]=current.res
                                        detallesPut.push({detalle:current.detalle, id:current.tropa})
                                    }
                                    if(a.total_media=="1/4D" || a.total_media=="1/4T"){
                                        if(current.res.stock===true){
                                            
                                            current.res.CuartoT= 0  
                                            current.res.CuartoD= 0  
                                            current.res.ventaID = null           
                                            detallesPut.push({detalle:current.detalle, id:current.tropa})
                                        }
                                        else{
                                            current.res.stock = true
                                            current.res.ventaID = null
                                            detallesPut.push({detalle:current.detalle, id:current.tropa})
                                        }
                                    }
                                }
                            })
                        })
                        console.log(detallesPut)
                        dispatch(putStockReses(detallesPut))
                                        
                    dispatch(deleteVentaById(id))
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
        <div className={style.ConteinerVenta}>
            <NavBar
                title={"Detalle de la Venta"}
            />
            <div className={style.page}>
                <div className={style.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteVenta}
                    />
                </div>
                <div className={style.TableVenta}>
                    <TableVenta
                        venta={venta}
                        pagos={pagos}
                    />        
                </div>
                <LargeButton
                    title="Detalle de Reses"
                    onClick={()=>Navigate(`/Ventas/DetalleReses/${id}`)}
                />
            </div>
        </div>

    )
}