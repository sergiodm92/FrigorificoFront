import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import NavBar from '../../Components/Navbar/Navbar'

import styleFormV from './Form_Venta.module.scss';

const formV = {
    cliente:'',
    fecha: ''
};
const formComV = {
    categoria:'',
    res: '',
    correlativo:'',
    kg:'',
    costo_kg:'',
    margen:'',
    precio_kg:'',
};
const clientes = ["Don Alberto", "Quiroga"]
const categorias = ["Vaquillon", "Novillo", "Vaca", "Toro"]
const res=["total", "1/4T", "1/4D"]

//validaciones
export const validate = (venta) => {
    let error = {};
    if (!venta.correlativo) error.correlativo = "Falta correlativo";
    else if (!/^([0-9])*$/.test(venta.correlativo)) error.correlativo = "Correlativo debe ser un número";
    if (!venta.categoria) error.categoria = "Falta categoría";
    if (!venta.kg) error.kg = "Falta kg";
    else if (!/^([0-9])*$/.test(venta.kg)) error.kg = "kg debe ser un número";
    if (!venta.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(venta.fecha)) error.fecha = "Fecha incorrecta";
};

const Form_Venta = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(formV);
    const [formCV, setFormCV] = useState(formComV)
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

    const handleSubmitRes = () => {
        if(
        !error.fecha && form.fecha
        ){
        // dispatch(postFaena(form))
        swal({
            title: "Nueva Venta",
            text: "Venta cargada correctamente",
            icon: "success",
            button: "ok",
        })
        setForm(formComV);
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

    const handleSubmit = () => {
        if(
        !error.fecha && form.fecha
        ){
        // dispatch(postVentaRes(formCV))
        swal({
            title: "Nueva Venta",
            text: "Venta cargada correctamente",
            icon: "success",
            button: "ok",
        })
        setForm(formV);
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

    function handleSelectCl(e) {
        setForm({
            ...form,
            cliente: [...form.cliente, e.target.value ]
        })
    }
    function handleSelectRes(e) {
        setForm({
            ...formCV,
            res: [...formCV.res, e.target.value ]
        })
    }
    function handleSelectCat(e) {
        setForm({
            ...formCV,
            categoria: [...formCV.categoria, e.target.value ]
        })
    }

    const handleDet = () => {
        navigate("/Ventas")
    };

    return (
        <div className={styleFormV.wallpaper}>
            <NavBar
            title={"Nueva Venta"}
            />
            <div className={styleFormV.formContainer}>
                <form className={styleFormV.form}>
                    <div className={styleFormV.formItem}>
                        <h5 className={styleFormV.title}>Cliente: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectCl(e)}>
                            <option value="" selected>-</option>
                            {clientes.length > 0 &&  
                            clientes.map((c) => (
                                    <option	value={c}>{c}</option>
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
                    <div className={styleFormV.formItem2}>
                        <div className={styleFormV.item}>
                            <select className="selectform" onChange={(e)=> handleSelectCat(e)}>
                                <option value="" selected>Categoría</option>
                                {categorias.length > 0 &&  
                                categorias.map((c) => (
                                    <option	value={c}>{c}</option>
                                ))
                                }
                            </select>
                            <select className="selectform" onChange={(e)=> handleSelectRes(e)}>
                                <option value="" selected>res</option>
                                {res.length > 0 &&  
                                res.map((c) => (
                                    <option	value={c}>{c}</option>
                                ))
                                }
                            </select>
                        </div>
                        <div className={styleFormV.item}>
                            <h5 className={styleFormV.title}>Correlativo: </h5>
                            <input
                                type="text"
                                value={form.correlativo}
                                id="correlativo"
                                name="correlativo"
                                onChange={handleChange}
                                placeholder="0000"
                                className={styleFormV.size2}
                            />
                        </div>
                        <div className={styleFormV.item}>
                            <h5 className={styleFormV.title}>kg </h5>
                            <input
                                type="text"
                                value={form.kg}
                                id="kg"
                                name="kg"
                                onChange={handleChange}
                                placeholder="00"
                                className={styleFormV.size2}
                            />
                        </div>
                        <div className={styleFormV.item}>
                            <h5 className={styleFormV.title}>Costo/kg </h5>
                            <input
                                type="text"
                                value={form.correlativo}
                                id="correlativo"
                                name="correlativo"
                                onChange={handleChange}
                                placeholder="0000"
                                className={styleFormV.size2}
                            />
                        </div>
                        <div className={styleFormV.item}>
                            <h5 className={styleFormV.title}>Margen (%)</h5>
                            <input
                                type="text"
                                value={form.kg}
                                id="kg"
                                name="kg"
                                onChange={handleChange}
                                placeholder="00"
                                className={styleFormV.size2}
                            />
                        </div>
                        <div className={styleFormV.item}>
                            <h5 className={styleFormV.title}>$/kg </h5>
                            <input
                                type="text"
                                value={form.kg}
                                id="kg"
                                name="kg"
                                onChange={handleChange}
                                placeholder="00"
                                className={styleFormV.size2}
                            />
                        </div>
                    </div>
                    <div className={styleFormV.button}>
                        <ButtonNew
                            style={"rigth"}
                            icon={"rigth"}
                            onClick={handleSubmitRes}
                        />
                    </div>
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

export default Form_Venta;