import React from "react";
import ButtonNew from "../../Buttons/ButtonNew/ButtonNew";
import styleCard from "./CardGrupos.module.scss";

const CardGrupos = ({ tropa, categoria, kgv_brutos, desbaste, kgv_netos, cant, precio_kgv_netos, onClick, type}) => {

    return (
        <div style={{width:"300px"}}>
            <div className={styleCard.miniButton}>
                <ButtonNew
                    onClick={onClick}
                    style={"delete"}
                    icon={"delete"}
                />
            </div>
            <div className={styleCard.card}>
                <div className={styleCard.items}>
                    <div><b>Tropa: </b></div>
                    <div><p>{tropa}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Categoría: </b></div>
                    <div><p>{categoria}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Cant: </b></div>
                    {type==="vaca"?<div><p>{"🐮".repeat(cant)+' ('+cant+')'}</p></div>:type==="cerdo"?<div><p>{"🐷".repeat(cant)+' ('+cant+')'}</p></div>:null}
                </div>
                <div className={styleCard.items}>
                    <div><b>kg vivos brutos: </b></div>
                    <div><p>{kgv_brutos}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Desbaste: </b></div>
                    <div><p>{desbaste}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>kg vivos netos: </b></div>
                    <div><p>{kgv_netos}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Precio/kgvNetos: </b></div>
                    <div><p>${precio_kgv_netos}</p></div>
                </div>
            </div>
        </div>
    );
};

export default CardGrupos;