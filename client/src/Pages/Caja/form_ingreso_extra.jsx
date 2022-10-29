import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from "../../Components/Navbar/Navbar";
import { postNewIngresoExtra, setAlert } from "../../Redux/Actions/Actions";
import style from "./caja.module.scss";

const formPE = {
    fecha: '',
    concepto:'',
    monto: 0,
    formaDePago:'',
};

const formasDePago=["Efectivo", "Transferencia"]

//validaciones
export const validate = (pago) => {
    let error = {};
    if (!pago.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\-)(0[1-9]|1[0-2])\2(\d{4})$/.test(pago.fecha)) error.fecha = "Fecha incorrecta";
    if (!pago.monto) error.monto = "Falta monto";
    else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(pago.monto)) error.monto = "Monto debe ser un número";
    if (!pago.formaDePago) error.forma_pago = "Falta forma de pago";
    return error;
};


export default function FormIngresoExtra(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert_msj= useSelector ((state)=>state.alert_msj);

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Pago creado con éxito"?"success":"warning", 
                button: "ok",
            })}
            dispatch(setAlert())
    }, [alert_msj])

    const [form, setForm] = useState(formPE);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        e.preventDefault()
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
        e.preventDefault()
        if(
            !error.fecha && form.fecha &&
            !error.formaDePago && form.formaDePago &&
            !error.monto && form.monto
        ){
            dispatch(postNewIngresoExtra(form))
            document.getElementById("formaDePago").selectedIndex = 0
            setForm(formPE);
        }
        else {
            swal({
                title: "Alerta de Pago",
                text: "Datos incorrectos, por favor intente nuevamente",
                icon: "warning",
                button: "ok",
            })
        }
    };
        
    function handleSelectFP(e) {
        setForm({
            ...form,
            formaDePago:  e.target.value
        })
    }

    return(
        <div className={style.wallpaper}>
            <NavBar
                title={"Ingresos Extras"}
            />
            <div className={style.formContainer}>
            <form className={style.form}>
                <div className={style.formItem}>
                    <h5 className={style.title}>Fecha: </h5>
                    <input
                        type="text"
                        value={form.fecha}
                        id="fecha"
                        name="fecha"
                        onChange={handleChange}
                        placeholder="00-00-0000"
                        className={error.fecha & 'danger'}
                    />
                </div>
                <p className={error.fecha ? style.danger : style.pass}>{error.fecha}</p>
                <div className={style.formItem}>
                    <h5 className={style.title}>Concepto: </h5>
                    <input
                        type="text"
                        value={form.concepto}
                        id="concepto"
                        name="concepto"
                        onChange={handleChange}
                    />
                </div>
                <div className={style.formItem}>
                    <h5 className={style.title}>Monto: </h5>
                        <input
                            type="number"
                            value={form.monto}
                            id="monto"
                            name="monto"
                            onChange={handleChange}
                            placeholder="0.00"
                            className={error.monto & 'danger'}
                        />
                    </div>
                    <p className={error.monto ? style.danger : style.pass}>{error.monto}</p>
                    <div className={style.formItem}>
                        <h5 className={style.title}>Forma de Pago: </h5>
                        <select id="formaDePago" className="selectform" onChange={(e)=> handleSelectFP(e)}>
                            <option defaultValue>-</option>
                            {formasDePago.length > 0 &&  
                                formasDePago.map((p,i) => (
                                    <option	key={i} value={p}>{p}</option>
                                    ))
                            }
                        </select>
                    </div>                 
                    <div className={style.divButtons}>
                        <div>
                            <ShortButton
                                title="Agregar Comprobante"
                                // onClick={handleCreate}
                                color="primary"
                            />
                        </div>
                        <div>
                            <ShortButton
                                title="✔ Confirmar"
                                onClick={handleSubmit}
                                color="green"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}