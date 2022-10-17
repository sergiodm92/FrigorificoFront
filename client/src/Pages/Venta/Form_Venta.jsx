import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import CardReses from "../../Components/Cards/CardReses/CardReses";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import NavBar from '../../Components/Navbar/Navbar'

import styleFormV from './Form_Venta.module.scss';
import { getAllClientes, getAllReses, getClienteByName, postNewVentaCarne, putCuartoRes, putSaldoCliente, putStockRes, setAlertVentaCarne } from "../../Redux/Actions/Actions";

//Form Venta
var formV = {
    cliente:'',
    fecha: '',
    detalle:[],
    saldo:0
};
//Form para cargar el detalle de la venta
var formComV = {
    id:null,
    correlativo:'',
    categoria:'',
    total_media: null,
    kg:null,
    kg_total:null,
    costo_kg:0,
    precio_kg:0
};


// Arrays para los selects
const categorias = ["Vaquillon", "Novillo", "Vaca", "Toro"]
const res=["total", "1/4T", "1/4D"]

//validaciones form Venta
export const validate = (venta) => {
    let error = {};
    if (!venta.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(venta.fecha)) error.fecha = "Fecha incorrecta";
    if (!venta.cliente) error.cliente = "Falta cliente";
    if (venta.detalle.length<1) error.detalle = "Falta detalle";
    return error;
};

//Validacion del detalle
export const validate2 = (res) => {
    let error2 = {};
    if (!res.categoria) error2.categoria = "Falta categoría";
    if (!res.total_media) error2.total_media = "Falta res";
    if (!res.correlativo) error2.correlativo = "Falta correlativo";
    if (!res.kg) error2.kg = "Falta kg";
    else if (!/^([0-9])*$/.test(res.kg)) error2.kg = "kg debe ser un número";
    if (!/^([0-9])*$/.test(res.precio_kg)) error2.precio_kg = "Precio/kg debe ser un número";
    return error2;
};

