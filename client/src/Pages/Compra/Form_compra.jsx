import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import {getAllFaenas, getAllProveedores, postNewCompra} from "../../Redux/Actions/Actions";
import NavBar from '../../Components/Navbar/Navbar'
import styleFormC from './Form_Compra.module.scss';

const formC = {
    id:'',
    proveedor: '',
    fecha: '',
    lugar: '',
    n_dte: '',
    categoria: '',
    cant: '',
    kgv_brutos: '',
    desbaste: '',
    kg_desbaste:'', //kgv_brutos * desbaste
    kgv_netos:'', //kgv_brutos - kg_desbaste
    precio_kgv_netos: '',
    n_tropa: '',
    kg_carne: '',
    rinde:'', // kg_carne*100/kgv_netos
    cant_achuras: '',
    precio_venta_achuras: '',
    recupero_precio_kg:'', //precio_venta_achuras/kg_carne
    costo_hac:'',//kgv_netos * precio_kgv_netos
    costo_faena:'', //faena.costo_total
    switch_comision: false,
    comision:'', //0,02*costo_hac//true or false
    costo_flete: '',
    costo_veps_unit: '',
    costo_veps: '',//costo_veps_unit * cant
    costo_total:'', //costo_faena + costo_veps + costo_flete + costo_hac
    costo_kg:'', //costo_total/kg_carne
    saldo:'' //saldo de hacienda solamente
};


const categorias = ["Vaca", "Vaquillon", "Novillo", "Toro"]

//validaciones
export const validate = (compra) => {
    let error = {};
    if (!compra.proveedor) error.proveedor = "Falta proveedor";
    if (!compra.fecha) error.fecha = "Falta fecha";
    else if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(compra.fecha)) error.fecha = "Fecha incorrecta";
    if (!compra.n_dte) error.n_dte = "Falta N° DTE";
    if (!compra.categoria) error.categoria = "Falta categoria";
    if (!compra.cant) error.cant = "Falta cant";
    else if (!/^([0-9])*$/.test(compra.cant)) error.cant = "N° debe ser un número";
    if (!compra.kgv_brutos) error.kgv_brutos = "Falta kgV Brutos";
    else if (!/^([0-9])*$/.test(compra.kgv_brutos)) error.kgv_brutos = "kgV Brutos debe ser un número";
    if (!compra.n_tropa) error.n_tropa = "Falta tropa";
    else if (!/^([0-9])*$/.test(compra.n_tropa)) error.n_tropa = "Tropa debe ser un número";
    else if (!/^([0-9])*$/.test(compra.precio_venta_achuras)) error.precio_venta_achuras = "$ Venta de Achuras debe ser un número";
    if (!compra.costo_flete) error.costo_flete = "Falta Costo de Flete";
    else if (!/^([0-9])*$/.test(compra.costo_flete)) error.costo_flete = "Costo de Flete debe ser un número";
    if (!compra.costo_veps_unit) error.costo_veps_unit = "Falta costo de VEP/Un";
    else if (!/^([0-9])*$/.test(compra.costo_veps_unit)) error.costo_veps_unit = "costo de VEP/Un debe ser un número";
    return error;
};

