import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";

import NavBar from '../../Components/Navbar/Navbar'
import { deleteCompraById, getClienteByName, getVentaByID, postNewPagoVenta, putSaldoCliente, putSaldoVenta, setAlert } from "../../Redux/Actions/Actions";

import stylePagoV from './Form_pago.module.scss';

const formPV = {
    fecha: '',
    monto: 0,
    formaDePago:'',
    ventaID:0,
    cliente:''
};

const formasDePago=["Efectivo", "Transferencia"]

//validaciones
export const validate = (pago) => {
    let error = {};
    if (!pago.formaDePago) error.formaDePago = "Falta forma de pago";
    if (!pago.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\-)(0[1-9]|1[0-2])\2(\d{4})$/.test(pago.fecha)) error.fecha = "Fecha incorrecta";
    if (!pago.monto) error.monto = "Falta monto";
    else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(pago.monto)) error.monto = "Monto debe ser un número";
    return error;
};

const Form_Pago_Venta = () => {

    const {id}=useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getVentaByID(id))
    }, [dispatch])

    const venta = useSelector((state)=>state.VentaByID);
    const alert_msj= useSelector ((state)=>state.alert_msj);

    useEffect(() => {
        dispatch(getClienteByName(venta.cliente))
    }, [venta])
    const cliente = useSelector((state)=>state.clienteByNombre)

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Pago creado con éxito"?"success":"warning", 
                button: "ok",
            })}
            dispatch(setAlert())
    }, [alert_msj])

    const [form, setForm] = useState(formPV);
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
        !error.fecha && form.fecha &&
        !error.monto && form.monto
        ){
            form.cliente=venta.cliente
            form.ventaID=id
            let saldo1= cliente.saldo - form.monto
            let saldo2= venta.saldo - form.monto
            console.log(saldo1, saldo2)
            dispatch(putSaldoCliente(cliente.id, saldo1))
            dispatch(putSaldoVenta(id, saldo2))
            dispatch(postNewPagoVenta(form))
            document.getElementById("formaDePago").selectedIndex = 0
            setForm(formPV);
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
        navigate("/Ventas")
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
        value : venta.saldo
        })

    return (
        <div className={stylePagoV.wallpaper}>
            <NavBar
            title={"Nuevo Pago"}
            />
            <div className={stylePagoV.formContainer}>
                <div className={stylePagoV.detallePro}>
                    <div className={stylePagoV.detalledivs}>
                        <h5 className={stylePagoV.title}>Cliente: </h5>
                        <h4 className={stylePagoV.nameP}>{venta.cliente}</h4>
                    </div>
                    <div className={stylePagoV.detalledivs}>
                        <h5 className={stylePagoV.title}>Saldo: </h5>
                        <h4 className={stylePagoV.nameP}>{saldoEnPesos}</h4>
                    </div>
                </div>
                <form className={stylePagoV.form}>
                    <div className={stylePagoV.formItem}>
                        <h5 className={stylePagoV.title}>Fecha: </h5>
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
                    <p className={error.fecha ? stylePagoV.danger : stylePagoV.pass}>{error.fecha}</p>
                    <div className={stylePagoV.formItem}>
                        <h5 className={stylePagoV.title}>Monto: </h5>
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
                    <p className={error.monto ? stylePagoV.danger : stylePagoV.pass}>{error.monto}</p> 
                    <div className={stylePagoV.formItem}>
                        <h5 className={stylePagoV.title}>Forma de Pago: </h5>
                        <select id="formaDePago" className="selectform" onChange={(e)=> handleSelectFP(e)}>
                            <option defaultValue>-</option>
                            {formasDePago.length > 0 &&  
                                formasDePago.map((p,i) => (
                                    <option	key={i} value={p}>{p}</option>
                                    ))
                            }
                        </select>
                    </div>  
                    <p className={error.forma_pago ? stylePagoV.danger : stylePagoV.pass}>{error.forma_pago}</p>                    
                    <div className={stylePagoV.buttons}>
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

export default Form_Pago_Venta;