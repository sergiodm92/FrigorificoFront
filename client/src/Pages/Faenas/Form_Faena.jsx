import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";

import NavBar from '../../Components/Navbar/Navbar'

import styleFormF from './Form_Faena.module.scss';

const formF = {
    fecha: '',
    frigorifico: '',
    tropa: '',
    proveedor: '',
};
const frigorificos = ["Natilla", "otro"]
const proveedores = ["Puchulo", "Stopa", "Castillo", "Dib", "Dulio Text", "C Walter"]

//validaciones
export const validate = (faena) => {
    let error = {};

    if (!faena.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(faena.fecha)) error.fecha = "Fecha incorrecta";
    if (!faena.tropa) error.tropa = "Falta tropa";
    else if (!/^([0-9])*$/.test(faena.tropa)) error.tropa = "Tropa debe ser un número";
    return error;
};

const Form_Faena = () => {

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
        swal({
            title: "Nueva Faena",
            text: " Faena cargada correctamente",
            icon: "success",
            button: "ok",
        })
        setForm(formF);
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
        navigate("/Faenas")

    };

    return (
        <div className={styleFormF.wallpaper}>
            <NavBar
            title={"Nueva Faena"}
            />
            <div className={styleFormF.formContainer}>
                <form className={styleFormF.form}>
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Fecha: </h5>
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
                    <p className={error.fecha ? styleFormF.danger : styleFormF.pass}>{error.fecha}</p>
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Frigorífico: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectFr(e)}>
                            <option value="" selected>-</option>
                            {frigorificos.length > 0 &&  
                            frigorificos.map((f) => (
                                    <option	value={f}>{f}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Tropa: </h5>
                        <input
                            type="text"
                            value={form.tropa}
                            id="tropa"
                            name="tropa"
                            onChange={handleChange}
                            placeholder="00000"
                            className={error.tropa & 'danger'}
                        />
                    </div>
                    <p className={error.tropa ? styleFormF.danger : styleFormF.pass}>{error.tropa}</p>
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Proveedor: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectPr(e)}>
                            <option value="" selected>-</option>
                            {proveedores.length > 0 &&  
                            proveedores.map((p) => (
                                    <option	value={p}>{p}</option>
                                    ))
                            }
                        </select>
                    </div>
                    //--------------------------------------------
                    <div className={styleFormF.formItem}>
                        <div>
                            <h5 className={styleFormF.title}>Costo Faena/kg: </h5>
                        </div>
                        <div className={styleFormF.numero}>
                            <h5 className={styleFormF.title}>$ </h5>
                            <input
                                type="text"
                                value={form.costoFaenakg}
                                id="costoFaenakg"
                                name="costoFaenakg"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormF.size2}
                            />
                        </div>
                    </div>
                    <p className={error.costoFaenakg ? styleFormF.danger : styleFormF.pass}>{error.costoFaenakg}</p>
                    <div className={styleFormF.buttons}>
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

export default Form_Faena;