const Form_Venta = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Estados locales
    const [form, setForm] = useState(formV);
    const [formCV, setFormCV] = useState(formComV)
    const [error, setError] = useState({});
    const [error2, setError2] = useState({});
    const [resSelect,setresSelect] = useState({})
    const [margen,setMargen]=useState(0)
    const [arrResesTotales,setArrResesTotales] = useState([])
    
    useEffect(() => {
        dispatch(getAllClientes())
        dispatch(getAllReses())
    }, [dispatch])

    //estados globales
    const alert_msj= useSelector ((state)=>state.postVentaCarne);
    const stock=useSelector((state)=>state.AllResesStockTrue)
    console.log(stock)
    const clientes = useSelector((state)=>state.AllClientes);
    
    let stockByCat=stock.filter(a=> a.categoria===formCV.categoria && a.precio_kg)

    useEffect(() => {
        if(formCV.correlativo!=="")setresSelect(stock.find(a=>a.correlativo===formCV.correlativo))
        if(formCV.precio_kg!==0)setMargen((((formCV.precio_kg-(resSelect.precio_kg*1))/formCV.precio_kg)*100).toFixed(2))
        if(formCV.total_media==="total")formCV.kg=resSelect.kg
        if(formCV.total_media!=="total"){
            formCV.kg_total=resSelect.kg
            formCV.id=resSelect.id
        }
    }, [formCV])


    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Venta creada con éxito"?"success":"warning", 
                button: "ok",
            })}
            dispatch(setAlertVentaCarne())
    }, [alert_msj])

    useEffect(() => {
        if(form.cliente){
            dispatch(getClienteByName(form.cliente))
        }
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

    //handleChange del detalle
    const handleChangeCV = (e) => {
        e.preventDefault();
        setError2(
        validate2({
            ...formCV,
            [e.target.name]: e.target.value,
        })
        );
        setFormCV({
            ...formCV,
            [e.target.name]: e.target.value,
        });
    };

    //handleSubmit del detalle
    const handleSubmitRes = (e) => { 
        e.preventDefault();
        if(
            !error2.categoria && formCV.categoria &&
            !error2.total_media && formCV.total_media &&
            !error2.correlativo && formCV.correlativo &&
            !error2.kg && formCV.kg &&
            !error2.precio_kg && formCV.precio_kg
        ){
            formCV.costo_kg=resSelect.precio_kg
            form.detalle.push(formCV)
            if(formCV.total_media=="total") arrResesTotales.push(formCV.correlativo)
            setFormCV(formComV);
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

    //handleSubmit de la Venta completa
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(error)
        console.log(form)
        if(
            !error.fecha && form.fecha &&
            !error.cliente && form.cliente
        ){
            if(form.detalle.length>0){
                form.detalle.map(a=> {
                    form.saldo+=a.kg*a.precio_kg
                    if(a.total_media=="1/4T"){
                        let correlativo=a.correlativo + "D"
                        let kg= a.kg_total - a.kg
                        let id=a.id
                        dispatch(putCuartoRes(id, kg, correlativo ))
                    }
                    else if(a.total_media=="1/4D"){
                        let correlativo=a.correlativo + "T"
                        let kg= a.kg_total - a.kg
                        let id=a.id
                        dispatch(putCuartoRes(id, kg, correlativo ))
                    }
                })
            }
            arrResesTotales.map(a=>{
                setTimeout(()=>{
                        dispatch(putStockRes(a))
            }, 2000)
            })
            let saldo = cliente.saldo + form.saldo
            dispatch(putSaldoCliente(cliente.id, saldo))
            dispatch(postNewVentaCarne(form))
            console.log(form)
            setForm(formV);
            setArrResesTotales([])
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
            cliente: e.target.value
        })
    }

    //Select de Correlativo
    function handleSelectCorr(e) {
        setFormCV({
            ...formCV,
            correlativo: e.target.value
        })
    }

    //Select de las reses
    function handleSelectRes(e) {
        setFormCV({
            ...formCV,
            total_media: e.target.value
        })
    }

    //Select de las categorias
    function handleSelectCat(e) {
        setFormCV({
            ...formCV,
            categoria: e.target.value
        })
    }

    //ir a ventas para ver el detalle
    const handleDet = () => {
        navigate("/Ventas")
    };

    //funcion para eliminar reses del detalle
    const handleDelete = (e)=>{
        setForm({
            ...form,
            detalle: form.detalle.filter(d => d !== e)
        })
    }

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
                                    <option	value={c.nombre}>{c.nombre}</option>
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
                    
                    {/*----------------Carga del detalle---------------------*/}
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
                        <div className={styleFormV.formItem}>
                        <h5 className={styleFormV.title}>Correlativo: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectCorr(e)}>
                            <option value="" selected>-</option>
                            {stockByCat.length > 0 &&  
                                stockByCat.map((c) => (
                                    <option	value={c.correlativo}>{c.correlativo}</option>
                                    ))
                            }
                        </select>
                    </div>
                    
                    {
                        formCV.total_media==="total"?
                        
                        <div>
                            <div className={styleFormV.item}>
                                <h5 className={styleFormV.title}>kg </h5>
                                <h5 className={styleFormV.title}>{resSelect.kg}</h5>
                            </div>
                            <div className={styleFormV.item}>
                                <h5 className={styleFormV.title}>Costo/kg </h5>
                                <h5 className={styleFormV.title}>{typeof(resSelect.precio_kg)!=="number"? null : (resSelect.precio_kg*1).toFixed(2)}</h5>
                            </div>
                        </div>
                        :
                        <div>
                            <div className={styleFormV.item}>
                                <h5 className={styleFormV.title}>kg total </h5>
                                <h5 className={styleFormV.title}>{resSelect.kg}</h5>
                            </div>
                            <div className={styleFormV.item}>
                                <h5 className={styleFormV.title}>Costo/kg </h5>
                                <h5 className={styleFormV.title}>{typeof(resSelect.precio_kg)!=="number"? null : (resSelect.precio_kg*1).toFixed(2)}</h5>
                            </div>
                            <div className={styleFormV.item}>
                                <h5 className={styleFormV.title}>kg </h5>
                                <input
                                    type="number"
                                    value={formCV.kg}
                                    id="kg"
                                    name="kg"
                                    onChange={handleChangeCV}
                                    placeholder="000"
                                    className={styleFormV.size2}
                                />
                            </div>
                        </div>
                    }
                        <div className={styleFormV.item}>
                            <h5 className={styleFormV.title}>$/kg </h5>
                            <input
                                type="number"
                                value={formCV.precio_kg}
                                id="precio_kg"
                                name="precio_kg"
                                onChange={handleChangeCV}
                                placeholder="0.00"
                                className={styleFormV.size2}
                            />
                        </div>
                        <div className={styleFormV.item}>
                            <h5 className={styleFormV.title}>Margen(%) </h5>
                            <h5 className={styleFormV.title}>{margen}</h5>
                        </div>
                    </div>
                    <div className={styleFormV.button}>
                        <ButtonNew
                            style={"right"}
                            icon={"right"}
                            onClick={handleSubmitRes}
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
                                    res={e.res}
                                    costo_kg={e.costo_kg}
                                    margen={e.margen}
                                    precio_kg={e.precio_kg}
                                    onClick={()=> handleDelete(e)}
                                />
                            )
                        })
                        :null
                    }
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
