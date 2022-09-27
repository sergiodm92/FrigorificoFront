import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import { getAllClientes, postNewVentaAchura } from "../../Redux/Actions/Actions";

import styleFormV from './Form_Venta.module.scss';

//Form Venta
var formVA = {
    cliente:'',
    fecha: '',
    cantidad:'',
    precio_unitario:'',
    total:'',
    saldo:''
};

//validaciones form VentaAchuras
export const validate = (venta) => {
    let error = {};
    if (!venta.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(venta.fecha)) error.fecha = "Fecha incorrecta";
    if (!venta.cliente) error.cliente = "Falta cliente";
    if (!venta.cantidad) error.cantidad = "Falta cantidad";
    else if (!/^([0-9])*$/.test(venta.cantidad)) error.cantidad = "Cantidad debe ser un número";
    if (!venta.precio_unitario) error.precio_unitario = "Falta precio unitario";
    else if (!/^([0-9])*$/.test(venta.precio_unitario)) error.precio_unitario = "Precio debe ser un número";
    return error;
};

const Form_Venta_Achuras = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //estados globales
    const alert_msj= useSelector ((state)=>state.postVentaAchuras);
    const clientes = useSelector((state)=>state.AllClientes);
    
    useEffect(() => {
        dispatch(getAllClientes())
    }, [dispatch])

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Compra creada con éxito"?"success":"warning", 
                button: "ok",
            })}
    }, [alert_msj])  

    //Estados locales
    const [form, setForm] = useState(formVA);
    const [error, setError] = useState({});

    //handleChange de la Venta completa
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

    //handleSubmit de la Venta completa
    const handleSubmit = (e) => {
        e.preventDefault();
        if(
        !error.cantidad && form.cantidad &&
        !error.precio_unitario && form.precio_unitario &&
        !error.fecha && form.fecha &&
        !error.cliente && form.cliente
        ){
            form.total=form.precio_unitario*1*form.cantidad
            form.saldo=form.total
            dispatch(postNewVentaAchura(form))
            console.log(form)
            setForm(formVA);
        }
    };

    //Select de Cliente
    function handleSelectCl(e) {
        setForm({
            ...form,
            cliente: e.target.value
        })
    }

    //ir a ventas para ver el detalle
    const handleDet = () => {
        navigate("/Ventas")
    };

    return (
        <div className={styleFormV.wallpaper}>
            <NavBar
            title={"Nueva Venta de Achuras"}
            />
            <div className={styleFormV.formContainer}>
                <form className={styleFormV.form}>
                    <div className={styleFormV.formItem}>
                        <h5 className={styleFormV.title}>Cliente: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectCl(e)}>
                            <option value="" selected>-</option>
                            {clientes.length > 0 &&  
                            clientes.map((c) => (
                                    <option	value={c.nombre}>{c.nombre}</option>
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
                    <div className={styleFormV.formItem}>
                        <h5 className={styleFormV.title}>Cantidad: </h5>
                        <input
                            type="text"
                            value={form.cantidad}
                            id="cantidad"
                            name="cantidad"
                            onChange={handleChange}
                            placeholder="00"
                            className={error.cantidad & 'danger'}
                        />
                    </div>
                    <p className={error.cantidad ? styleFormV.danger : styleFormV.pass}>{error.cantidad}</p>
                    <div className={styleFormV.formItem}>
                        <h5 className={styleFormV.title}>$/Un: </h5>
                        <input
                            type="text"
                            value={form.precio_unitario}
                            id="precio_unitario"
                            name="precio_unitario"
                            onChange={handleChange}
                            placeholder="0.00"
                            className={error.precio_unitario & 'danger'}
                        />
                    </div>
                    <p className={error.precio_unitario ? styleFormV.danger : styleFormV.pass}>{error.precio_unitario}</p>
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

export default Form_Venta_Achuras;