const Form_Compra = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Estados globales
    const alert_msj= useSelector ((state)=>state.postCompra);
    const proveedores = useSelector((state)=>state.AllProveedores);
    const faenas = useSelector((state)=>state.AllFaenas)
    
    useEffect(() => {
        dispatch(getAllProveedores())
        dispatch(getAllFaenas())
    }, [dispatch])

    useEffect(() => {
        if(alert_msj!==""){
            swal({
                title: alert_msj,
                icon: alert_msj==="Compra creada con éxito"?"success":"warning", 
                button: "ok",
            })}
    }, [alert_msj])


    //estados locales
    const [form, setForm] = useState(formC);
    const [error, setError] = useState({});
    
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        if(
        !error.proveedor && form.proveedor &&
        !error.fecha && form.fecha &&
        !error.n_dte && form.n_dte &&
        !error.categoria && form.categoria &&
        !error.cant && form.cant &&
        !error.kgv_brutos && form.kgv_brutos &&
        !error.desbaste && form.desbaste &&
        !error.n_tropa && form.n_tropa &&
        !error.precio_venta_achuras && form.precio_venta_achuras &&
        !error.costo_flete && form.costo_flete &&
        !error.costo_veps_unit && form.costo_veps_unit
        ){
            //cargo el resto de las propiedades
            form.kg_desbaste = form.kgv_brutos*1 * form.desbaste;
            form.kgv_netos = form.kgv_brutos*1 - form.kg_desbaste*1;
            faenas.map((c)=>{
            while(c.tropa===form.n_tropa){
                form.kg_carne=c.total_kg
                form.costo_faena = c.costo_total
            } 
        })
            form.cant_achuras=form.cant
            form.rinde = form.kg_carne  * 100 / (form.kgv_netos*1) ;
            form.recupero_precio_kg = form.precio_venta_achuras*1  / (form.kg_carne*1) ;
            form.costo_hac = form.kgv_netos*1  * form.precio_kgv_netos;
            if(form.switch_comision===true) form.comision = 0.02 * form.costo_hac;
            form.costo_veps = form.costo_veps_unit*1  * form.cant;
            form.costo_total = (form.costo_faena*1)  + (form.costo_veps*1)  + (form.costo_flete*1)  + (form.costo_hac*1) ;
            form.costo_kg = (form.costo_total*1) / (form.kg_carne*1)
            form.saldo = form.costo_hac
            dispatch(postNewCompra(form))
            document.getElementById("proveedor").selectedIndex = 0
            document.getElementById("categoria").selectedIndex = 0
            document.getElementById("tropa").selectedIndex = 0
            setForm(formC);
        }
        else{
            console.log("no verifica los errores")
        }
    };

    function handleSelectCat(e) {
        setForm({
            ...form,
            categoria: e.target.value 
        })
    }
    function handleSelectPr(e) {
        setForm({
            ...form,
            proveedor:  e.target.value
        })
    }
    function handleSelectTr(e) {
        setForm({
            ...form,
            n_tropa:  e.target.value
        })
    }

    const handleDet = () => {
        navigate("/Compras")
    };

    const switchCom = ()=>{
        if(form.switch_comision===false)form.switch_comision=true;
        else if(form.switch_comision===true)form.switch_comision=false;
        console.log(form.switch_comision)
    }

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
                            <option value="" selected>-</option>
                            {proveedores.length > 0 &&  
                            proveedores.map((p) => (
                                    <option	value={p.nombre}>{p.nombre}</option>
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
                            <select id="categoria" className="selectform" onChange={(e)=> handleSelectCat(e)}>
                                <option value="" selected>Categoría</option>
                                {categorias.length > 0 &&  
                                categorias.map((c) => (
                                        <option	value={c}>{c}</option>
                                        ))
                                }
                            </select>
                        </div>
                        <div className={styleFormC.numero}>
                            <h5 className={styleFormC.title}>N°: </h5>
                            <input
                                type="text"
                                value={form.cant}
                                id="cant"
                                name="cant"
                                onChange={handleChange}
                                className={styleFormC.size1}
                            />
                        </div>
                    </div>
                    <p className={error.cant ? styleFormC.danger : styleFormC.pass}>{error.cant}</p>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>kgV Brutos: </h5>
                        <input
                            type="text"
                            value={form.kgv_brutos}
                            id="kgv_brutos"
                            name="kgv_brutos"
                            onChange={handleChange}
                            placeholder="00"
                            className={styleFormC.size2}
                        />
                    </div>
                    <p className={error.kgv_brutos ? styleFormC.danger : styleFormC.pass}>{error.kgv_brutos}</p>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Desbaste: </h5>
                        <input
                            type="text"
                            value={form.desbaste}
                            id="desbaste"
                            name="desbaste"
                            onChange={handleChange}
                            placeholder="00"
                            className={error.desbaste & styleFormC.danger}
                        />
                    </div>
                    <p className={error.desbaste ? styleFormC.danger : styleFormC.pass}>{error.desbaste}</p>
                    <div className={styleFormC.formItem}>
                        <div>
                            <h5 className={styleFormC.title}>$/kgV Neto: </h5>
                        </div>
                        <div className={styleFormC.numero}>
                            <h5 className={styleFormC.title}>$ </h5>
                            <input
                                type="text"
                                value={form.precio_kgv_netos}
                                id="precio_kgv_netos"
                                name="precio_kgv_netos"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormC.size2}
                            />
                        </div>
                    </div>
                    <p className={error.precio_kgv_netos ? styleFormC.danger : styleFormC.pass}>{error.precio_kgv_netos}</p>
                    <div className={styleFormC.formItem}>
                            <h5 className={styleFormC.title}>N° Tropa: </h5>
                            <select id="tropa" className="selectform" onChange={(e)=> handleSelectTr(e)}>
                                <option value="" selected>-</option>
                                {faenas.length > 0 &&  
                                faenas.map((c) => (
                                        <option	value={c.tropa}>{c.tropa}</option>
                                        ))
                                }
                            </select>
                        </div>
                    <p className={error.n_tropa ? styleFormC.danger : styleFormC.pass}>{error.n_tropa}</p>                    
                    <div className={styleFormC.formItem}>
                        <div>
                            <h5 className={styleFormC.title}>$ Ventas de Ach.: </h5>
                        </div>
                        <div className={styleFormC.numero}>
                            <h5 className={styleFormC.title}>$ </h5>
                            <input
                                type="text"
                                value={form.precio_venta_achuras}
                                id="precio_venta_achuras"
                                name="precio_venta_achuras"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormC.size2}
                            />
                        </div>
                    </div>
                    <p className={error.precio_venta_achuras ? styleFormC.danger : styleFormC.pass}>{error.precio_venta_achuras}</p>
                    <div className={styleFormC.formItem}>
                        <h5 className={styleFormC.title}>Comisión: </h5>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={()=>switchCom()}/>
                            {/* <label class="form-check-label" for="flexSwitchCheckDefault"></label> */}
                        </div>
                    </div>
                    <div className={styleFormC.formItem}>
                        <div>
                            <h5 className={styleFormC.title}>Costo Flete: </h5>
                        </div>
                        <div className={styleFormC.numero}>
                            <h5 className={styleFormC.title}>$ </h5>
                            <input
                                type="text"
                                value={form.costo_flete}
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
                                type="text"
                                value={form.costo_veps_unit}
                                id="costo_veps_unit"
                                name="costo_veps_unit"
                                onChange={handleChange}
                                placeholder="0.00"
                                className={styleFormC.size2}
                            />
                        </div>
                    </div>
                    <p className={error.costo_veps_unit ? styleFormC.danger : styleFormC.pass}>{error.costo_veps_unit}</p>
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