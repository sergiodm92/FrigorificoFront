import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAllVentasAchuras, getAllVentasConSaldo } from "../../../Redux/Actions/Actions";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCS from "./Card_Small.module.scss";

const CardSmallCliente = ({ id, nombre, tipo, pago, bstyle, bicon, bonClick, cuil }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllVentasConSaldo())
        dispatch(getAllVentasAchuras())
    }, [dispatch])


    let ventasC = useSelector((state) => state.AllVentasConSaldo)
    let ventasA = useSelector((state) => state.AllVentasAchuras)
    let saldo = 0
    // ventasC.map(a=>{
    //     if(a.cliente==nombre) saldo+=a.saldo*1
    // })
    // ventasA.map(a=>{
    //     if(a.clien==nombre) saldo+=a.saldo*1
    // })
    const saldoVentasC = ventasC.filter(a => a.cliente === nombre).reduce((total, a) => total + +a.saldo, 0);
    const saldoVentasA = ventasA.filter(a => a.clien === nombre).reduce((total, a) => total + +a.saldo, 0);
    saldo = saldoVentasC + saldoVentasA;

    function currencyFormatter({ currency, value }) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        })
        return formatter.format(value)
    }

    const totalEstenPesos = currencyFormatter({
        currency: "USD",
        value: saldo
    })

    return (
        <div className={styleCS.totalCard}>
            <div className={styleCS.cont} onClick={() => navigate(`/${tipo}/${id}`)}>
                <div className={styleCS.item1}><p>{nombre.length < 13 ? nombre : nombre.slice(0, 13)}</p></div>
                <div className={styleCS.item2}><p>{cuil ? cuil : "-"}</p></div>
                <div className={styleCS.item3}><p>{totalEstenPesos}</p></div>
            </div>
            {pago === true ?
                <div className={styleCS.button_pago}>
                    <ButtonNew
                        style={bstyle}
                        icon={bicon}
                        onClick={bonClick}
                    />
                </div>
                : null
            }
        </div>
    );
};

export default CardSmallCliente;