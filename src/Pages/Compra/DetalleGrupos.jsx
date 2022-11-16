import React, { useEffect } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import { useParams } from "react-router"
import StyleDetalleCompra from './StyleDetalleCompras.module.scss'
import { useDispatch, useSelector } from "react-redux"
import {  getComrpaByID } from "../../Redux/Actions/Actions"
import CardGruposDetalle from "../../Components/Cards/CardGruposDetalle/CardGruposDetalle.jsx"


export default function DetalleGrupos(){

    const dispatch = useDispatch()
    const {id}=useParams()

    useEffect(() => {
        dispatch(getComrpaByID(id))
    }, [dispatch])
    const compra = useSelector((state)=>state.CompraByID)

    return(
        <div className={StyleDetalleCompra.ConteinerCompras}>
            <NavBar
                title={"Detalle"}
            />
            <div className={StyleDetalleCompra.grupos}>

        {compra.grupos?compra.grupos.map((a, i)=>{
                return(
                <CardGruposDetalle
                key={i}
                tropa={a.n_tropa}
                categoria={a.categoria}
                kgv_brutos={a.kgv_brutos}
                desbaste={a.desbaste}
                kgv_netos={a.kgv_netos}
                cant={a.cant}
                precio_kgv_netos={a.precio_kgv_netos}
                costo_flete={a.costo_flete}
                costo_hac={a.costo_hac}
                costo_faena_kg={a.costo_faena_kg}
                costo_faena={a.costo_faena}
                cosoVeps={a.cosoVeps}
                costo_total={a.costo_total}
                costo_kg={a.costo_kg}
                pesoProm={a.pesoProm}
                rinde={a.rinde}
                recupero={a.recupero}
                />
                )
            })
        :null}
        
            </div>

        </div>

    )
}