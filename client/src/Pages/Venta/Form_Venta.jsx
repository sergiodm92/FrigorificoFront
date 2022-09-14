import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";

import NavBar from '../../Components/Navbar/Navbar'

import styleFormV from './Form_Venta.module.scss';

const formF = {
    fecha: '',
    frigorifico: '',
    tropa: '',
    proveedor: '',
};
const clientes = ["Don Alberto", "Quiroga"]

//validaciones
export const validate = (faena) => {
    let error = {};

    if (!faena.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(faena.fecha)) error.fecha = "Fecha incorrecta";
    if (!faena.tropa) error.tropa = "Falta tropa";
    else if (!/^([0-9])*$/.test(faena.tropa)) error.tropa = "Tropa debe ser un número";
    return error;
};

const Form_Venta = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(formF);
    const [error, setError] = useState({});

    const handleChange = (e) => {
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

    const handleSubmit = () => {
        if(
        !error.fecha && form.fecha &&
        !error.tropa && form.tropa
        ){
        // dispatch(postFaena(form))
        alert( "Venta cargada correctamente");
        setForm(formF);
        }
        else {
        alert( "Datos incorrectos, porfavor intente nuevamente")
        }
    };

    function handleSelectFr(e) {
        setForm({
            ...form,
            frigorifico: [...form.frigorifico, e.target.value ]
        })
    }
    function handleSelectPr(e) {
        setForm({
            ...form,
            proveedor: [...form.proveedor, e.target.value ]
        })
    }

    const handleDet = () => {
        navigate("/Ventas")
    };

    return (
        <div className={styleFormV.wallpaper}>
            <NavBar
            title={"Nueva Venta"}
            />
            <div className={styleFormV.formContainer}>
                <form className={styleFormV.form}>
                    <div className={styleFormV.formItem}>
                        <h5 className={styleFormV.title}>Cliente: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectFr(e)}>
                            <option value="" selected>-</option>
                            {clientes.length > 0 &&  
                            clientes.map((c) => (
                                    <option	value={c}>{c}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <div className={styleFormV.formItem}>
                        <h5 className={styleFormV.title}>Fecha: </h5>
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
                    <p className={error.fecha ? styleFormV.danger : styleFormV.pass}>{error.fecha}</p>
                    //--------------------------------------------                    
                    <div className={styleFormV.buttons}>
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

export default Form_Venta;