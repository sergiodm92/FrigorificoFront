import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useParams } from "react-router";
import { postNewProveedor, putEditarProveedor } from "../../Redux/Actions/Actions";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import style from './Proveedores.module.scss';

const formPr = {
    nombre:'',
    telefono:'',
    email: '',
    direccion:'',
    cuil:''
};

//validaciones
export const validate = (proveedor) => {
    let error = {};
    if (!proveedor.nombre) error.nombre = "Falta Nombe";
    return error;
};

const Form_Proveedor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id}=useParams()

    const [form, setForm] = useState(formPr);
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
        !error.nombre && form.nombre 
        ){
            if(id==0) dispatch(postNewProveedor(form))
            else{
                form.id=id*1
                console.log(form)
                dispatch(putEditarProveedor(form))
            }
            swal({
                titleForm: "Nuevo Proveedor",
                text: "Cargado correctamente",
                icon: "success",
                button: "ok",
            })
            setForm(formPr);
        }
        else {
            swal({
                titleForm: "Alerta",
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
        <div className={style.ConteinerProveedores}>
            <NavBar
            title={"Nuevo Proveedor"}
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
                    <p className={error.nombreCompleto ? style.danger : style.pass}>{error.nombreCompleto}</p>
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