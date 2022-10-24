import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCS from "./Card_Small.module.scss";
import { getSaldoByProveedor } from "../../../Redux/Actions/Actions";


const CardSmallProveedor = ({ id, nombre, tipo, cuil}) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSaldoByProveedor(nombre))
    }, [dispatch])

    let saldoprov = useSelector((state)=>state.saldoprov)
    const navigate = useNavigate()
    
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
        value : saldoprov
        })

    return (
        <div className={styleCS.totalCard}>
            <div className={styleCS.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
                <div className={styleCS.items}><p>{nombre}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{cuil}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{totalEstenPesos}</p></div>
            </div>
        </div>
    );
};

export default CardSmallProveedor;