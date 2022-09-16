import React, { useState } from "react";
import style from './Form_Comp.module.scss';
import swal from "sweetalert";

const formCF = {
    correlativo: '',
    categoria: '',
    kg: ''
};
const categorias = ["Vaquillon", "Novillo", "Vaca", "Toro"]

export const validate = (card) => {
    let error = {};

    if (!card.correlativo) error.correlativo = "Falta correlativo";
    else if (!/^([0-9])*$/.test(card.correlativo)) error.correlativo = "Correlativo debe ser un número";
    if (!card.categoria) error.categoria = "Falta categoría";
    if (!card.kg) error.kg = "Falta kg";
    else if (!/^([0-9])*$/.test(card.kg)) error.kg = "kg debe ser un número";
    return error;
};

export default function FaenaComp(){

    const [form, setForm] = useState(formCF);
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
        !error.categoria && form.categoria &&
        !error.kg && form.kg &&
        !error.correlativo && form.correlativo
        ){
        // dispatch(postFaena(form))
        swal({
            title: "Nueva Res",
            text: " Res cargada correctamente",
            icon: "success",
            button: "ok",
        })
        setForm(formCF);
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

    function handleSelect(e) {
        setForm({
            ...form,
            categoria: [...form.categoria, e.target.value ]
        })
    }

    return(
        <div className={style.cardForms}>
            <div className={style.item}>
                <h5 className={style.title}>Correlativo: </h5>
                <input
                    type="text"
                    value={form.correlativo}
                    id="correlativo"
                    name="correlativo"
                    onChange={handleChange}
                    placeholder="0000"
                    className={style.size2}
                />
            </div>
            <div className={style.item}>
                <select className="selectform" onChange={(e)=> handleSelect(e)}>
                    <option value="" selected>Categoría</option>
                    {categorias.length > 0 &&  
                    categorias.map((c) => (
                        <option	value={c}>{c}</option>
                    ))
                    }
                </select>
                <div className={style.numero}>
                    <h5 className={style.title}>kg </h5>
                    <input
                        type="text"
                        value={form.kg}
                        id="kg"
                        name="kg"
                        onChange={handleChange}
                        placeholder="00"
                        className={style.size2}
                    />
                </div>
            </div>
        </div>
    )
}