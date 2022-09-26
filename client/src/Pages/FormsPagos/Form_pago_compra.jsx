import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";

import NavBar from '../../Components/Navbar/Navbar'

import stylePagoC from './Form_pago.module.scss';

const formPC = {
    fecha: '',
    monto: '',
    forma_pago:''
};

//validaciones
export const validate = (pago) => {
    let error = {};
    if (!pago.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(pago.fecha)) error.fecha = "Fecha incorrecta";
    if (!pago.monto) error.monto = "Falta monto";
    else if (!/^([0-9])*$/.test(pago.monto)) error.monto = "Monto debe ser un número";
    if (!pago.forma_pago) error.forma_pago = "Falta forma de pago";
    return error;
};

const Form_Pago_Compra = () => {

    const {name}=useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(formPC);
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
        !error.forma_pago && form.forma_pago &&
        !error.monto && form.monto
        ){
        // dispatch(postPagoCompra(form))
        swal({
            title: "Alerta de Pago",
            text: "Pago agregado correctamente",
            icon: "success",
            button: "ok",
        })
        setForm(formPC);
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

    const handleCreate = () => {
        navigate("/Compras")
    };

    return (
        <div className={stylePagoC.wallpaper}>
            <NavBar
            title={"Nuevo Pago"}
            />
            <div className={stylePagoC.formContainer}>
                <div className={stylePagoC.detallePro}>
                    <div className={stylePagoC.detalledivs}>
                        <h5 className={stylePagoC.title}>Cliente: </h5>
                        <h4 className={stylePagoC.nameP}>{name}</h4>
                    </div>
                    <div className={stylePagoC.detalledivs}>
                        <h5 className={stylePagoC.title}>Saldo: </h5>
                        <h4 className={stylePagoC.nameP}>"Saldo"</h4>
                    </div>
                </div>
                <form className={stylePagoC.form}>
                    <div className={stylePagoC.formItem}>
                        <h5 className={stylePagoC.title}>Fecha: </h5>
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
                    <p className={error.fecha ? stylePagoC.danger : stylePagoC.pass}>{error.fecha}</p>
                    <div className={stylePagoC.formItem}>
                        <h5 className={stylePagoC.title}>Monto: </h5>
                        <input
                            type="text"
                            value={form.monto}
                            id="monto"
                            name="monto"
                            onChange={handleChange}
                            placeholder="0.00"
                            className={error.monto & 'danger'}
                        />
                    </div>
                    <p className={error.monto ? stylePagoC.danger : stylePagoC.pass}>{error.monto}</p>
                    <div className={stylePagoC.formItem}>
                        <h5 className={stylePagoC.title}>Forma de pago: </h5>
                        <input
                            type="text"
                            value={form.forma_pago}
                            id="forma_pago"
                            name="forma_pago"
                            onChange={handleChange}
                            placeholder="0.00"
                            className={error.forma_pago & 'danger'}
                        />
                    </div>
                    <p className={error.forma_pago ? stylePagoC.danger : stylePagoC.pass}>{error.forma_pago}</p>                  
                    <div className={stylePagoC.buttons}>
                        <ShortButton
                            title="📃Generar Factura"
                            onClick={handleCreate}
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

export default Form_Pago_Compra;