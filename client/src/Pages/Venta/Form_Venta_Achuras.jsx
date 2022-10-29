import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import { getAllClientes, getClienteByName, postNewVentaAchura, setAlert } from "../../Redux/Actions/Actions";

import styleFormV from './Form_Venta.module.scss';

//Form Venta
var formVA = {
    clien:'',
    fecha: '',
    cantidad:0,
    precioUnitario:0,
    total:null,
    saldo:null
};

//validaciones form VentaAchuras
export const validate = (venta) => {
    let error = {};
    if (!venta.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\-)(0[1-9]|1[0-2])\2(\d{4})$/.test(venta.fecha)) error.fecha = "Fecha incorrecta";
    if (!venta.clien) error.clien = "Falta cliente";
    if (!venta.cantidad) error.cantidad = "Falta cantidad";
    else if (!/^([0-9])*$/.test(venta.cantidad)) error.cantidad = "Cantidad debe ser un número";
    if (!venta.precioUnitario) error.precioUnitario = "Falta precio unitario";
    else if (!/^([0-9])*$/.test(venta.precioUnitario)) error.precioUnitario = "Precio debe ser un número";
    return error;
};

const Form_Venta_Achuras = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //estados globales
    const alert_msj= useSelector ((state)=>state.alert_msj);
    const clientes = useSelector((state)=>state.AllClientes);
    
    useEffect(() => {
        dispatch(getAllClientes())
    }, [dispatch])

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Venta creada con éxito"?"success":"warning", 
                button: "ok",
            })}
            dispatch(setAlert())
    }, [alert_msj]) 

    //Estados locales
    const [form, setForm] = useState(formVA);
    const [error, setError] = useState({});

    useEffect(() => {
        dispatch(getClienteByName(form.clien))
    }, [form])

    const cliente = useSelector((state)=>state.clienteByNombre);

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
        !error.precioUnitario && form.precioUnitario &&
        !error.fecha && form.fecha &&
        !error.clien && form.clien
        ){
            form.total=form.precioUnitario*1*form.cantidad
            form.saldo=form.total
            dispatch(postNewVentaAchura(form))
            setForm(formVA);
        }
        else{
            swal({
                title: "Alerta",
                text: "Datos incorrectos, por favor intente nuevamente",
                icon: "warning",
                button: "ok",
            })
        }
    };

    //Select de Cliente
    function handleSelectCl(e) {
        setForm({
            ...form,
            clien: e.target.value
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
                            <option defaultValue>-</option>
                            {clientes.length > 0 &&  
                            clientes.map((c,i) => (
                                    <option	key={i} value={c.nombre}>{c.nombre.length<20?c.nombre:c.nombre.slice(0,17)}</option>
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
                            type="number"
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
                            type="number"
                            value={form.precioUnitario}
                            id="precioUnitario"
                            name="precioUnitario"
                            onChange={handleChange}
                            placeholder="0.00"
                            className={error.precioUnitario & 'danger'}
                        />
                    </div>
                    <p className={error.precioUnitario ? styleFormV.danger : styleFormV.pass}>{error.precioUnitario}</p>
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