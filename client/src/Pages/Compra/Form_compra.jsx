import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import {getAllFaenas, getAllProveedores, getAllReses, getFaenasByTropa, getProveedorByName, postNewCompra, putEstadoCompraFaena, putEstadoCompraFaenaFalse, putReses, setAlertCompra} from "../../Redux/Actions/Actions";
import NavBar from '../../Components/Navbar/Navbar'
import styleFormC from './Form_Compra.module.scss';
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import CardGrupos from "../../Components/Cards/CardGrupos/CardGrupos.jsx"


let formC = {
    proveedor: '',//
    fecha: '',//
    lugar: '',//
    n_dte: '',//
    kgv_brutos_totales:0,//
    kgv_netos_totales:0,//
    kg_carne_totales:0,//
    costo_flete: 0,//
    cant_achuras: 0,//
    precio_venta_achuras_unit: 0,//
    recupero_precio_kg: 0, //precio_venta_achuras/kg_carne//
    costo_total_hac:0,//kgv_netos * precio_kgv_netos//
    costo_flete: 0,//
    costo_veps_unit: 0,//
    cant_total:0,//
    grupos:[],//
    saldo:null //saldo de hacienda solamente
};

let FormGCT = {
    categoria: '',            //ingresa                    //costo total=(costo de hacienda)+(costo de flete)+(comision)+(costo Veps)+(costo faena)
    n_tropa: '',              //ingresa                    //costo/kg =   costo total/
    kgv_brutos: '',         //ingresa
    desbaste: 0.07,           //ingresa 
    kg_desbaste:0,       //calcula                      //kgv_brutos * desbaste
    kgv_netos:0,            //calcula
    kg_carne: 0,              //trae                    //costo de hacienda = kgneto*precio_kgv_netos
    costo_flete: 0,      //calcula d                      //costo flete  
    costo_hac:0,            //calcula  
    costo_faena_kg:0,         //trae
    costo_faena:0,          //calcula
    cosoVeps:0,             //calculad
    costo_total:0,          //calcula d
    costo_kg:0,              //calcula d       
    cant:'',                  //ingresa
    precio_kgv_netos: '',   //ingresa
    pesoProm:0,             //calcula 
    rinde:0,
    recupero:0,                //calcula   
    n_grupo:0,              //calcula
    comision:0,
};


const categorias = ["Vaquillona", "Novillito", "Vaca", "Toro", "Novillo Pesado"]
let n=0
//validaciones
export const validate = (compra) => {
    let error = {};
    if (!compra.proveedor) error.proveedor = "Falta proveedor";
    if (!compra.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\-)(0[1-9]|1[0-2])\2(\d{4})$/.test(compra.fecha)) error.fecha = "Fecha incorrecta";
    if (!compra.n_dte) error.n_dte = "Falta N° DTE";
    if (!compra.categoria) error.categoria = "Falta categoria";
    if (!compra.cant) error.cant = "Falta cant";
    else if (!/^([0-9])*$/.test(compra.cant)) error.cant = "N° debe ser un número";
    if (!compra.kgv_brutos) error.kgv_brutos = "Falta kgV Brutos";
    else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(compra.kgv_brutos)) error.kgv_brutos = "kgV Brutos debe ser un número";
    // if (!compra.n_tropa) error.n_tropa = "Falta tropa";
    // else if (!/^([0-9])*$/.test(compra.n_tropa)) error.n_tropa = "Tropa debe ser un número";
    else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(compra.precio_venta_achuras)) error.precio_venta_achuras = "$ Venta de Achuras debe ser un número";
    if (!compra.costo_flete) error.costo_flete = "Falta Costo de Flete";
    else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(compra.costo_flete)) error.costo_flete = "Costo de Flete debe ser un número";
    if (!compra.costo_veps_unit) error.costo_veps_unit = "Falta costo de VEP/Un";
    else if (!/^\d*(\.\d{1})?\d{0,1}$/.test(compra.costo_veps_unit)) error.costo_veps_unit = "costo de VEP/Un debe ser un número";
    return error;
};

