import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";

import NavBar from '../../Components/Navbar/Navbar'

import styleFormCl from './Form_Cliente.module.scss';

const formCl = {
    nombreCompleto:'',
    email: '',
    telefono:'',
    direccion:''
};

//validaciones
export const validate = (cliente) => {
    let error = {};

    if (!cliente.nombreCompleto) error.nombreCompleto = "Falta Nombe";
    else if (!/^([da-z_.-]+)@([da-z.-]+).([a-z.]{2,6})$/.test(cliente.email)) error.email = "email incorrecto";
    if (!cliente.telefono) error.telefono = "Falta Teléfono";
};

const Form_Cliente = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(formCl);
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
        alert( "Nuevo cliente cargado correctamente");
        setForm(formCl);
        }
        else {
        alert( "Datos incorrectos, porfavor intente nuevamente")
        }
    };

    const handleDet = () => {
        navigate("/Clientes")
    };

    return (
        <div className={styleFormCl.wallpaper}>
            <NavBar
            title={"Nuevo Cliente"}
            />
            <div className={styleFormCl.formContainer}>
                <form className={styleFormCl.form}>
                    <div className={styleFormCl.formItem}>
                        <h5 className={styleFormCl.title}>Nombre Completo: </h5>
                        <input
                            type="text"
                            value={form.nombreCompleto}
                            id="nombreCompleto"
                            name="nombreCompleto"
                            onChange={handleChange}
                            className={error.nombreCompleto & 'danger'}
                        />
                    </div>
                    <p className={error.nombreCompleto ? styleFormCl.danger : styleFormCl.pass}>{error.nombreCompleto}</p>
                    <div className={styleFormCl.formItem}>
                        <h5 className={styleFormCl.title}>email: </h5>
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
                    <p className={error.email ? styleFormCl.danger : styleFormCl.pass}>{error.email}</p>
                    <div className={styleFormCl.formItem}>
                        <h5 className={styleFormCl.title}>Teléfono: </h5>
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
                    <p className={error.telefono ? styleFormCl.danger : styleFormCl.pass}>{error.telefono}</p>
                    <div className={styleFormCl.formItem}>
                        <h5 className={styleFormCl.title}>Dirección: </h5>
                        <input
                            type="text"
                            value={form.direccion}
                            id="direccion"
                            name="direccion"
                            onChange={handleChange}
                            className={error.direccion & 'danger'}
                        />
                    </div>                    
                    <div className={styleFormCl.buttons}>
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

export default Form_Cliente;