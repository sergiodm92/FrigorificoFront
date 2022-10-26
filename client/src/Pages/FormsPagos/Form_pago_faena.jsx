import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import NavBar from '../../Components/Navbar/Navbar'
import { getAllComrpas, getFaenaById, postNewPagoFaena, putSaldoFaena, setAlertPagoFaena } from "../../Redux/Actions/Actions.js";
import stylePagoF from './Form_pago.module.scss';

const formPF = {
    fecha: '',
    monto: 0,
    formaDePago:'',
    faenaID:0,
    frigorifico:''
};

const formasDePago=["Efectivo", "Transferencia"]

//validaciones
export const validate = (pago) => {
    let error = {};
    if (!pago.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\-)(0[1-9]|1[0-2])\2(\d{4})$/.test(pago.fecha)) error.fecha = "Fecha incorrecta";
    if (!pago.monto) error.monto = "Falta monto";
    else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(pago.monto)) error.monto = "Monto debe ser un número";
    return error;
};

const Form_Pago_Faena = () => {

    const {id}=useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getFaenaById(id))
    }, [dispatch])
    
    const faena = useSelector((state)=>state.FaenaById);
    const alert_msj= useSelector ((state)=>state.postNewPagoFaena);

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Pago creado con éxito"?"success":"warning", 
                button: "ok",
            })}
            dispatch(setAlertPagoFaena())
    }, [alert_msj])

    const [form, setForm] = useState(formPF);
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if(
        !error.fecha && form.fecha &&
        !error.monto && form.monto
        ){
            form.frigorifico=faena.frigorifico
            form.faenaID=id
            let saldo= faena.saldo - form.monto
            dispatch(putSaldoFaena(id, saldo))
            dispatch(postNewPagoFaena(form))
            document.getElementById("formaDePago").selectedIndex = 0
            setForm(formPF);
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
            formaDePago: e.target.value
        })
    }

    const handleCreate = () => {
        navigate("/Faenas")
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
        value : faena.saldo
        })

    return (
        <div className={stylePagoF.wallpaper}>
            <NavBar
            title={"Nuevo Pago"}
            />
            <div className={stylePagoF.formContainer}>
                <div className={stylePagoF.detallePro}>
                    <div className={stylePagoF.detalledivs}>
                        <h5 className={stylePagoF.title}>Tropa: </h5>
                        <h4 className={stylePagoF.nameP}>{faena.tropa}</h4>
                    </div>
                    <div className={stylePagoF.detalledivs}>
                        <h5 className={stylePagoF.title}>Saldo: </h5>
                        <h4 className={stylePagoF.nameP}>{saldoEnPesos}</h4>
                    </div>
                </div>
                <form className={stylePagoF.form}>
                    <div className={stylePagoF.formItem}>
                        <h5 className={stylePagoF.title}>Fecha: </h5>
                        <input
                            type="text"
                            value={form.fecha}
                            id="fecha"
                            name="fecha"
                            onChange={handleChange}
                            placeholder="00-00-0000"
                            className={error.monto & 'danger'}
                        />
                    </div>
                    <p className={error.monto ? stylePagoF.danger : stylePagoF.pass}>{error.monto}</p>
                    <div className={stylePagoF.formItem}>
                        <h5 className={stylePagoF.title}>Monto: </h5>
                        <input
                            type="text"
                            value={form.monto?form.monto:''}
                            id="monto"
                            name="monto"
                            onChange={handleChange}
                            placeholder="0.00"
                            className={error.monto & 'danger'}
                        />
                    </div>
                    <p className={error.monto ? stylePagoF.danger : stylePagoF.pass}>{error.monto}</p>
                    <div className={stylePagoF.formItem}>
                        <h5 className={stylePagoF.title}>Forma de Pago: </h5>
                        <select id="formaDePago" className="selectform" onChange={(e)=> handleSelectFP(e)}>
                            <option defaultValue>-</option>
                            {formasDePago.length > 0 &&  
                                formasDePago.map((p,i) => (
                                    <option	key={i} value={p}>{p}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <p className={error.forma_pago ? stylePagoF.danger : stylePagoF.pass}>{error.forma_pago}</p>                     
                    <div className={stylePagoF.buttons}>
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

export default Form_Pago_Faena;