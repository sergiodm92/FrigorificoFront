import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {getAllProveedores, postNewFaena, postNewRes, setAlert} from "../../Redux/Actions/Actions";
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
    costo_faena_kg:0,
    costoFaenakg:null,
    total_kg:0,
    total_medias:0,
    costo_total:0,
    saldo:0,
    estado_compra:"false"
};
//Form para cargar las reses del detalle de Faena
const formComF = {
    kg: '',
    garron: '',
    kg1: '',
    kg2:'',
    correlativo: '',
    categoria: ''
    
};
//var para sumar medias
var m=0;
var elHueco=[];

//Array para select de frigorífico
const frigorificos = ["Natilla", "El Hueco"]
const categorias = ["Vaquillona", "Novillito", "Vaca", "Toro", "Novillo Pesado"]


//validaciones form Faena
export const validate = (faena) => {
    let error = {};
    if (!faena.fecha) error.fecha = "Falta fecha";
    if (!/^([0-2][0-9]|3[0-1])(\-)(0[1-9]|1[0-2])\2(\d{4})$/.test(faena.fecha)) error.fecha = "Fecha incorrecta";
    if (!faena.frigorifico) error.frigorifico = "Falta frigorifico";
    if (!faena.tropa) error.tropa = "Falta tropa";
    if (!faena.proveedor) error.proveedor = "Falta proveedor";
    if (!faena.costo_faena_kg) error.costo_faena_kg = "Falta costo de Faena/kg";
    if (!/^\d*(\.\d{1})?\d{0,1}$/.test(faena.costo_faena_kg)) error.costo_faena_kg = "costo de Faena debe ser un número";
    if (faena.detalle.length<1) error.detalle = "Falta detalle";
    return error;
};

//validaciones de reses frigorifico Natilla
export const validate2 = (res) => {
    let error2 = {};
    if (!/^\d*(\.\d{1})?\d{0,1}$/.test(res.kg)) error2.kg = "kg debe ser un número";
    if (res.kg>400) error2.kg = "kg debe ser menor";
    if (!res.categoria) error2.categoria = "Falta categoría";
    return error2;
};

//validaciones de reses frigorifico El Hueco
export const validate3 = (res) => {
    let error3 = {};
    if (!/^\d*(\.\d{1})?\d{0,1}$/.test(res.kg1)) error3.kg1 = "kg1 debe ser un número";
    if (res.kg1>400) error3.kg1 = "kg1 debe ser menor";
    if (!/^\d*(\.\d{1})?\d{0,1}$/.test(res.kg2)) error3.kg2 = "kg2 debe ser un número";
    if (res.kg2>400) error3.kg2 = "kg2 debe ser menor";
    if (!res.categoria) error3.categoria = "Falta categoría";
    return error3;
};


