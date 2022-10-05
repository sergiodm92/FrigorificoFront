import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import CardLarge from "../../Components/Cards/Card_Large/Card_Large";
import stylePr from "./Proveedores.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import Table_Proveedor from "../../Components/Details/Table_Proveedor";
import { deleteProveedorById, getAllComrpas, getProveedorByID } from "../../Redux/Actions/Actions";



export default function Detalle_Proveedor(){
    const dispatch = useDispatch()
    const ProveedorById = useSelector((state)=>(state.ProveedorById))
    const AllCompras = useSelector((state)=>(state.AllCompras))
    const {id}=useParams()
    const ComprasPendientes = AllCompras.filter((a)=>a.proveedor===ProveedorById.nombre && a.saldo>0)

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getProveedorByID(id))
        dispatch(getAllComrpas())
    }, [dispatch])

    const deleteProveedor = ()=>{
        dispatch(deleteProveedorById(id))
        navigate('/Proveedores')
    }

    return(
        <div className={stylePr.ConteinerProveedor}>
            <NavBar
                title={ProveedorById.nombre}
            />
            <div className={stylePr.page}>
                <div className={stylePr.buttonEdit}>
                    <ButtonNew
                        style={"edit"}
                        icon={"edit"}
                        onClick={()=>navigate(`/Faenas`)}
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
                    <div className={stylePr.contTitle}><h1 className={stylePr.titleP}>Pendientes</h1></div>
                    <div className={stylePr.title}>
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
                    <div className={stylePr.cardsCont}>
                        {ComprasPendientes.map((a)=>{
                            return(
                                <CardLarge
                                    id={a.ID_compra}
                                    fecha={a.fecha}
                                    para={a.proveedor}
                                    cant={a.cant}
                                    kg={a.kg_carne}
                                    monto={a.saldo}
                                    tipo={"Compras"}
                                    pago={true}
                                    bstyle={"new"}
                                    bicon={"new"}
                                    bonClick={()=>navigate(`/Form_Pago_Compra/${id}`)}
                                />
                            )
                        })
                        }
                    </div>
                    <div className={stylePr.buttonLarge}>
                        <LargeButton
                            title={"Historial de Compras"}
                            onClick={()=>navigate(`/Historial_Compras_Proveedor/${id}`)}
                        ></LargeButton>
                    </div>
                    <div className={stylePr.buttonLarge}>
                        <LargeButton
                            title={"Detalle de Pagos"}
                            onClick={()=>navigate(`/Detalle_Pagos_Proveedor/${id}`)}
                        ></LargeButton>
                    </div>
                </div>
            </div>
        </div>
    )
}