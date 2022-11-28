import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./Proveedores.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import {getAllProveedores} from "../../Redux/Actions/Actions.js"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardSmallProveedor from "../../Components/Cards/Card_Small_Proveedor/Card_Small";


export default function Proveedores(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProveedores())
    }, [dispatch])
    let AllProveedores = useSelector((state)=>state.AllProveedores)
    AllProveedores.sort(function(a,b){
        if(a.nombre>b.nombre){return 1}
        if(a.nombre<b.nombre){return -1}
        return 0})
    return(
        <div className={style.ConteinerProveedores}>
            <NavBar
            title={"Proveedores"}
            onClick={"/home"}
            />
            <div>
                <div className={style.titles}>
                    <div className={style.title1}><b>Nombre</b></div>
                    <div className={style.title2}><b>Cuil</b></div>
                    <div className={style.title3}><b>Saldo($)</b></div>
                </div>
                <div className={style.cardsCont}>
                    {AllProveedores.map((a)=>{

                        return(
                            <CardSmallProveedor
                                key={a.id}
                                id={a.id}
                                nombre={a.nombre}
                                tipo={"Proveedores"}
                                pago={false}
                                cuil= {a.cuil}
                            />
                        )
                    })
                    }
                </div>
                <div className={style.buttonLarge}>
                    <LargeButton
                        title={"Agregar Proveedor"}
                        onClick={()=>navigate("/Proveedores/Form/0")}
                    ></LargeButton>
                </div>
            </div>
        </div>
    )
}