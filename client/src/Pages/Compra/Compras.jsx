import React from "react"
import StyleCompras from './StyleCompras.module.scss'
import NavBar from "../../Components/Navbar/Navbar"
import Clientes from "../Clientes/Clientes"


export default function Compras(){

    return(
        <div className={StyleCompras.ConteinerCompras}>
            <NavBar
            title={"Compras"}
            />
            <div>
                {
                    <CardLarge
                        id={id_compra}
                        fecha={}
                        para={Compras}
                        cant={}
                        kg={}
                        monto={}
                        tipo={}
                    ></CardLarge>
                }
            </div>
        </div>

    )
}