import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import stylePr from "./Proveedores.module.scss";
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

    return(
        <div className={stylePr.ConteinerProveedores}>
            <NavBar
            title={"Proveedores"}
            onClick={"/home"}
            />
            <div>
                <div className={stylePr.title}>
                    <div><b>Nombre</b></div>
                    <div><b>|</b></div>
                    <div><b>Cuil</b></div>
                    <div><b>|</b></div>
                    <div><b>Saldo($)</b></div>
                </div>
                <div className={stylePr.cardsCont}>
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
                <div className={stylePr.buttonLarge}>
                    <LargeButton
                        title={"Agregar Proveedor"}
                        onClick={()=>navigate("/Proveedores/Form/0")}
                    ></LargeButton>
                </div>
            </div>
        </div>
    )
}