import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import {getComrpaByID, getProveedorByName, postNewPagoCompra, putSaldoCompra, setAlertPagoCompra } from "../../Redux/Actions/Actions";

import stylePagoC from './Form_pago.module.scss';

const formPC = {
    fecha: '',
    monto: 0,
    formaDePago:'',
    compraID: 0,
    proveedor:''
};

const formasDePago=["Efectivo", "Transferencia"]

//validaciones
export const validate = (pago) => {
    let error = {};
    if (!pago.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\-)(0[1-9]|1[0-2])\2(\d{4})$/.test(pago.fecha)) error.fecha = "Fecha incorrecta";
    if (!pago.monto) error.monto = "Falta monto";
    else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(pago.monto)) error.monto = "Monto debe ser un número";
    if (!pago.formaDePago) error.forma_pago = "Falta forma de pago";
    return error;
};

const Form_Pago_Compra = () => {

    const {id}=useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getComrpaByID(id))
    }, [dispatch])

    const compra = useSelector((state)=>state.CompraByID);
    const alert_msj= useSelector ((state)=>state.postNewPagoCompra);

    useEffect(() => {
        dispatch(getProveedorByName(compra.proveedor))
    }, [compra])
    const proveedor = useSelector((state)=>state.provByNombre)

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Pago creado con éxito"?"success":"warning", 
                button: "ok",
            })}
            dispatch(setAlertPagoCompra())
    }, [alert_msj])

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
        !error.formaDePago && form.formaDePago &&
        !error.monto && form.monto
        ){
        form.proveedor=compra.proveedor
        form.compraID=id
        let saldo= compra.saldo - form.monto
        dispatch(putSaldoCompra(id, saldo))
        dispatch(postNewPagoCompra(form))
        document.getElementById("formaDePago").selectedIndex = 0
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

    function handleSelectFP(e) {
        setForm({
            ...form,
            formaDePago:  e.target.value
        })
    }

    const handleCreate = () => {
        navigate("/Compras")
    };

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

    const saldoEnPesos = currencyFormatter({
        currency: "USD",
        value : compra.saldo
        })

    return (
        <div className={stylePagoC.wallpaper}>
            <NavBar
            title={"Nuevo Pago"}
            />
            <div className={stylePagoC.formContainer}>
                <div className={stylePagoC.detallePro}>
                    <div className={stylePagoC.detalledivs}>
                        <h5 className={stylePagoC.title}>Proveedor: </h5>
                        <h4 className={stylePagoC.nameP}>{compra.proveedor}</h4>
                    </div>
                    <div className={stylePagoC.detalledivs}>
                        <h5 className={stylePagoC.title}>Saldo: </h5>
                        <h4 className={stylePagoC.nameP}>{saldoEnPesos}</h4>
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
                            type="number"
                            value={form.monto?form.monto:''}
                            id="monto"
                            name="monto"
                            onChange={handleChange}
                            placeholder="0.00"
                            className={error.monto & 'danger'}
                        />
                    </div>
                    <p className={error.monto ? stylePagoC.danger : stylePagoC.pass}>{error.monto}</p>
                    <div className={stylePagoC.formItem}>
                        <h5 className={stylePagoC.title}>Forma de Pago: </h5>
                        <select id="formaDePago" className="selectform" onChange={(e)=> handleSelectFP(e)}>
                            <option defaultValue>-</option>
                            {formasDePago.length > 0 &&  
                                formasDePago.map((p,i) => (
                                    <option key={i}	value={p}>{p}</option>
                                    ))
                            }
                        </select>
                    </div>                 
                    <div className={stylePagoC.buttons}>
                        <ShortButton
                            title="Agregar Comprobante"
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