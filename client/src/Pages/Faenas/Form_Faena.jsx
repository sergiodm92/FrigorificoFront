import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {postNewFaena, postNewRes} from "../../Redux/Actions/Actions";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import NavBar from '../../Components/Navbar/Navbar';
import styleFormF from './Form_Faena.module.scss';
import CardReses from "../../Components/Cards/CardReses/CardReses";


//Form Faena
const formF = {
    fecha: '',
    frigorifico: '',
    tropa: '',
    proveedor: '',
    detalle:[],
    costoFaenakg:'',
    total_kg:'',
    total_medias:'',
    costo_total:'',
    saldo:''
};
//Form para cargar las reses del detalle de Faena
const formComF = {
    correlativo: '',
    categoria: '',
    kg: ''
};
//var para sumar medias
var m=0

//Arrays para los selects
const frigorificos = ["Natilla", "El Hueco"]
const proveedores = ["Puchulo", "Stopa", "Castillo", "Dib", "Dulio Text", "C Walter"]
const categorias = ["Vaquillon", "Novillo", "Vaca", "Toro"]

//validaciones form Faena
export const validate = (faena) => {
    let error = {};
    if (!faena.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(faena.fecha)) error.fecha = "Fecha incorrecta";
    if (!faena.tropa) error.tropa = "Falta tropa";
    else if (!/^([0-9])*$/.test(faena.tropa)) error.tropa = "Tropa debe ser un número";
    if (!faena.frigorifico) error.frigorifico = "Falta frigorifico";
    if (!faena.proveedor) error.proveedor = "Falta proveedor";
    if (!faena.costoFaenakg) error.costoFaenakg = "Falta costo de Faena/kg";
    else if (!/^([0-9])*$/.test(faena.costoFaenakg)) error.costoFaenakg = "costo de Faena debe ser un número";
    if (faena.detalle.length<1) error.detalle = "Falta detalle";
    return error;
};

//validaciones de reses
export const validate2 = (res) => {
    let error2 = {};
    if (!res.correlativo) error2.correlativo = "Falta correlativo";
    else if (!/^([0-9])*$/.test(res.correlativo)) error2.correlativo = "Correlativo debe ser un número";
    if (!res.categoria) error2.categoria = "Falta categoría";
    if (!res.kg) error2.kg = "Falta kg";
    else if (!/^([0-9])*$/.test(res.kg)) error2.kg = "kg debe ser un número";
    return error2;
};


