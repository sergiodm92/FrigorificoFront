import React from "react";
import { useNavigate } from "react-router-dom";

import styleNavbar from './Navbar.module.scss' 




export default function NavBar({title, onClick}){
    const navigate = useNavigate()

    return(
        <div className={styleNavbar.NavConteiner}>
            <div className={styleNavbar.DivTitle}>
                <div className={styleNavbar.loguito}></div>
                <p className={styleNavbar.NavTitle}>{title}</p>
            </div>
            <div className={styleNavbar.ConteinerButtonReturn} onClick={()=>navigate(onClick)}>
                <div className={styleNavbar.ButtonReturn}>
                </div>
            </div>
            <div className={styleNavbar.ConteinerButtonHome} onClick={()=>navigate("/home")}>
                <div className={styleNavbar.ButtonHome}></div>
            </div>

        </div>

    )
}
