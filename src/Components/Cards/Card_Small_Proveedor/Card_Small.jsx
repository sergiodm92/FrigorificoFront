import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styleCS from "./Card_Small.module.scss";
import { getAllComrpas } from "../../../Redux/Actions/Actions";


const CardSmallProveedor = ({ id, nombre, tipo, cuil}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllComrpas())
    }, [dispatch])


    let compras = useSelector((state)=>state.AllCompras)

    let saldo = 0
    compras.map(a=>{
        if(a.proveedor==nombre) saldo+=a.saldo*1
    })

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

    const totalEstenPesos = currencyFormatter({
        currency: "USD",
        value : saldo
        })

    return (
        <div className={styleCS.totalCard}>
            <div className={styleCS.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
                <div className={styleCS.item1}><p>{nombre.length<20?nombre:nombre.slice(0,17)}</p></div>
                <div className={styleCS.item2}><p>{cuil?cuil:"-"}</p></div>
                <div className={styleCS.item3}><p>{totalEstenPesos}</p></div>
            </div>
        </div>
    );
};

export default CardSmallProveedor;