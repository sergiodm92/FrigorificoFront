import React from "react";
import {useNavigate} from 'react-router-dom';
import styleCL from "./Card_Large.module.scss";

const CardLarge = ({ id, fecha, para, cant, kg, monto, tipo}) => {

    const navigate = useNavigate()

    return (
        <div className={styleCL.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
            <div className={styleCL.items}><p>{fecha}</p></div>
            <div className={styleCL.items}><p>|</p></div>
            <div className={styleCL.items}><p>{para}</p></div>
            <div className={styleCL.items}><p>|</p></div>
            <div className={styleCL.items}><p>{cant}</p></div>
            <div className={styleCL.items}><p>|</p></div>
            <div className={styleCL.items}><p>{kg}</p></div>
            <div className={styleCL.items}><p>|</p></div>
            <div className={styleCL.items}><p>{monto}</p></div>
        </div>
    );
};

export default CardLarge;