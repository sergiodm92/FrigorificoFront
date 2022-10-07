import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {getAllProveedores, postNewFaena, postNewRes, setAlertFaena} from "../../Redux/Actions/Actions";
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
    costoFaenakg:null,
    total_kg:0,
    total_medias:0,
    costo_total:0,
    saldo:0
};
//Form para cargar las reses del detalle de Faena
const formComF = {
    garron: null,
    kg1:null,
    kg2:null,
    correlativo: '',
    categoria: '',
    kg: null
};
//var para sumar medias
var m=0;
var elHueco=[];

//Array para select de frigorífico
const frigorificos = ["Natilla", "El Hueco"]
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
    if (!/^([0-9])*$/.test(res.correlativo)) error2.correlativo = "Correlativo debe ser un número";
    if (!/^([0-9])*$/.test(res.garron)) error2.garron = "Garrón debe ser un número";
    else if (!/^([0-9])*$/.test(res.kg)) error2.kg = "kg debe ser un número";
    else if (!/^([0-9])*$/.test(res.kg1)) error2.kg1 = "kg1 debe ser un número";
    else if (!/^([0-9])*$/.test(res.kg2)) error2.kg2 = "kg2 debe ser un número";
    if (!res.categoria) error2.categoria = "Falta categoría";
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


    useEffect(() => {
        dispatch(getAllProveedores())
    }, [dispatch])

    //Estados globales
    const alert_msj= useSelector ((state)=>state.postFaena);
    
    const proveedores = useSelector((state)=>state.AllProveedores);

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Faena creada con éxito"?"success":"warning", 
                button: "ok",
            })
        dispatch(setAlertFaena())
        form.detalle=[]
        }
    }, [alert_msj])


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
        console.log(formCF)
        try{
            if(formCF.garron!==null){
            // dividimos garron en dos reses con correlativo
            //primera res correlativo garron-kg1
                var formRes={}
                formRes.categoria=formCF.categoria
                formRes.correlativo=formCF.garron+"-"+formCF.kg1
                formRes.kg=formCF.kg1
                console.log(formRes)
                form.detalle.push(formRes)
            //segunda res correlativo garron-kg2
                formCF.correlativo=formCF.garron+"-"+formCF.kg2
                formCF.kg=formCF.kg2
                console.log(formCF)
                form.detalle.push(formCF)
            }
            else{
                form.detalle.push(formCF)
            }
            document.getElementById("categoria").selectedIndex = 0
            setFormCF(formComF);
        }
        catch (err) {
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
        form.detalle.map((e)=>{
            e.tropa=form.tropa
            e.stock=true
            e.fecha=form.fecha
            e.frigorifico=form.frigorifico
            setTimeout(()=>{
                dispatch(postNewRes(e))
            }, 2000)
            m++
            form.total_kg= form.total_kg + e.kg*1
        }) 
        form.total_medias = m
        form.costo_total=form.costoFaenakg*1*form.total_kg*1
        form.saldo=form.costo_total
        dispatch(postNewFaena(form))
        document.getElementById("proveedor").selectedIndex = 0
        document.getElementById("frigorifico").selectedIndex = 0
        setForm(formF);
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
                        <select id="frigorifico" className="selectform" onChange={(e)=> handleSelectFr(e)}>
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
                        <select id="proveedor" className="selectform" onChange={(e)=> handleSelectPr(e)}>
                            <option value="" selected>-</option>
                            {proveedores.length > 0 &&  
                            proveedores.map((p) => (
                                    <option	value={p.nombre}>{p.nombre}</option>
                                    ))
                            }
                        </select>
                    </div>

                    {/*----------------Carga del detalle---------------------*/}
                    <div className={styleFormF.formItem2}>
                        {form.frigorifico==="El Hueco"?
                            <div className={styleFormF.inbox}>
                                <div className={styleFormF.item}>
                                    <h5 className={styleFormF.title}>Garrón: </h5>
                                    <input
                                        type="text"
                                        value={formCF.garron}
                                        id="garron"
                                        name="garron"
                                        onChange={handleChangeCF}
                                        placeholder="0000"
                                        className={styleFormF.size2}
                                    />
                                </div>
                                <div className={styleFormF.item}>
                                    <h5 className={styleFormF.title}>kg1: </h5>
                                    <input
                                        type="text"
                                        value={formCF.kg1}
                                        id="kg1"
                                        name="kg1"
                                        onChange={handleChangeCF}
                                        placeholder="0000"
                                        className={styleFormF.size2}
                                    />
                                </div>
                                <div className={styleFormF.item}>
                                    <h5 className={styleFormF.title}>kg2: </h5>
                                    <input
                                        type="text"
                                        value={formCF.kg2}
                                        id="kg2"
                                        name="kg2"
                                        onChange={handleChangeCF}
                                        placeholder="0000"
                                        className={styleFormF.size2}
                                    />
                                </div>
                                <div className={styleFormF.item}>
                                    <select id="categoria" className="selectform" onChange={(e)=> handleSelect(e)}>
                                        <option value="" selected>Categoría</option>
                                            {categorias.length > 0 &&  
                                            categorias.map((c) => (
                                                <option	value={c}>{c}</option>
                                            ))
                                            }
                                    </select>
                                </div>
                            </div>
                            :
                            <div className={styleFormF.inbox}>
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
                                    <select id="categoria" className="selectform" onChange={(e)=> handleSelect(e)}>
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
                            </div>}
                    </div>
                    <div className={styleFormF.button}>
                        <ButtonNew
                            onClick={handleSubmitRes}
                            style={"right"}
                            icon={"right"}
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
                        :elHueco.length?
                            elHueco.map((e)=>{
                                return(
                                    <CardReses
                                        garron={e.garron}
                                        categoria={e.categoria}
                                        kg1={e.kg1}
                                        kg2={e.kg2}
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
                        <div className={styleFormF.shortButtons}>
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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form_Faena;