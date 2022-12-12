import React, { useEffect} from "react";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteClienteById, getAllClientes, getClienteByID, getVentasAchurasByCliente, getVentasByCliente } from "../../Redux/Actions/Actions";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import Table_Cliente from "../../Components/Details/Table_Cliente";
import style from "./Clientes.module.scss";

export default function Detalle_Cliente(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id}=useParams()

    useEffect(() => {
        dispatch(getClienteByID(id))
    }, [dispatch])

    const ClienteById = useSelector((state)=>(state.ClienteById))

    useEffect(() => {
        if(ClienteById)dispatch(getVentasByCliente(ClienteById.nombre))
        if(ClienteById)dispatch(getVentasAchurasByCliente(ClienteById.nombre))
    }, [ClienteById])

    let AllVentasByCliente = useSelector((state)=>state.AllVentasByCliente)
    let VentasPendientes = AllVentasByCliente.filter((a)=>a.cliente===ClienteById.nombre && a.saldo>0)
    let AllVentasAchurasByCliente = useSelector((state)=>state.AllVentasAchurasByCliente)
    let VentasAchurasPendientes = AllVentasAchurasByCliente.filter((a)=>a.clien===ClienteById.nombre && a.saldo>0)

    const deleteCliente = ()=>{
        if(AllVentasByCliente.length>0 && AllVentasAchurasByCliente.length>0){
            swal({
                title: "¡Error! No puede eliminar clientes con ventas",
                text: "Primero debe eliminar las ventas de su cliente ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
        }
        else swal({
            title: "Está seguro que desea eliminar a "+ ClienteById.nombre,
            text: "Una vez eliminado perdera todos sus datos 😰",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                swal('Escriba "eliminar cliente" para confirmar:', {
                    content: "input",
                    })
                    .then((value) => {
                    if(value==="eliminar cliente"){
                        swal("Se eliminó a "+ ClienteById.nombre, {
                            icon: "success",
                        })
                    dispatch(deleteClienteById(id))
                    dispatch(getAllClientes())
                    navigate('/Clientes')
                    }
                    else {
                        swal("Frase incorrecta, no se eliminó a "+ ClienteById.nombre);
                    }
                });
            } else {
                swal("No se eliminó a "+ ClienteById.nombre);
                }
        })
    }

    return(
        <div className={style.conteinerAll}>
            <NavBar
                title={"Detalle del Cliente"}
            />
            <div className={style.page}>
                <div className={style.buttonEdit}>
                    <ButtonNew
                        style={"edit"}
                        icon={"edit"}
                        onClick={()=>navigate(`/Clientes/Form/${id}`)}
                    />
                </div>
                <div className={style.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteCliente}
                    />
                </div>
                <div className={style.tablecliente}>
                <Table_Cliente
                email={ClienteById.email}
                nombre={ClienteById.nombre}
                telefono={ClienteById.telefono}
                direccion={ClienteById.direccion}
                cuil={ClienteById.cuil}
                />
                </div>
                
                <div className={style.cont}>
                    {VentasPendientes.length>0?
                    <div>
                        <div className={style.contTitle}><h1 className={style.titleP}>Ventas de Carne con Saldo pendiente</h1></div>
                        <div className={style.title}>
                            <div><b>ID</b></div>
                            <div><b>|</b></div>
                            <div><b>Fecha</b></div>
                            <div><b>|</b></div>
                            <div><b>Cliente</b></div>
                            <div><b>|</b></div>
                            <div><b>Cant</b></div>
                            <div><b>|</b></div>
                            <div><b>kg</b></div>
                            <div><b>|</b></div>
                            <div><b>Saldo($)</b></div>
                        </div>
                        <div className={style.cardsCont}>
                            {VentasPendientes.map((a,i)=>{
                                return(
                                    <CardLarge
                                        id={a.id}
                                        key={i}
                                        fecha={a.fecha}
                                        para={a.cliente}
                                        cant={a.cant}
                                        kg={a.kg}
                                        total={a.saldo.toFixed(2)}
                                        tipo={"Ventas"}
                                        pago={true}
                                        bstyle={"new"}
                                        bicon={"new"}
                                        bonClick={()=>navigate(`/Clientes/FormPagoVC/${a.id}`)}
                                    />
                                )
                            })
                            }
                        </div>
                    </div>
                    :null}
                    {VentasAchurasPendientes.length>0?
                    <div>
                        <div className={style.contTitle}><h1 className={style.titleP}>Ventas de Achuras con Saldo pendiente</h1></div>
                        <div className={style.title}>
                            <div><b>ID</b></div>
                            <div><b>|</b></div>
                            <div><b>Fecha</b></div>
                            <div><b>|</b></div>
                            <div><b>Cliente</b></div>
                            <div><b>|</b></div>
                            <div><b>Cant</b></div>
                            <div><b>|</b></div>
                            <div><b>kg</b></div>
                            <div><b>|</b></div>
                            <div><b>Saldo($)</b></div>
                        </div>
                        <div className={style.cardsCont}>
                            {VentasAchurasPendientes.map((a,i)=>{
                                return(
                                    <CardLarge
                                        id={a.id}
                                        key={i}
                                        fecha={a.fecha}
                                        para={a.clien}
                                        cant={a.cantidad}
                                        kg={"achuras"}
                                        total={a.saldo.toFixed(2)}
                                        tipo={"Ventas/Achuras"}
                                        pago={true}
                                        bstyle={"new"}
                                        bicon={"new"}
                                        bonClick={()=>navigate(`/Clientes/FormPagoVAch/${a.id}`)}
                                    />
                                )
                            })
                            }
                        </div>
                    </div>
                    :null}
                    <div className={style.buttonLarge}>
                        <LargeButton
                            title={"Historial de Ventas"}
                            onClick={()=>navigate(`/Clientes/HistorialVentas/${id}`)}
                        ></LargeButton>
                    </div>
                    <div className={style.buttonLarge}>
                        <LargeButton
                            title={"Detalle de Pagos"}
                            onClick={()=>navigate(`/Clientes/DetallePagos/${ClienteById.nombre}`)}
                        ></LargeButton>
                    </div>
                </div>
            </div>
        </div>
    )
}