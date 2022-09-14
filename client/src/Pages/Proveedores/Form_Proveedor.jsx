import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";

import NavBar from '../../Components/Navbar/Navbar'

import styleFormPr from './Form_Proveedor.module.scss';

const formPr = {
    nombreCompleto:'',
    email: '',
    telefono:'',
    direccion:''
};

//validaciones
export const validate = (proveedor) => {
    let error = {};

    if (!proveedor.nombreCompleto) error.nombreCompleto = "Falta Nombe";
    else if (!/^([da-z_.-]+)@([da-z.-]+).([a-z.]{2,6})$/.test(proveedor.email)) error.email = "email incorrecto";
    if (!proveedor.telefono) error.telefono = "Falta Teléfono";
};

const Form_Proveedor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(formPr);
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
        !error.nombreCompleto && form.nombreCompleto &&
        !error.email && form.email &&
        !error.telefono && form.telefono
        ){
        // dispatch(postCliente(form))
        swal({
            title: "Nuevo Proveedor",
            text: "Cargado correctamente",
            icon: "success",
            button: "ok",
        })
        setForm(formPr);
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

    const handleDet = () => {
        navigate("/Proveedores")
    };

    return (
        <div className={styleFormPr.wallpaper}>
            <NavBar
            title={"Nuevo Proveedor"}
            />
            <div className={styleFormPr.formContainer}>
                <form className={styleFormPr.form}>
                    <div className={styleFormPr.formItem}>
                        <h5 className={styleFormPr.title}>Nombre Completo: </h5>
                        <input
                            type="text"
                            value={form.nombreCompleto}
                            id="nombreCompleto"
                            name="nombreCompleto"
                            onChange={handleChange}
                            className={error.nombreCompleto & 'danger'}
                        />
                    </div>
                    <p className={error.nombreCompleto ? styleFormPr.danger : styleFormPr.pass}>{error.nombreCompleto}</p>
                    <div className={styleFormPr.formItem}>
                        <h5 className={styleFormPr.title}>email: </h5>
                        <input
                            type="text"
                            value={form.email}
                            id="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="nombre@ejemplo.com"
                            className={error.email & 'danger'}
                        />
                    </div>
                    <p className={error.email ? styleFormPr.danger : styleFormPr.pass}>{error.email}</p>
                    <div className={styleFormPr.formItem}>
                        <h5 className={styleFormPr.title}>Teléfono: </h5>
                        <input
                            type="text"
                            value={form.telefono}
                            id="telefono"
                            name="telefono"
                            onChange={handleChange}
                            placeholder="3830000000"
                            className={error.telefono & 'danger'}
                        />
                    </div>
                    <p className={error.telefono ? styleFormPr.danger : styleFormPr.pass}>{error.telefono}</p>
                    <div className={styleFormPr.formItem}>
                        <h5 className={styleFormPr.title}>Dirección: </h5>
                        <input
                            type="text"
                            value={form.direccion}
                            id="direccion"
                            name="direccion"
                            onChange={handleChange}
                            className={error.direccion & 'danger'}
                        />
                    </div>                    
                    <div className={styleFormPr.buttons}>
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

export default Form_Proveedor;