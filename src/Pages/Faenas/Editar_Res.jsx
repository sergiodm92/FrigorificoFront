import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getFaenaById, getFaenasByTropa, putkgRes, putStockReses} from "../../Redux/Actions/Actions.js";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import style from './Faenas.module.scss';
import { useEffect } from "react";

const formCl = {
    correlativo:'',
    kg:null
};

//validaciones
export const validate = (cliente) => {
    let error = {};
    if (!cliente.correlativo) error.correlativo = "Falta Correlativo";
    return error;
};

const Form_Editar_Res = () => {

    const dispatch = useDispatch();
    const {id}=useParams()

    useEffect(() => {
        dispatch(getFaenaById(id))
    }, [dispatch])

    //Estados globales
    const faena= useSelector((state)=>(state.FaenaById))

    let arrayReses = (faena.detalle)?.filter((a)=>a.stock===true)
    console.log(arrayReses)
    
    const [form, setForm] = useState(formCl);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setError(
        validate({
            ...form,
            [e.target.name]: e.target.value,
        })
        );
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(
        !error.correlativo && form.correlativo 
        ){
            let arr = arrayReses.find(a=>a.correlativo==form.correlativo)
            console.log(arr)
            let newDetalle=faena.detalle.filter(a=>a.correlativo!==form.correlativo)
            if(arr.CuartoD>0){
                form.CuartoD=form.kg*1
                form.kg=arr.kg*1
            }
            else if(arr.CuartoT>0){
                form.CuartoT=form.kg*1
                form.kg=arr.kg*1
            }
            else{
                form.CuartoD=arr.CuartoD
                form.CuartoT=arr.CuartoT
                form.kg=form.kg*1
            }
            form.categoria=arr.categoria
            form.costo_kg=arr.costo_kg
            form.stock=arr.stock
            newDetalle.push(form)
            dispatch(putStockReses([{id: id, detalle: newDetalle}]))
        swal({
            title: "Res modificada con éxito",
            text: "kg cargados correctamente",
            icon: "success",
            button: "ok",
        })
        document.getElementById("correlativo").selectedIndex = 0
        setForm(formCl);
        }
        else {
            swal({
                title: "Alerta",
                text: "Datos incorrectos, por favor intente nuevamente",
                icon: "warning",
                button: "ok",
            })
        }
    };

    function handleSelect(e) {
        setForm({
            ...form,
            correlativo:  e.target.value 
        })
    }

    return (
        <div className={style.ConteinerFaenas}>
            <NavBar
            title={"Nuevo Cliente"}
            />
            <div className={style.formContainer}>
                <form className={style.form}>
                    <div className={style.formItem}>
                        <h5 className={style.titleForm}>Correlativo: </h5>
                        <select id="correlativo" className="selectform" onChange={(e)=> handleSelect(e)}>
                            <option defaultValue>-</option>
                            {arrayReses?.length > 0 &&  
                                arrayReses.map((e,i) => (
                                    <option key={i}	value={e.correlativo}>{e.correlativo}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <p className={error.correlativo ? style.danger : style.pass}>{error.correlativo}</p>
                    <div className={style.formItem}>
                        <h5 className={style.titleForm}>kg: </h5>
                        <input
                            type="number"
                            value={form.kg}
                            id="kg"
                            name="kg"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.buttons}>
                        <ShortButton
                            title="✔ Confirmar"
                            onClick={handleSubmit}
                            color="green"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form_Editar_Res;