import React from "react";
import {useNavigate} from 'react-router-dom';
import ButtonPago from "../../Buttons/Button_Pago/Button_Pago";
import styleCS from "./Card_Small.module.scss";

const CardSmall = ({ id, fecha, otro, monto, tipo, nav, pago}) => {

    const navigate = useNavigate()

    return (
        <div className={styleCS.totalCard}>
            <div className={styleCS.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
                <div className={styleCS.items}><p>{fecha}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{otro}</p></div>
                <div className={styleCS.items}><p>|</p></div>
                <div className={styleCS.items}><p>{monto}</p></div>
            </div>
            {pago=true?
            <ButtonPago
                onClick={()=>navigate(`/${nav}/${id}`)}
            />
            : null
            }
        </div>
    );
};

export default CardSmall;