import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useParams } from "react-router";
import { postNewProveedor, putEditarProveedor } from "../../Redux/Actions/Actions";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import styleFormPr from './Form_Proveedor.module.scss';

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
                            value={form.nombre}
                            id="nombre"
                            name="nombre"
                            onChange={handleChange}
                            className={error.nombre & 'danger'}
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
                    <div className={styleFormPr.formItem}>
                        <h5 className={styleFormPr.title}>Cuil: </h5>
                        <input
                            type="text"
                            value={form.cuil}
                            id="cuil"
                            name="cuil"
                            onChange={handleChange}
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