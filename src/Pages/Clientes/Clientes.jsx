import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./Clientes.module.scss";
import LargeButton from "../../Components/Buttons/Button_Large/Button_Large";
import { filtrarClientes, getAllClientes } from "../../Redux/Actions/Actions";
import CardSmallCliente from "../../Components/Cards/Card_Small Cliente/Card_Small_Cliente";
import { createTheme, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

export default function Clientes(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllClientes())
    }, [dispatch])
  

    let AllClientes = useSelector((state)=>(state.AllClientes))
    const [filter,setFilter] = useState("")
    
    AllClientes.sort(function(a,b){
        if(a.nombre>b.nombre){return 1}
        if(a.nombre<b.nombre){return -1}
        return 0})
    
    const filtrado = (e) =>{
        e.preventDefault()
        setFilter(e.target.value)
        dispatch(filtrarClientes(filter,AllClientes))
        if(e.target.value=="")dispatch(getAllClientes())
    }
    const outerTheme = createTheme({
        palette: {
            primary: {
                main: 'rgb(255, 159, 0)',
            }
        }
        })


    return(
        <div className={style.conteinerAll}>
                <NavBar
                title={"Clientes"}
                onClick={"/home"}
                />
                <div  className={style.search}>
                <ThemeProvider theme={outerTheme}>
                <TextField value={filter} focused="true"  placeholder="ingrese nombre🔎"  onChange={filtrado}/>
                </ThemeProvider>
                </div>
                <div>
                    <div className={style.titles}>
                        <div className={style.title1}><b>Nombre</b></div>
                        <div className={style.title2}><b>Cuil</b></div>
                        <div className={style.title3}><b>Saldo($)</b></div>
                    </div>
                    <div className={style.cardsCont}>
                    {AllClientes.map((a)=>{

                        return(
                            <CardSmallCliente
                                key={a.id}
                                id={a.id}
                                nombre={a.nombre}
                                tipo={"Clientes"}
                                pago={false}
                                cuil= {a.cuil}
                            />
                        )
                    })}
                    
                    </div>
                    <div className={style.buttonLarge}>
                        <LargeButton
                            title={"Agregar Cliente"}
                            onClick={()=>navigate("/Clientes/Form/0")}
                        ></LargeButton>
                    </div>
                </div>
            
            {/* <div className={styleCl.marca}>
                <Marca/>
            </div> */}
        </div>
    )
}