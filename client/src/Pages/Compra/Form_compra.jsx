import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";

import NavBar from '../../Components/Navbar/Navbar'

import styleFormC from './Form_Compra.module.scss';

const formC = {
    proveedor: '',
    fecha: '',
    lugar: '',
    DTE: '',
    categoria: '',
    cantidad: '',
    kgVBrutos: '',
    desbaste: '',
    $kgVNeto: '',
    tropa: '',
    kgCarne: '',
    kgAchuras: '',
    $VentaAchuras: '',
    costoFlete: '',
    costoVEPkg: '',
    costoFaenakg: ''
    
};
const frigorificos = ["Natilla", "otro"]
const proveedores = ["Puchulo", "Stopa", "Castillo", "Dib", "Dulio Text", "C Walter"]

//validaciones
export const validate = (compra) => {
    let error = {};
    if (!compra.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(compra.fecha)) error.fecha = "Fecha incorrecta";
    if (!compra.DTE) error.DTE = "Falta N° DTE";
    else if (!/^([0-9])*$/.test(compra.DTE)) error.DTE = "DTE debe ser un número";
    if (!compra.cantidad) error.cantidad = "Falta cantidad";
    else if (!/^([0-9])*$/.test(compra.cantidad)) error.tropa = "N° debe ser un número";
    if (!compra.kgVBrutos) error.kgVBrutos = "Falta kgV Brutos";
    else if (!/^([0-9])*$/.test(compra.kgVBrutos)) error.kgVBrutos = "kgV Brutos debe ser un número";
    if (!/^([0-9])*$/.test(compra.desbaste)) error.desbaste = "kgV Brutos debe ser un número";
    if (!compra.$kgVNeto) error.$kgVNeto = "Falta $/kgV Neto";
    else if (!/^([0-9])*$/.test(compra.$kgVNeto)) error.$kgVNeto = "$/kgV Neto debe ser un número";
    if (!compra.tropa) error.tropa = "Falta tropa";
    else if (!/^([0-9])*$/.test(compra.tropa)) error.tropa = "Tropa debe ser un número";
    if (!compra.kgCarne) error.kgCarne = "Falta kg de Carne";
    else if (!/^([0-9])*$/.test(compra.kgCarne)) error.kgCarne = "kg de Carne debe ser un número";
    else if (!/^([0-9])*$/.test(compra.kgAchuras)) error.kgAchuras = "kg de Achuras debe ser un número";
    else if (!/^([0-9])*$/.test(compra.$VentaAchuras)) error.$VentaAchuras = "$ Venta de Achuras debe ser un número";
    if (!compra.costoFlete) error.costoFlete = "Falta Costo de Flete";
    else if (!/^([0-9])*$/.test(compra.costoFlete)) error.costoFlete = "Costo de Flete debe ser un número";
    if (!compra.costoVEPkg) error.costoVEPkg = "Falta costo de VEP/kg";
    else if (!/^([0-9])*$/.test(compra.costoVEPkg)) error.costoVEPkg = "costo de VEP/kg debe ser un número";
    if (!compra.costoFaenakg) error.costoFaenakg = "Falta Costo de Faena/kg";
    else if (!/^([0-9])*$/.test(compra.costoFaenakg)) error.costoFaenakg = "Costo de Faena/kg debe ser un número";
    return error;
};

const Form_Compra = () => {

    const dispatch = useDispatch();

    const [form, setForm] = useState(formC);
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

    const handleSubmit = () => {
        if(
        !error.fecha && form.fecha &&
        !error.tropa && form.tropa
        ){
        // dispatch(postFaena(form))
        alert( "Faena cargada correctamente");
        setForm(formC);
        }
        else {
        alert( "Datos incorrectos, porfavor intente nuevamente")
        }
    };

    function handleSelectFr(e) {
        setForm({
            ...form,
            frigorifico: [...form.frigorifico, e.target.value ]
        })
    }
    function handleSelectPr(e) {
        setForm({
            ...form,
            proveedor: [...form.proveedor, e.target.value ]
        })
    }

    const handleReset = () => {
        setForm(formC);
        setError({});
    };

    return (
        <div className={styleFormC.wallpaper}>
            <NavBar
            title={"Nueva Compra"}
            />
            <div className={styleFormC.formContainer}>
                <form className={styleFormC.form}>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Proveedor: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectPr(e)}>
                            <option value="" selected>-</option>
                            {proveedores.length > 0 &&  
                            proveedores.map((p) => (
                                    <option	value={p}>{p}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Fecha: </h5>
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
                    <p className={error.fecha ? styleFormC.danger : styleFormC.pass}>{error.fecha}</p>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Lugar: </h5>
                        <input
                            type="text"
                            value={form.lugar}
                            id="lugar"
                            name="lugar"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>N° DTE: </h5>
                        <input
                            type="text"
                            value={form.DTE}
                            id="DTE"
                            name="DTE"
                            onChange={handleChange}
                            className={error.DTE & 'danger'}
                        />
                    </div>
                    <p className={error.DTE ? styleFormC.danger : styleFormC.pass}>{error.DTE}</p>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Frigorífico: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectFr(e)}>
                            <option value="" selected>-</option>
                            {frigorificos.length > 0 &&  
                            frigorificos.map((f) => (
                                    <option	value={f}>{f}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Tropa: </h5>
                        <input
                            type="text"
                            value={form.tropa}
                            id="tropa"
                            name="tropa"
                            onChange={handleChange}
                            placeholder="00000"
                            className={error.tropa & 'danger'}
                        />
                    </div>
                    <p className={error.tropa ? styleFormC.danger : styleFormC.pass}>{error.tropa}</p>
                    <div className={styleFormC.buttons}>
                        <ShortButton
                            title="🧹Limpiar"
                            onClick={handleReset}
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

export default Form_Compra;