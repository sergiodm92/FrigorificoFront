import React from "react";
import { useNavigate } from "react-router-dom";

import styleNavbar from './Navbar.module.scss' 




export default function NavBar({title}){
    const navigate = useNavigate()

    function navigateFunction(e){
        navigate("/home")
    }

    return(
        <div className={styleNavbar.NavConteiner}>
            <div className={styleNavbar.DivTitle}>
                <div className={styleNavbar.loguito}></div>
                <p className={styleNavbar.NavTitle}>{title}</p>
            </div>
            <div className={styleNavbar.ConteinerButtonReturn} onClick={navigateFunction}>
                <div className={styleNavbar.ButtonReturn}>
                </div>
            </div>
            <div className={styleNavbar.ConteinerButtonHome} onClick={()=>navigate("/home")}>
                <div className={styleNavbar.ButtonHome}></div>
            </div>

        </div>

    )
}
