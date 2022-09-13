import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import StyleNA from "./StyleNA.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";


export default function NoAccess(){

    const navigate = useNavigate();

    return(
        <div className={StyleNA.ConteinerCompras}>
            <NavBar
            title={"Clientes"}
            />
                <div className={StyleNA.ConteinerCompras}>

                </div>
                
                    <LargeButton
                        title={"Ir a Login"}
                        onClick={()=>navigate("/")}
                    ></LargeButton>
        </div>
        
      
    )
}