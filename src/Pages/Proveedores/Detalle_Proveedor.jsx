import React, { useEffect } from "react";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import stylePr from "./Proveedores.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import Table_Proveedor from "../../Components/Details/Table_Proveedor";
import { deleteProveedorById, getAllComrpas, getAllComrpasByProveedor, getAllProveedores, getPagosComprasByProveedor, getProveedorByID } from "../../Redux/Actions/Actions";

export default function Detalle_Proveedor(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(() => {
        dispatch(getProveedorByID(id))
    }, [dispatch])
    
    const ProveedorById = useSelector((state)=>(state.ProveedorById))
    
    useEffect(() => {
        dispatch(getAllComrpasByProveedor(ProveedorById.nombre))
    }, [ProveedorById])
    
    const AllComprasByProveedor = useSelector((state)=>state.AllComprasByProveedor)
    const ComprasPendientes = AllComprasByProveedor.filter((a)=>a.saldo>0)
    
    
    

    const deleteProveedor = ()=>{
        if(AllComprasByProveedor.length>0){
            swal({
                title: "¡Error! No puede eliminar proveedores con compras",
                text: "Primero debe eliminar las compras de su proveedor",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
        }
        else swal({
            title: "Está seguro que desea eliminar a "+ ProveedorById.nombre,
            text: "Una vez eliminado perdera todos sus datos 😰",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                swal('Escriba "eliminar proveedor" para confirmar:', {
                    content: "input",
                    })
                    .then((value) => {
                    if(value==="eliminar proveedor"){
                        swal("Se eliminó a "+ ProveedorById.nombre, {
                            icon: "success",
                        })
                    dispatch(deleteProveedorById(id))
                    dispatch(getAllProveedores())
                    navigate('/Proveedores')

                    }
                    else {
                        swal("Frase incorrecta, no se eliminó a "+ ProveedorById.nombre);
                    }
                });
            } else {
                swal("No se eliminó a "+ ProveedorById.nombre);
                }
        })
    }

    return(
        <div className={stylePr.ConteinerProveedores}>
            <NavBar
                title={"Detalle del Proveedor"}
            />
            <div className={stylePr.page}>
                <div className={stylePr.buttonEdit}>
                    <ButtonNew
                        style={"edit"}
                        icon={"edit"}
                        onClick={()=>navigate(`/Proveedores/Form/${id}`)}
                    />
                </div>
                <div className={stylePr.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteProveedor}
                    />
                </div>
                <div className={stylePr.tableproveedor}>
                <Table_Proveedor
                ProveedorById={ProveedorById}
                />
                </div>
                <div className={stylePr.cont}>
                    <div className={stylePr.contTitle}><h1 className={stylePr.titleP}>Compras con Saldo pendiente</h1></div>
                    <div className={stylePr.title}>
                        <div><b>ID</b></div>
                        <div><b>|</b></div>
                        <div><b>Fecha</b></div>
                        <div><b>|</b></div>
                        <div><b>Proveedor</b></div>
                        <div><b>|</b></div>
                        <div><b>Cant</b></div>
                        <div><b>|</b></div>
                        <div><b>kg</b></div>
                        <div><b>|</b></div>
                        <div><b>Saldo($)</b></div>
                    </div>
                    <div className={stylePr.cardsCont}>
                        {ComprasPendientes.map((a)=>{
                            return(
                                <CardLarge
                                    key={a.id}
                                    id={a.id}
                                    fecha={a.fecha}
                                    para={a.proveedor.length>12?a.proveedor.slice(0,12):a.proveedor}
                                    cant={a.cant_total}
                                    kg={a.kg_carne_totales}
                                    monto={a.saldo.toFixed(2)}
                                    tipo={"Compras"}
                                    pago={true}
                                    bstyle={"new"}
                                    bicon={"new"}
                                    bonClick={()=>navigate(`/Proveedores/FormPago/${a.id}`)}
                                />
                            )
                        })
                        }
                    </div>
                    <div className={stylePr.buttonLarge}>
                        <LargeButton
                            title={"Historial de Compras"}
                            onClick={()=>navigate(`/Proveedores/HistorialCompras/${ProveedorById.nombre}`)}
                        ></LargeButton>
                    </div>
                    <div className={stylePr.buttonLarge}>
                        <LargeButton
                            title={"Detalle de Pagos"}
                            onClick={()=>navigate(`/Proveedores/DetallePagos/${ProveedorById.nombre}`)}
                        ></LargeButton>
                    </div>
                </div>
            </div>
        </div>
    )
}