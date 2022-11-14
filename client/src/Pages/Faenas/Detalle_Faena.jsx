import React, { useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/Navbar/Navbar"
import Table_Det_Faena from "../../Components/Details/Detalle_Faena";
import { useParams } from "react-router-dom";
import StyleDF from "./Faenadetail.module.scss"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import { deleteFaenaById, deleteResById, getAllReses, getFaenaById, getPagosFaenaByID } from "../../Redux/Actions/Actions";
import Tabla_Detalle_Faena from "../../Components/Details/Tabla_Detalle_Faena";


export default function Detalle_Faena(){

    const dispatch = useDispatch()
    const {id}=useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllReses())
        dispatch(getFaenaById(id))
        dispatch(getPagosFaenaByID(id))
    }, [dispatch])

    const faena= useSelector((state)=>(state.FaenaById))
    const AllReses = useSelector((state)=>(state.AllReses))
    const tropa = faena.tropa
    let arrayReses = AllReses.filter(a=>a.tropa==tropa)

    const pagos= useSelector((state)=>(state.AllPagosbyFaena))
    
    arrayReses.sort(function(a,b){
        if(a.correlativo>b.correlativo){return 1}
        if(a.correlativo<b.correlativo){return -1}
        return 0})
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
            title: "Está seguro que desea eliminar la faena con tropa:"+tropa,
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
                        arrayReses.map((a)=>{
                        setTimeout(()=>{
                        dispatch(deleteResById(a.id))
                        }, 2000)
                    })
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
        <div className={StyleDF.conteinerDetalle}>
            <NavBar
                title="Detalle de Faena"    
            />
            <div className={StyleDF.page}>
                <div className={StyleDF.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteFaena}
                    />
                </div>
                <div className={StyleDF.tablefaena}>
                    <Table_Det_Faena
                        id={id}
                    />                    
                    <Tabla_Detalle_Faena
                        reses={faena.detalle?faena.detalle:[]}
                    />
                </div>
            </div>
        </div>

    )
}