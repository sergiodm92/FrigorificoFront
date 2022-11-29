import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import CardReses from "../../Components/Cards/CardReses/CardReses";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import NavBar from '../../Components/Navbar/Navbar'
import style from "./Ventas.module.scss";
import { getAllClientes, getAllReses, getClienteByName, postNewVentaCarne, putCuartoRes, putStockRes, setAlert } from "../../Redux/Actions/Actions";
//calendario-----------------------------------
import {  KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

//Form Venta
var formV = {
    cliente:'',
    fecha: new Date().toLocaleDateString(),
    detalle:[],
    saldo:0
};
//Form para cargar el detalle de la venta
var formComV = {
    id:0,
    correlativo:'',
    categoria:'',
    total_media: 0,
    kg:0,
    kg_total:0,
    costo_kg:0,
    precio_kg:0
};


// Arrays para los selects
const categorias = ["Vaquillona", "Novillito", "Vaca", "Toro", "Novillo Pesado"]
const res=["total", "1/4T", "1/4D"]

//validaciones form Venta
export const validate = (venta) => {
    let error = {};
    if (!venta.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\-)(0[1-9]|1[0-2])\2(\d{4})$/.test(venta.fecha)) error.fecha = "Fecha incorrecta";
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
    if (!/^\d*(\.\d{1})?\d{0,1}$/.test(res.kg)) error2.kg = "kg debe ser un número";
    if (!/^\d*(\.\d{1})?\d{0,1}$/.test(res.precio_kg)) error2.precio_kg = "Precio/kg debe ser un número";
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
    const alert_msj= useSelector ((state)=>state.alert_msj);
    const stock=useSelector((state)=>state.AllResesStockTrue)
    const clientes = useSelector((state)=>state.AllClientes);
    
    let stockByCat=stock.filter(a=> a.categoria===formCV.categoria && a.precio_kg)

    useEffect(() => {
        if(formCV.correlativo!=="")setresSelect(stock.find(a=>a.correlativo===formCV.correlativo))
        if(formCV.precio_kg!==0)setMargen((((formCV.precio_kg-(resSelect.precio_kg*1))/formCV.precio_kg)*100).toFixed(2))
        if(formCV.total_media==="total")formCV.kg=resSelect.kg
        if(formCV.total_media!=="total"){
            formCV.kg_total=resSelect.kg*1
            formCV.id=resSelect.id
        }
    }, [formCV])


    useEffect(() => {
        
        if(alert_msj!==""){
            swal({
                titleForm: alert_msj,
                icon: alert_msj==="Venta creada con éxito"?"success":"warning", 
                button: "ok",
            })}
            dispatch(setAlert())
            form.detalle=[]
    }, [alert_msj])

    useEffect(() => {
        if(form.cliente){
            dispatch(getClienteByName(form.cliente))
        }
    }, [form])

    const cliente = useSelector((state)=>state.clienteByNombre);

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
            form.detalle.unshift(formCV)
            if(formCV.total_media=="total" || formCV.correlativo.includes('D') || formCV.correlativo.includes('T')) arrResesTotales.push(formCV.correlativo)
            document.getElementById("categoria").selectedIndex = 0
            document.getElementById("res").selectedIndex = 0
            setFormCV(formComV);
        }
        else {
            swal({
                titleForm: "Alerta",
                text: "Datos incorrectos, por favor intente nuevamente",
                icon: "warning",
                button: "ok",
            })
        }
    };

    //handleSubmit de la Venta completa
    const handleSubmit = (e) => {
        e.preventDefault();
        if(
            !error.fecha && form.fecha &&
            !error.cliente && form.cliente
        ){
            if(form.detalle.length>0){
                form.detalle.map(a=> {
                    form.saldo+=a.kg*a.precio_kg
                    if(a.correlativo.includes('T')==false && a.correlativo.includes('D')==false){
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
                    }
                })
            }
            form.fecha=form.fecha.getTime()
            arrResesTotales.map(a=>{
                setTimeout(()=>{
                        dispatch(putStockRes(a))
            }, 2000)
            })
            dispatch(postNewVentaCarne(form))
            document.getElementById("categoria").selectedIndex = 0
            document.getElementById("res").selectedIndex = 0
            setForm(formV);
        }
        else{
            swal({
                titleForm: "Alerta",
                text: "Datos incorrectos, por favor intente nuevamente",
                icon: "warning",
                button: "ok",
            })
        }
    };

    //carga de calendario
    const handleChangeDate = (date) => {  
        setForm({
        ...form,
        fecha:  date
        });
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
    //tema del calendario
    const outerTheme = createTheme({
    palette: {
        primary: {
            main: '#640909'
        },
    },
    });

    return (
        <div className={style.ConteinerVenta}>
            <NavBar
            title={"Nueva Venta"}
            />
            <div className={style.formContainer}>
                <form className={style.form}>
                    <div className={style.formItem}>
                        <h5 className={style.titleForm}>Cliente: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectCl(e)}>
                            <option defaultValue>-</option>
                            {clientes.length > 0 &&  
                            clientes.map((c,i) => (
                                    <option key={i}	value={c.nombre}>{c.nombre.length<20?c.nombre:c.nombre.slice(0,17)}</option>
                                    ))
                            }
                        </select>
                    </div>
                    <div className={style.formItemDate}>
                        <h5 className={style.titleForm}>Fecha: </h5>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} >
                        <ThemeProvider theme={outerTheme}>
                        <KeyboardDatePicker
                            format="dd-MM-yyyy"
                            value={form.fecha}
                            disableFuture
                            onChange={handleChangeDate}                    
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </ThemeProvider>  
                        </MuiPickersUtilsProvider>
                    </div>
                    <p className={form.fecha!==new Date().toLocaleDateString() ? style.pass : style.danger }>Debe ingresar la fecha</p>
                    
                    {/*----------------Carga del detalle---------------------*/}
                    <div className={style.formItem2}>
                        <div className={style.item}>
                            <select id="categoria" className="selectform" onChange={(e)=> handleSelectCat(e)}>
                                <option defaultValue>Categoría</option>
                                {categorias.length > 0 &&  
                                categorias.map((c,i) => (
                                    <option key={i}	value={c}>{c}</option>
                                ))
                                }
                            </select>
                            <select id="res" className="selectform" onChange={(e)=> handleSelectRes(e)}>
                                <option defaultValue>res</option>
                                {res.length > 0 &&  
                                res.map((c,i) => (
                                    <option key={i}	value={c}>{c}</option>
                                ))
                                }
                            </select>
                        </div>
                        <div className={style.formItem}>
                        <h5 className={style.titleForm}>Correlativo: </h5>
                        <select className="selectform" onChange={(e)=> handleSelectCorr(e)}>
                            <option defaultValue>-</option>
                            {stockByCat.length > 0 &&  
                                stockByCat.map((c,i) => (
                                    <option	key={i} value={c.correlativo}>{c.correlativo + "-"+c.kg}</option>
                                    ))
                            }
                        </select>
                    </div>
                    
                    {
                        formCV.total_media==="total" || formCV.correlativo.includes('D') || formCV.correlativo.includes('T')?
                        
                        <div>
                            <div className={style.item}>
                                <h5 className={style.titleForm}>kg </h5>
                                <h5 className={style.titleForm}>{resSelect.kg}</h5>
                            </div>
                            <div className={style.item}>
                                <h5 className={style.titleForm}>Costo/kg </h5>
                                <h5 className={style.titleForm}>{typeof(resSelect.precio_kg)!=="number"? null : (resSelect.precio_kg*1).toFixed(2)}</h5>
                            </div>
                        </div>
                        :
                        <div>
                            <div className={style.item}>
                                <h5 className={style.titleForm}>kg total </h5>
                                <h5 className={style.titleForm}>{resSelect.kg}</h5>
                            </div>
                            <div className={style.item}>
                                <h5 className={style.titleForm}>Costo/kg </h5>
                                <h5 className={style.titleForm}>{typeof(resSelect.precio_kg)!=="number"? null : (resSelect.precio_kg*1).toFixed(2)}</h5>
                            </div>
                            <div className={style.item}>
                                <h5 className={style.titleForm}>kg </h5>
                                <input
                                    type="number"
                                    value={formCV.kg?formCV.kg:''}
                                    id="kg"
                                    name="kg"
                                    onChange={handleChangeCV}
                                    placeholder="000"
                                    className={style.size2}
                                />
                            </div>
                        </div>
                    }
                        <div className={style.item}>
                            <h5 className={style.titleForm}>$/kg </h5>
                            <input
                                type="number"
                                value={formCV.precio_kg?formCV.precio_kg:''}
                                id="precio_kg"
                                name="precio_kg"
                                onChange={handleChangeCV}
                                placeholder="0.00"
                                className={style.size2}
                            />
                        </div>
                        <div className={style.item}>
                            <h5 className={style.titleForm}>Margen(%) </h5>
                            <h5 className={style.titleForm}>{margen}</h5>
                        </div>
                    </div>
                    <div className={style.button}>
                        <ButtonNew
                            style={"right"}
                            icon={"right"}
                            onClick={handleSubmitRes}
                        />
                    </div>
                    {/*-----------------------------------------------------------*/}

                        {form.detalle.length ?
                        form.detalle.map((e,i)=>{
                            return(
                                <CardReses
                                    key={i}
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
                    <div className={style.buttons} id={style.buttonOk}>
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
