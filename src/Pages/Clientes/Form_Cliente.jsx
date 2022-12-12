import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {getAllClientes, postNewCliente, putEditarCliente} from "../../Redux/Actions/Actions.js";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import style from "./Clientes.module.scss";

const formCl = {
    nombre:'',
    email: '',
    telefono:'',
    direccion:'',
    cuil:''
};

//validaciones
export const validate = (cliente) => {
    let error = {};
    if (!cliente.nombre) error.nombre = "Falta Nombe";
    return error;
};

const Form_Cliente = () => {

    const dispatch = useDispatch();
    const {id}=useParams()

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
        if(!error.nombre && form.nombre){
            if(id==null || id==0){
                form.id="Cl"+Math.floor(Math.random()*1000000)
                dispatch(postNewCliente(form))
                dispatch(getAllClientes())
            }
            else{
                form.id=id
                dispatch(putEditarCliente(form))
            }            
            swal({
                text: "Cliente cargado correctamente",
                icon: "success",
                button: "ok",
            })
            setForm(formCl);
        }
        else {
            swal({
                text: "Datos incorrectos, por favor intente nuevamente",
                icon: "warning",
                button: "ok",
            })
        }
    };

    return (
        <div className={style.conteinerAll}>
            <NavBar
            title={"Nuevo Cliente"}
            />
            <div className={style.formContainer}>
                <form className={style.form}>
                    <div className={style.formItem}>
                        <h5 className={style.titleForm}>Nombre Completo: </h5>
                        <input
                            type="text"
                            value={form.nombre}
                            id="nombre"
                            name="nombre"
                            onChange={handleChange}
                            className={error.nombre & 'danger'}
                        />
                    </div>
                    <p className={error.nombre ? style.danger : style.pass}>{error.nombre}</p>
                    <div className={style.formItem}>
                        <h5 className={style.titleForm}>email: </h5>
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
                    <p className={error.email ? style.danger : style.pass}>{error.email}</p>
                    <div className={style.formItem}>
                        <h5 className={style.titleForm}>Teléfono: </h5>
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
                    <p className={error.telefono ? style.danger : style.pass}>{error.telefono}</p>
                    <div className={style.formItem}>
                        <h5 className={style.titleForm}>Dirección: </h5>
                        <input
                            type="text"
                            value={form.direccion}
                            id="direccion"
                            name="direccion"
                            onChange={handleChange}
                            className={error.direccion & 'danger'}
                        />
                    </div>   
                    <div className={style.formItem}>
                        <h5 className={style.titleForm}>Cuil: </h5>
                        <input
                            type="text"
                            value={form.cuil}
                            id="cuil"
                            name="cuil"
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

export default Form_Cliente;