const Form_Faena = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Estados locales
    const [form, setForm] = useState(formF);
    const [formCF, setFormCF] = useState(formComF)
    const [error, setError] = useState({});
    const [error2, setError2] = useState({});
    const [error3, setError3] = useState({});
    let [kg_totales,setkg_totales] = useState(0)


    useEffect(() => {
        dispatch(getAllProveedores())
    }, [dispatch])

    //Estados globales
    const alert_msj= useSelector ((state)=>state.alert_msj);
    
    const proveedores = useSelector((state)=>state.AllProveedores);

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Faena creada con éxito"?"success":"warning", 
                button: "ok",
            })
        dispatch(setAlert())
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

    const handleChangeCF2 = (e) => { 
        e.preventDefault();
        setError3(
        validate3({
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
        try{
            if(form.frigorifico==="El Hueco"){
                if(
                    !error3.kg1 && formCF.kg1 &&
                    !error3.kg2 && formCF.kg2                    
                ){
                    // dividimos garron en dos reses con correlativo
                    //primera res correlativo garron-kg1
                        var formRes={}
                        formRes.categoria=formCF.categoria
                        formRes.correlativo=formCF.garron+"-A"+formCF.kg1
                        formRes.kg=formCF.kg1*1
                        
                        form.detalle.unshift(formRes)
                    //segunda res correlativo garron-kg2
                        formCF.correlativo=formCF.garron+"-B"+formCF.kg2
                        formCF.kg=formCF.kg2*1
                        form.detalle.unshift(formCF)
                        setkg_totales(kg_totales+formCF.kg1*1+formCF.kg2*1)
                }
            }
            else if(form.frigorifico==="Natilla"){
                if(
                    !error2.kg && formCF.kg
                ){
                    formCF.kg=formCF.kg*1
                    setkg_totales(kg_totales+formCF.kg*1)
                    form.detalle.unshift(formCF)
                }
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
    }

    //handleSubmit de la faena completa
    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            !error.fecha && form.fecha &&
            !error.frigorifico && form.frigorifico &&
            !error.tropa && form.tropa &&
            !error.proveedor && form.proveedor &&
            !error.costo_faena_kg && form.costo_faena_kg &&
            !error.detalle && form.detalle
        ){
        form.detalle.map((e)=>{
            e.tropa=form.tropa
            e.stock=true
            e.fecha=form.fecha
            e.frigorifico=form.frigorifico
            setTimeout(()=>{
                dispatch(postNewRes(e))
            }, 2000)
            form.total_kg= form.total_kg + e.kg*1
        }) 
        form.total_medias = form.detalle.length
        form.costo_total=form.costo_faena_kg*1*form.total_kg*1
        form.saldo=form.costo_total
        dispatch(postNewFaena(form))
        setkg_totales(0)
        document.getElementById("proveedor").selectedIndex = 0
        document.getElementById("frigorifico").selectedIndex = 0
        setForm(formF);
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
            detalle: form.detalle.filter(d => d !== e )
            
        })
        setkg_totales(kg_totales-e.kg*1)
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
                            <option defaultValue>-</option>
                            {frigorificos.length > 0 &&  
                            frigorificos.map((f,i) => (
                                    <option key={i}	value={f}>{f}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <p className={error.frigorifico ? styleFormF.danger : styleFormF.pass}>{error.frigorifico}</p>
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
                        <select id="proveedor" className="selectform" defaultValue="-" onChange={(e)=> handleSelectPr(e)}>
                            <option defaultValue>-</option>
                            {proveedores.length > 0 &&  
                            proveedores.map((p,i) => (
                                    <option key={i}	value={p.nombre}>{p.nombre.length<20?p.nombre:p.nombre.slice(0,17)}</option>
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
                                        onChange={handleChangeCF2}
                                        placeholder="0000"
                                        className={styleFormF.size2}
                                    />
                                </div>
                                <p className={error3.garron ? styleFormF.danger : styleFormF.pass}>{error3.garron}</p>
                                <div className={styleFormF.item}>
                                    <h5 className={styleFormF.title}>kg1: </h5>
                                    <input
                                        type="text"
                                        value={formCF.kg1}
                                        id="kg1"
                                        name="kg1"
                                        onChange={handleChangeCF2}
                                        placeholder="0000"
                                        className={styleFormF.size2}
                                    />
                                </div>
                                <p className={error3.kg1 ? styleFormF.danger : styleFormF.pass}>{error3.kg1}</p>
                                <div className={styleFormF.item}>
                                    <h5 className={styleFormF.title}>kg2: </h5>
                                    <input
                                        type="text"
                                        value={formCF.kg2}
                                        id="kg2"
                                        name="kg2"
                                        onChange={handleChangeCF2}
                                        placeholder="0000"
                                        className={styleFormF.size2}
                                    />
                                </div>
                                <p className={error3.kg2 ? styleFormF.danger : styleFormF.pass}>{error3.kg2}</p>
                                <div className={styleFormF.item}>
                                    <select id="categoria" className="selectform" onChange={(e)=> handleSelect(e)}>
                                        <option  defaultValue>Categoría</option>
                                            {categorias.length > 0 &&  
                                            categorias.map((c,i) => (
                                                <option key={i}	value={c}>{c}</option>
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
                                <p className={error2.correlativo ? styleFormF.danger : styleFormF.pass}>{error2.correlativo}</p>
                                <div className={styleFormF.item}>
                                    <select id="categoria" className="selectform" onChange={(e)=> handleSelect(e)}>
                                        <option value="" defaultValue>Categoría</option>
                                            {categorias.length > 0 &&  
                                            categorias.map((c,i) => (
                                                <option	value={c} key={i} >{c}</option>
                                            ))
                                            }
                                    </select>
                                    <div className={styleFormF.numero}>
                                        <h5 className={styleFormF.title}>kg </h5>
                                        <input
                                            type="number"
                                            value={formCF.kg}
                                            id="kg"
                                            name="kg"
                                            onChange={handleChangeCF}
                                            placeholder="00"
                                            className={styleFormF.size2}
                                        />
                                    </div>
                                    <p className={error2.kg ? styleFormF.danger : styleFormF.pass}>{error2.kg}</p>
                                </div>
                            </div>}
                    </div>
                    <div className={styleFormF.button}>
                        <ButtonNew
                            onClick={Object.entries(error2).length===0 || Object.entries(error3).length===0 ? handleSubmitRes : null}
                            style={"right"}
                            icon={"right"}
                        />
                    </div>
                    
                    {form.detalle.length ?
                        form.detalle.map((e,i)=>{
                            return(
                                <CardReses
                                    key={i}
                                    correlativo={e.correlativo}
                                    categoria={e.categoria}
                                    kg={e.kg}
                                    onClick={()=> handleDelete(e)}
                                />
                            )
                        })
                        :elHueco.length?
                            elHueco.map((e,i)=>{
                                return(
                                    <CardReses
                                        key={i}
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
                                value={form.costo_faena_kg}
                                id="costo_faena_kg"
                                name="costo_faena_kg"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormF.size2}
                            />
                        </div>
                    </div>
                    <p className={error.costoFaenakg ? styleFormF.danger : styleFormF.pass}>{error.costoFaenakg}</p>
                    {kg_totales?
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Kg totales: {kg_totales}kg</h5>
                    </div>:null}
                    {form.detalle.length?
                    <div className={styleFormF.formItem}>
                        <h5 className={styleFormF.title}>Total Reses: {form.detalle.length}</h5>
                    </div>:null}
                    <div className={styleFormF.buttons}>
                        <div className={styleFormF.shortButtons}>
                            <ShortButton
                                title="📃 Detalle"
                                onClick={handleDet}
                                color="primary"
                            />
                            <ShortButton
                                title="✔ Confirmar"
                                onClick={Object.entries(error).length===0? handleSubmit : null }
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