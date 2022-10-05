import React, { useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/Navbar/Navbar"
import CardLarge from "../../Components/Cards/Card_Large/Card_Large"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import Table_Det_Faena from "../../Components/Details/Detalle_Faena";
import { useParams } from "react-router-dom";
import StyleDF from "./Faenadetail.module.scss"
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import { deleteFaenaById, deleteResById, getAllFaenas, getAllReses } from "../../Redux/Actions/Actions";


export default function Detalle_Faena(){

    const dispatch = useDispatch()
    const {id}=useParams()
    console.log(id)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllFaenas())
        dispatch(getAllReses())
    }, [dispatch])

    const AllFaenas = useSelector((state)=>(state.AllFaenas))
    const AllReses = useSelector((state)=>(state.AllReses))
    const tropa = AllFaenas.find(a=>a.id==id).tropa
    const arrayReses = AllReses.filter(a=>a.tropa==tropa)
    const deleteFaena = ()=>{
        swal({
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
                        swal("Se eliminó la faena", {
                            icon: "success",
                        })
                        dispatch(deleteFaenaById(id))
                        arrayReses.map((a)=>{
                        setTimeout(()=>{
                        dispatch(deleteResById(a.id))
                        }, 2000)
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
        <div className={StyleDF.conteiner}>
            <NavBar
                title="Faena"    
            />
            <div className={StyleDF.page}>
                <div className={StyleDF.buttonEdit}>
                    <ButtonNew
                        style={"edit"}
                        icon={"edit"}
                        // onClick={editFaena}
                    />
                </div>
                <div className={StyleDF.buttonDelete}>
                    <ButtonNew
                        style={"delete"}
                        icon={"delete"}
                        onClick={deleteFaena}
                    />
                </div>
                <div className={StyleDF.tablefaena}>
                    <Table_Det_Faena
                        tropa={tropa}
                    />
                </div>
            </div>
        </div>

    )
}