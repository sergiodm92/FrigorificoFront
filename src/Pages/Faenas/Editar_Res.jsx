import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { putkgRes} from "../../Redux/Actions/Actions.js";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import style from './Faenas.module.scss';
import { useEffect } from "react";

const formCl = {
    correlativo:'',
    kg:0
};

//validaciones
export const validate = (cliente) => {
    let error = {};
    if (!cliente.correlativo) error.correlativo = "Falta Correlativo";
    return error;
};

const Form_Editar_Res = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tropa}=useParams()



    //Estados globales
    const AllReses = useSelector((state)=>(state.AllReses))
    let arrayReses = AllReses.filter(a=>a.tropa==tropa && a.stock==true)

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
            dispatch(putkgRes(form))
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

    const handleDet = () => {
        navigate("/Faenas")
    };

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
                            {arrayReses.length > 0 &&  
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
                            type="text"
                            value={form.kg}
                            id="kg"
                            name="kg"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.buttons}>
                        <ShortButton
                            title="📃 Detalle"
                            onClick={handleDet}
                            color="primary"
                        />
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