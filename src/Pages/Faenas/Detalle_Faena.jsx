import React, { useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/Navbar/Navbar"
import Table_Det_Faena from "../../Components/Details/Detalle_Faena";
import { useParams } from "react-router-dom";
import style from "./Faenas.module.scss";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import { deleteFaenaById, getFaenaById, getPagosFaenaByID } from "../../Redux/Actions/Actions";
import Tabla_Detalle_Faena from "../../Components/Details/Tabla_Detalle_Faena";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Detalle_Faena(){

    const dispatch = useDispatch()
    const {id}=useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getFaenaById(id))
        dispatch(getPagosFaenaByID(id))
    }, [dispatch])

    const faena= useSelector((state)=>(state.FaenaById))
    const pagos= useSelector((state)=>(state.AllPagosbyFaena))
    
    const deleteFaena = ()=>{
        if(pagos.length>0 || faena.estado_compra==true){
            swal({
                title: "¡Error! No puede eliminar faenas con compras o pagos asociados",
                text: "Primero debe eliminar los pagos o las compras que perteneces a esta faena. ",
                icon: "warning",
                dangerMode: true
                })
        }
        else swal({
            title: "Está seguro que desea eliminar la faena con tropa:"+ faena.tropa,
            text: "Una vez eliminada perdera todos sus datos 😰",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                swal('Escriba "eliminar faena" para confirmar:', {
                    content: "input",
                    })
                    .then((value) => {
                    if(value==="eliminar faena"){
                        dispatch(deleteFaenaById(id))
                        swal("Se eliminó la faena", {
                            icon: "success",
                        })
                        navigate('/Faenas')
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
        <div className={style.ConteinerFaenas} id={style.ConteinerCenter}>
            <NavBar
                title="Detalle de Faena"    
            />
            <div className={style.page}>
                <div className={style.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteFaena}
                    />
                </div>
                {faena.tropa==id?
                <div className={style.tablefaena}>
                    <Table_Det_Faena
                        faena={faena}
                    />                    
                    <Tabla_Detalle_Faena
                        reses={faena.detalle?faena.detalle:[]}
                    />
                </div>
                : 
                <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
                    <CircularProgress />
                </Box>
                }
            </div>
        </div>

    )
}