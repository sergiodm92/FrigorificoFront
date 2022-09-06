import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styleNavbar from './Navbar.module.scss' 




export default function NavBar({title}){


    return(
        <div className={styleNavbar.NavConteiner}>
            <div className={styleNavbar.DivTitle}>
                <p className={styleNavbar.NavTitle}>{title}</p>
            </div>
            <div className={styleNavbar.ConteinerButtonReturn}>
                <div className={styleNavbar.ButtonReturn}>
                
                </div>
            </div>
            <div className={styleNavbar.ConteinerButtonHome}>
                <div className={styleNavbar.ButtonHome}>
                
                </div>
            </div>

        </div>

    )
}
