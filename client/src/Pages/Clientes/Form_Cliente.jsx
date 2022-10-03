import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {postNewCliente} from "../../Redux/Actions/Actions.js";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import styleFormCl from './Form_Cliente.module.scss';

const formCl = {
    nombre:'',
    email: '',
    telefono:'',
    direccion:''
};

//validaciones
export const validate = (cliente) => {
    let error = {};
    if (!cliente.nombre) error.nombre = "Falta Nombe";
    else if (!/^([da-z_.-]+)@([da-z.-]+).([a-z.]{2,6})$/.test(cliente.email)) error.email = "email incorrecto";
    if (!cliente.telefono) error.telefono = "Falta Teléfono";
    return error;
};

const Form_Cliente = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        !error.nombre && form.nombre &&
        !error.email && form.email &&
        !error.telefono && form.telefono
        ){
        dispatch(postNewCliente(form))
        swal({
            title: "Nuevo Cliente",
            text: "Cargado correctamente",
            icon: "success",
            button: "ok",
        })
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
                            value={form.nombre}
                            id="nombre"
                            name="nombre"
                            onChange={handleChange}
                            className={error.nombre & 'danger'}
                        />
                    </div>
                    <p className={error.nombre ? styleFormCl.danger : styleFormCl.pass}>{error.nombre}</p>
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