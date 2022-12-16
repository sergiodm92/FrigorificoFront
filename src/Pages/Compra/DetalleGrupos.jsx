import React, { useEffect } from "react"
import NavBar from "../../Components/Navbar/Navbar"
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import {  getComrpaByID } from "../../Redux/Actions/Actions"
import CardGruposDetalle from "../../Components/Cards/CardGruposDetalle/CardGruposDetalle.jsx"
import style from "./Compras.module.scss"
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DetalleGrupos(){

    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const {id}=useParams()

    useEffect(() => {
        dispatch(getComrpaByID(id))
    }, [dispatch])
    const compra = useSelector((state)=>state.CompraByID)

    return(
        <div className={style.ConteinerCompras}>
            <NavBar
                title={"Detalle"}
            />
            <div className={style.grupos}>

        {compra.grupos?compra.grupos.map((a, i)=>{
                return(
                <CardGruposDetalle
                key={i}
                tropa={a.n_tropa}
                categoria={a.categoria}
                kgv_brutos={(a.kgv_brutos*1).toFixed(2)}
                desbaste={a.desbaste}
                kgv_netos={(a.kgv_netos*1).toFixed(2)}
                cant={a.cant}
                precio_kgv_netos={a.precio_kgv_netos}
                costo_flete={a.costo_flete}
                costo_hac={a.costo_hac}
                costo_faena_kg={a.costo_faena_kg}
                costo_faena={a.costo_faena}
                cosoVeps={a.cosoVeps}
                costo_total={a.costo_total}
                costo_kg={a.costo_kg}
                pesoProm={(a.pesoProm*1).toFixed(2)}
                rinde={a.rinde}
                recupero={a.recupero}
                comision={a.comision}
                />
                )
            })
        :
        <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px' }}>
            <CircularProgress />
        </Box>
        
        }
        
            </div>
            <LargeButton
                    title="Generar PDF"
                    onClick={()=>Navigate(`/Compras/DetalleGrupos/pdf/${id}`)}
                />

        </div>

    )
}