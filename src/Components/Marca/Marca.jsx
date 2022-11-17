import React from "react";
import styleM from './Marca.module.scss' 

export default function Marca(){
    return(
        <div className={styleM.Conteiner}>
            <div className={styleM.logo}></div>
            <div>creations</div>
            <div>-</div>
            <div>drfullcode@gmail.com</div>
            <div>-</div>
            <div>+543874736563</div>
        </div>

    )
}