const Form_Faena = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Estados locales
    const [form, setForm] = useState(formF);
    const [formCF, setFormCF] = useState(formComF)
    const [error, setError] = useState({});
    const [error2, setError2] = useState({});


    //handleChange de la faena completa
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

    //handleChange de reses
    const handleChangeCF = (e) => { 
        e.preventDefault();
        setError2(
        validate2({
            ...formCF,
            [e.target.name]: e.target.value,
        })
        );
        setFormCF({
            ...formCF,
            [e.target.name]: e.target.value,
        });
    };

    //handleSubmit de las reses
    const handleSubmitRes = (e) => {   
        e.preventDefault();
        if(
            !error2.categoria && formCF.categoria &&
            !error2.kg && formCF.kg &&
            !error2.correlativo && formCF.correlativo
        ){
            form.total_kg=form.total_kg+formCF.kg
            console.log(form.total_kg)
            m++
            form.total_medias = m
            console.log(form.total_medias)
            form.detalle.push(formCF)
            setFormCF(formComF);
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

    //handleSubmit de la faena completa
    const handleSubmit = (e) => {
        e.preventDefault();
        if(
        !error.fecha && form.fecha &&
        !error.frigorífico && form.frigorifico &&
        !error.proveedor && form.proveedor &&
        !error.detalle && form.detalle &&
        !error.tropa && form.tropa
        ){
            form.costo_total=form.costoFaenakg*form.total_kg
            console.log(form.costo_total)
            form.saldo=form.costo_total
            console.log(form.saldo)
            dispatch(postNewFaena(form))
            form.detalle.map((a)=>dispatch(postNewRes(a)))
            swal({
                title: "Nueva Faena",
                text: " Faena cargada correctamente",
                icon: "success",
                button: "ok",
            })
            setForm(formF);
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

    //Select de frigoríficos
    function handleSelectFr(e) {
        setForm({
            ...form,
            frigorifico:  e.target.value 
        })
    }
    //Select de proveedores
    function handleSelectPr(e) {
        setForm({
            ...form,
            proveedor:e.target.value 
        })
    }
    //Select de categorías
    function handleSelect(e) {
        setFormCF({
            ...formCF,
            categoria:  e.target.value 
        })
    }

    //ir faenas para ver el detalle
    const handleDet = () => {
        navigate("/Faenas")
    };

    //funcion para eliminar reses del detalle
    const handleDelete = (e)=>{
        setForm({
            ...form,
            detalle: form.detalle.filter(d => d !== e)
        })
    }

    return (
        <div className={styleFormF.wallpaper}>
            <NavBar
            title={"Nueva Faena"}
            />
            <div className={styleFormF.formContainer}>
                <form className={styleFormF.form}>
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Fecha: </h5>
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
                    <p className={error.fecha ? styleFormF.danger : styleFormF.pass}>{error.fecha}</p>
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Frigorífico: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectFr(e)}>
                            <option value="" selected>-</option>
                            {frigorificos.length > 0 &&  
                            frigorificos.map((f) => (
                                    <option	value={f}>{f}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Tropa: </h5>
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
                    <p className={error.tropa ? styleFormF.danger : styleFormF.pass}>{error.tropa}</p>
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Proveedor: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectPr(e)}>
                            <option value="" selected>-</option>
                            {proveedores.length > 0 &&  
                            proveedores.map((p) => (
                                    <option	value={p}>{p}</option>
                                    ))
                            }
                        </select>
                    </div>

                    {/*----------------Carga del detalle---------------------*/}
                    <div className={styleFormF.formItem2}>
                        <div className={styleFormF.item}>
                            <h5 className={styleFormF.title}>Correlativo: </h5>
                            <input
                                type="text"
                                value={formCF.correlativo}
                                id="correlativo"
                                name="correlativo"
                                onChange={handleChangeCF}
                                placeholder="0000"
                                className={styleFormF.size2}
                            />
                        </div>
                        <div className={styleFormF.item}>
                            <select className="selectform" onChange={(e)=> handleSelect(e)}>
                                <option value="" selected>Categoría</option>
                                {categorias.length > 0 &&  
                                categorias.map((c) => (
                                    <option	value={c}>{c}</option>
                                ))
                                }
                            </select>
                            <div className={styleFormF.numero}>
                                <h5 className={styleFormF.title}>kg </h5>
                                <input
                                    type="text"
                                    value={formCF.kg}
                                    id="kg"
                                    name="kg"
                                    onChange={handleChangeCF}
                                    placeholder="00"
                                    className={styleFormF.size2}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styleFormF.button}>
                        <ButtonNew
                            onClick={handleSubmitRes}
                            style={"rigth"}
                            icon={"rigth"}
                        />
                    </div>
                    {/*-----------------------------------------------------------*/}
                    
                    {form.detalle.length ?
                        form.detalle.map((e)=>{
                            return(
                                <CardReses
                                    correlativo={e.correlativo}
                                    categoria={e.categoria}
                                    kg={e.kg}
                                    onClick={()=> handleDelete(e)}
                                />
                            )
                        })
                        :null
                    }
                    <div className={styleFormF.formItem}>
                        <div>
                            <h5 className={styleFormF.title}>Costo Faena/kg: </h5>
                        </div>
                        <div className={styleFormF.numero}>
                            <h5 className={styleFormF.title}>$ </h5>
                            <input
                                type="text"
                                value={form.costoFaenakg}
                                id="costoFaenakg"
                                name="costoFaenakg"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormF.size2}
                            />
                        </div>
                    </div>
                    <p className={error.costoFaenakg ? styleFormF.danger : styleFormF.pass}>{error.costoFaenakg}</p>
                    <div className={styleFormF.buttons}>
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

export default Form_Faena;