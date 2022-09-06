import React from "react";
import {useNavigate} from 'react-router-dom';
import styleC from "./Card_Large.module.scss";

const CardLarge = ({ id, fecha, para, cant, kg, monto, tipo}) => {

    const navigate = useNavigate()

    return (
        <div className={styleC.cont} onClick={()=>navigate(`/${tipo}/${id}`)}>
            <div className={styleC.div1}><p>{fecha}</p></div>
            <div className={styleC.otherdivs}><p>{para}</p></div>
            <div className={styleC.otherdivs}><p>{cant}</p></div>
            <div className={styleC.otherdivs}><p>{kg}</p></div>
            <div className={styleC.otherdivs}><p>{monto}</p></div>
        </div>
    );
};

export default CardLarge;