import React, { useEffect } from "react";
import swal from "sweetalert";
import NavBar from "../../Components/Navbar/Navbar";
import { useParams, useNavigate } from "react-router";
import TableCompra from "../../Components/Details/TableCompra";
import style from "./Compras.module.scss";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompraById, getComrpaByID, getPagosComprasByID, putEstadoCompraFaena } from "../../Redux/Actions/Actions";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Detalle_Compra(){

    const dispatch = useDispatch()
    const {id}=useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getComrpaByID(id))
        dispatch(getPagosComprasByID(id))
    }, [dispatch])

    let compra = useSelector((state)=>state.CompraByID)
    let arrTropas=[]
    if(compra.grupos){
        var comision_total=0
        compra.grupos.map(a=>{
            arrTropas.push({id:a.n_tropa.toString(), estadoCompra:false, compraID:null})
            
            if(a.comision) comision_total+=a.comision
        })
    }
    let AllPagosbyCompra = useSelector((state)=>state.AllPagosbyCompra)
    
    

    const deleteCompra = ()=>{
        if(AllPagosbyCompra.length>0){
            swal({
                title: "¡Error! No puede eliminar compras con pagos",
                text: "Primero debe eliminar los pagos de la compra. ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
        }
        else swal({
            title: "Está seguro que desea eliminar la compra",
            text: "Una vez eliminada perdera todos sus datos 😰",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                swal('Escriba "eliminar compra" para confirmar:', {
                    content: "input",
                    })
                    .then((value) => {
                    if(value==="eliminar compra"){
                    dispatch(putEstadoCompraFaena(arrTropas))
                    dispatch(deleteCompraById(id))
                    swal("Se eliminó la compra", {
                        icon: "success",
                    })
                    navigate('/Compras')
                    }
                    else {
                        swal("Frase incorrecta, no se eliminó la compra");
                    }
                });
            } else {
                swal("No se eliminó la compra");
                }
        })
        
    }

    return(
        <div className={style.ConteinerCompras}>
            <NavBar
                title={"Detalle de la Compra"}
            />
            <div className={style.page}>
                <div className={style.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteCompra}
                    />
                </div>
                {compra.id==id?
                <div className={style.TableCompras}>
                    <TableCompra
                        compra={compra}
                        comision_total={comision_total}
                    />
                </div>
                :
                <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                    <CircularProgress />
                </Box>}
            </div>
            <LargeButton
                    title={"Detalle de Grupos"}
                    onClick={()=>navigate(`/Compras/DetalleGrupos/${id}`)}
                />
        </div>

    )
}