const Form_Compra = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Estados globales
    let alert_msj= useSelector ((state)=>state.postCompra);
    let proveedores = useSelector((state)=>state.AllProveedores);
    let faenas = useSelector((state)=>state.AllFaenas)
    let faenasDisp = faenas.filter(a=>a.estado_compra!==true)


    useEffect(() => {
        dispatch(getAllProveedores())
        dispatch(getAllFaenas())
        dispatch(getAllReses())
    }, [dispatch])
    
    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Compra creada con éxito"?"success":"warning", 
                button: "ok",
            })}
        dispatch(setAlertCompra())
        form.grupos=[]
    }, [alert_msj])



    //estados locales
    const [form, setForm] = useState(formC);
    const [error, setError] = useState({});
    const [formGCT, setFormCGT] = useState(FormGCT);
    const [error2, setError2] = useState({});
    const [Switch_Comision, setSwitch_comision] = useState(false);


    useEffect(() => {

        if(formGCT.n_tropa)dispatch(getFaenasByTropa(formGCT.n_tropa))
        
    }, [formGCT])
    let faenabytropa = useSelector((state)=>state.FaenaByTropa)
    let proveedor
    useEffect(() => {
        if(form.proveedor!=='')proveedor=proveedores.find(a=>a.nombre==form.proveedor)
    }, [form])
    
    
    const handleChangeG = (e) => {
        e.preventDefault()
        // setError2(
        // validate({
        //     ...formGCT,
        //     [e.target.name]: e.target.value,
        // })
        // );
        setFormCGT({
        ...formGCT,
        [e.target.name]: e.target.value,
        });
    };


    const handleChange = (e) => {
        e.preventDefault()
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
    const handleSubmitGrupos = (e)=>{
        e.preventDefault();
        try{    
            if(faenabytropa.total_kg){
                    faenabytropa.detalle.filter((a)=>{
                        if(a.categoria==formGCT.categoria){
                            formGCT.kg_carne+=a.kg*1
                        }
                    })
                    formGCT.pesoProm = (formGCT.kgv_brutos*1)/(formGCT.cant*1)
                    formGCT.kg_desbaste = formGCT.kgv_brutos*1*formGCT.desbaste
                    formGCT.kgv_netos = (formGCT.kgv_brutos*1) - (formGCT.kg_desbaste*1)
                    formGCT.costo_hac = (formGCT.kgv_netos) * (formGCT.precio_kgv_netos*1)
                    formGCT.costo_faena_kg = faenabytropa.costo_total/faenabytropa.total_kg
                    formGCT.costo_faena = formGCT.costo_faena_kg*formGCT.kg_carne
                    formGCT.rinde = formGCT.kg_carne  * 100 / (formGCT.kgv_netos)
                    formGCT.n_grupo = n++;
                    
                    form.grupos.unshift(formGCT)
                    document.getElementById("categoria").selectedIndex = 0
                    document.getElementById("tropa").selectedIndex = 0
                    setFormCGT(FormGCT)
                }
        }
        catch(err){
            console.log(err)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(true
            // -!error.proveedor && form.proveedor &&
            // -!error.fecha && form.fecha &&
            // -!error.n_dte && form.n_dte &&
            // -!error.categoria && form.categoria &&
            // -!error.cant && form.cant &&
            //- !error.kgv_brutos && form.kgv_brutos &&
            // -!error.desbaste && form.desbaste &&
            // -!error.n_tropa && form.n_tropa &&
            // -!error.precio_venta_achuras && form.precio_venta_achuras &&
            // -!error.costo_flete && form.costo_flete &&
            // -!error.costo_veps_unit && form.costo_veps_unit
        ){
            //cargo el resto de las propiedades
            form.grupos.map(a=>{
                form.kgv_brutos_totales+=a.kgv_brutos*1
                form.kgv_netos_totales+=a.kgv_netos*1
                form.costo_total_hac+=a.costo_hac*1
                form.cant_achuras+=a.cant*1
                form.cant_total+=a.cant*1
                form.kg_carne_totales+=a.kg_carne*1
            })
            if(form.kg_carne_totales>0){form.recupero_precio_kg = form.precio_venta_achuras_unit*1*form.cant_achuras  / (form.kg_carne_totales*1)}
            form.grupos.map(a=>{
                if(form.kg_carne_totales*1!==0){a.costo_flete=(form.costo_flete*1*a.kg_carne)/(form.kg_carne_totales*1)}
                a.cosoVeps=form.costo_veps_unit*a.cant
                if(Switch_Comision==true) a.comision = 0.02 * a.costo_hac;
                a.recupero=(form.precio_venta_achuras_unit*1*a.cant )/a.kg_carne
                a.costo_total = a.cosoVeps*1 + a.comision*1 + a.costo_faena*1 + a.costo_hac*1 + a.costo_flete*1 - (form.precio_venta_achuras_unit*1*a.cant )
                a.costo_kg = a.costo_total/(a.kg_carne*1)
            })
            form.saldo = form.costo_total_hac
            form.grupos.map((e)=>
                setTimeout(()=>{
                    dispatch(putReses(e.costo_kg, e.n_tropa, e.categoria))
                    dispatch(putEstadoCompraFaena(e.n_tropa))
                }, 2000)
            )
            
            dispatch(postNewCompra(form))
            document.getElementById("proveedor").selectedIndex = 0
            setForm(formC);
            setSwitch_comision(false)
        }
        else{
            swal({
                title: "Faltan Datos",
                icon: "warning", 
                button: "ok",
            })
        }
    };

    function handleSelectCat(e) {
        setFormCGT({
            ...formGCT,
            categoria: e.target.value 
        })
    }
    function handleSelectTr(e) {
        setFormCGT({
            ...formGCT,
            n_tropa:  e.target.value
        })
    }

    function handleSelectPr(e) {
        setForm({
            ...form,
            proveedor:  e.target.value
        })
    }
    const handleDelete = (e)=>{
        setForm({
            ...form,
            grupos: form.grupos.filter(d => d !== e)
        })
    }
    const handleDet = () => {
        navigate("/Compras")
    };

    const switchCom = ()=>{
        if(Switch_Comision==false)setSwitch_comision(true)
        else if(Switch_Comision==true)setSwitch_comision(false);
    }
//input
    return (
        <div className={styleFormC.wallpaper}>
            <NavBar
            title={"Nueva Compra"}
            />
            <div className={styleFormC.formContainer}>
                <form className={styleFormC.form}>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Proveedor: </h5>
                        <select id="proveedor" className="selectform" onChange={(e)=> handleSelectPr(e)}>
                            <option defaultValue>-</option>
                            {proveedores.length > 0 &&  
                            proveedores.map((p,i) => (
                                    <option	key={i} value={p.nombre}>{p.nombre.length<20?p.nombre:p.nombre.slice(0,17)}</option>
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
                            value={form.n_dte}
                            id="n_dte"
                            name="n_dte"
                            onChange={handleChange}
                            className={error.n_dte & 'danger'}
                        />
                    </div>
                    <p className={error.n_dte ? styleFormC.danger : styleFormC.pass}>{error.n_dte}</p>
                    <div className={styleFormC.formItem}>
                        <div>
                            <h5 className={styleFormC.title}>$ Ach. unit: </h5>
                        </div>
                        <div className={styleFormC.numero}>
                            <h5 className={styleFormC.title}>$ </h5>
                            <input
                                type="number"
                                value={form.precio_venta_achuras_unit?form.precio_venta_achuras_unit:""}
                                id="precio_venta_achuras_unit"
                                name="precio_venta_achuras_unit"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormC.size2}
                            />
                        </div>
                    </div>
                    <p className={error.precio_venta_achuras ? styleFormC.danger : styleFormC.pass}>{error.precio_venta_achuras}</p>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Comisión: </h5>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={()=>switchCom()}/>
                        </div>
                    </div>
                    <div className={styleFormC.formItem}>
                        <div>
                            <h5 className={styleFormC.title}>Costo Flete: </h5>
                        </div>
                        <div className={styleFormC.numero}>
                            <h5 className={styleFormC.title}>$ </h5>
                            <input
                                type="number"
                                value={form.costo_flete?form.costo_flete:''}
                                id="costo_flete"
                                name="costo_flete"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormC.size2}
                            />
                        </div>
                    </div>
                    <p className={error.costo_flete ? styleFormC.danger : styleFormC.pass}>{error.costo_flete}</p>
                    <div className={styleFormC.formItem}>
                        <div>
                            <h5 className={styleFormC.title}>Costo VEPS unit.: </h5>
                        </div>
                        <div className={styleFormC.numero}>
                            <h5 className={styleFormC.title}>$ </h5>
                            <input
                                type="number"
                                value={form.costo_veps_unit?form.costo_veps_unit:''}
                                id="costo_veps_unit"
                                name="costo_veps_unit"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormC.size2}
                            />
                        </div>
                    </div>
                    <p className={error.costo_veps_unit ? styleFormC.danger : styleFormC.pass}>{error.costo_veps_unit}</p>
                    <div className={styleFormC.cardGrupo}>
                        <div className={styleFormC.formItem}>
                            <h5 className={styleFormC.title}>N° Tropa: </h5>
                            <select id="tropa" className="selectform" onChange={(e)=> handleSelectTr(e)}>
                                <option defaultValue>-</option>
                                {faenasDisp.length > 0 &&  
                                    faenasDisp.map((c,i) => (
                                        <option key={i}	value={c.tropa}>{c.tropa}</option>
                                        ))
                                }
                            </select>
                        </div>
                        {/* <p className={error.n_tropa ? styleFormC.danger : styleFormC.pass}>{error.n_tropa}</p>         */}
                        <div className={styleFormC.formItem}>
                            <div>
                                <select id="categoria" className="selectform" onChange={(e)=> handleSelectCat(e)}>
                                    <option value="" defaultValue>Categoría</option>
                                    {categorias.length > 0 &&  
                                    categorias.map((c,i) => (
                                            <option	key={i} value={c}>{c}</option>
                                            ))
                                    }
                                </select>
                            </div>
                            <div className={styleFormC.numero}>
                                <h5 className={styleFormC.title}>N°: </h5>
                                <input
                                    type="number"
                                    value={formGCT.cant}
                                    id="cant"
                                    name="cant"
                                    onChange={handleChangeG}
                                    className={styleFormC.size1}
                                />
                            </div>
                        </div>
                        {/* <p className={error.cant ? styleFormC.danger : styleFormC.pass}>{error.cant}</p> */}
                        <div className={styleFormC.formItem}>
                            <h5 className={styleFormC.title}>kgV Brutos: </h5>
                            <input
                                type="number"
                                value={formGCT.kgv_brutos}
                                id="kgv_brutos"
                                name="kgv_brutos"
                                onChange={handleChangeG}
                                placeholder="00"
                                className={styleFormC.size2}
                            />
                        </div>
                        {/* <p className={error.kgv_brutos ? styleFormC.danger : styleFormC.pass}>{error.kgv_brutos}</p> */}
                        <div className={styleFormC.formItem}>
                            <h5 className={styleFormC.title}>Desbaste: </h5>
                            <input
                                type="number"
                                value={formGCT.desbaste}
                                id="desbaste"
                                name="desbaste"
                                onChange={handleChangeG}
                                placeholder="00"
                                className={error.desbaste & styleFormC.danger}
                            />
                        </div>
                        {/* <p className={error.desbaste ? styleFormC.danger : styleFormC.pass}>{error.desbaste}</p> */}
                        <div className={styleFormC.formItem}>
                            <div>
                                <h5 className={styleFormC.title}>$/kgV Neto: </h5>
                            </div>
                            <div className={styleFormC.numero}>
                                <h5 className={styleFormC.title}>$ </h5>
                                <input
                                    type="number"
                                    value={formGCT.precio_kgv_netos}
                                    id="precio_kgv_netos"
                                    name="precio_kgv_netos"
                                    onChange={handleChangeG}
                                    placeholder="0.00"
                                    className={styleFormC.size2}
                                />
                            </div>
                        </div>
                        {/* <p className={error.precio_kgv_netos ? styleFormC.danger : styleFormC.pass}>{error.precio_kgv_netos}</p> */}
                        
                    </div>
                    <div className={styleFormC.button}>
                        <ButtonNew
                            onClick={handleSubmitGrupos}
                            style={"right"}
                            icon={"right"}
                        />
                    </div>

                            {form.grupos.length ?
                    form.grupos.map((e,i)=>{
                        return(
                            <CardGrupos
                                key={i}
                                tropa={e.n_tropa}
                                categoria={e.categoria}
                                kgv_brutos={e.kgv_brutos}
                                desbaste={e.desbaste}
                                kgv_netos={e.kgv_netos}
                                cant={e.cant}
                                precio_kgv_netos={e.precio_kgv_netos}
                                onClick={()=> handleDelete(e)}
                            />
                        )
                    })
                    : null
}
                    <div className={styleFormC.buttons}>
                        <div className={styleFormC.shortButtons}>
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

export default Form_Compra;

