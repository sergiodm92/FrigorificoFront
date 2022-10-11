import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { getAllComrpasByProveedor } from "../../../Redux/Actions/Actions";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCS from "./Card_Small.module.scss";

const CardSmall = ({ id, nombre, monto, tipo, pago, bstyle, bicon, bonClick}) => {
const dispatch = useDispatch()
useEffect(() => {
dispatch(getAllComrpasByProveedor(nombre))
}, [dispatch])

const ultimaCompra = useSelector((state)=>state.ultimaCompra)
    const navigate = useNavigate()

    return (
        <div className={styleCS.totalCard}>
            <div className={styleCS.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
                <div className={styleCS.items}><p>{nombre}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{ultimaCompra}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{monto}</p></div>
            </div>
            {pago===true?
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

export default CardSmall;