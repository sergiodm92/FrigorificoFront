import React from "react";
import styleCard from "./CardGruposDetalle.module.scss";

const CardGruposDetalle = ({ tropa, type, recupero,categoria, kgv_brutos, desbaste, kgv_netos, cant, precio_kgv_netos,rinde,pesoProm,costo_kg,costo_total,cosoVeps,costo_faena,costo_hac,costo_flete, comision}) => {

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 
        return formatter.format(value)
        }

    let precio_kgv_netos_pesos = currencyFormatter({
        currency: "USD",
        value : precio_kgv_netos
        })
    let costo_kg_pesos = currencyFormatter({
        currency: "USD",
        value : costo_kg
        })
    let  costo_total_pesos = currencyFormatter({
        currency: "USD",
        value : costo_total
        })
    let  costoVeps_pesos= currencyFormatter({
        currency: "USD",
        value : cosoVeps
        })
    let costo_faena_pesos= currencyFormatter({
        currency: "USD",
        value : costo_faena
        })
    let costo_hac_pesos= currencyFormatter({
        currency: "USD",
        value : costo_hac
        })
    let costo_flete_pesos= currencyFormatter({
        currency: "USD",
        value : costo_flete
        })
    if(comision){
        var comision_pesos= currencyFormatter({
            currency: "USD",
            value : comision
        })}
        

    return (
        <div>
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
                    <div><p>{type==="vaca"?"🐮".repeat(cant)+' ('+cant+')':"🐷".repeat(cant)+' ('+cant+')'}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>kg vivos brutos: </b></div>
                    <div><p>{kgv_brutos} kg</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Desbaste: </b></div>
                    <div><p>{desbaste}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>kg vivos netos: </b></div>
                    <div><p>{kgv_netos} kg</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Precio/kgvNetos: </b></div>
                    <div><p>{precio_kgv_netos_pesos}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Rinde: </b></div>
                    <div><p>{rinde.toFixed(2)}%</p></div>
                </div>
                {type==="vaca"?
                <div className={styleCard.items}>
                    <div><b>Recupero: </b></div>
                    <div><p>${recupero?.toFixed(2)}</p></div>
                </div>
                :null
                }
                <div className={styleCard.items}>
                    <div><b>Peso promedio: </b></div>
                    <div><p>{pesoProm} kg</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Costo Veps: </b></div>
                    <div><p>{costoVeps_pesos}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Costo de faena: </b></div>
                    <div><p>{costo_faena_pesos}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Costo de hacienda: </b></div>
                    <div><p>{costo_hac_pesos}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Costo de flete: </b></div>
                    <div><p>{costo_flete_pesos}</p></div>
                </div>
                {comision?
                    <div className={styleCard.items}>
                    <div><b>Comisión: </b></div>
                    <div><p>{comision_pesos}</p></div>
                </div>
                :null}
                <div className={styleCard.items}>
                    <div><b>Costo total: </b></div>
                    <div><p>{costo_total_pesos}</p></div>
                </div>
                <div className={styleCard.items}>
                    <div><b>Costo/kg: </b></div>
                    <div><p>{costo_kg_pesos}</p></div>
                </div>
            </div>
        </div>
    );
};

export default CardGruposDetalle;


