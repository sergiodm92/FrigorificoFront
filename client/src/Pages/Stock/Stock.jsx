import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllReses} from "../../Redux/Actions/Actions.js"
import NavBar from "../../Components/Navbar/Navbar";
import CardSmall from "../../Components/Cards/Card_Small/Card_Small";
import styleSt from "./Stock.module.scss";
import Table_Stock from "../../Components/Details/Table_Stock";


export default function Stock(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllReses())
    }, [dispatch])

    const AllResesStockTrue = useSelector((state)=>(state.AllResesStockTrue))
    const arrayResByTropa = useSelector((state)=>(state.arrayResByTropa))
    
    // arrayResByTropa.sort(function(a,b){
    //     if(a[0].tropa>b[0].tropa){return 1}
    //     if(a[0].tropa<b[0].tropa){return -1}
    //     return 0}) 
    // console.log(arrayResByTropa)
    

    let total_kg=["Total kg","","",0]
    let vaq=["Vaquillona",0,0,0]
    let vaca=["Vaca",0,0,0]
    let nov=["Novillito",0,0,0]
    let toro=["Toro",0,0,0]
    let Novp=["Novillo Pesado",0,0,0]

    // console.log(AllResesStockTrue)
    AllResesStockTrue.map((a)=>{
            total_kg[3]+=a.kg;
            if(a.categoria==="Vaquillona"){
                if(a.correlativo.includes("D")) vaq[2]++
                if(a.correlativo.includes("T")) vaq[3]++
                else vaq[1]++
            }
            if(a.categoria==="Vaca"){
                if(a.correlativo.includes("D")) vaca[2]++
                if(a.correlativo.includes("T")) vaca[3]++
                else vaca[1]++
            }
            if(a.categoria==="Novillito"){
                if(a.correlativo.includes("D")) nov[2]++
                if(a.correlativo.includes("T")) nov[3]++
                else nov[1]++
            }
            if(a.categoria==="Toro"){
                if(a.correlativo.includes("D")) toro[2]++
                if(a.correlativo.includes("T")) toro[3]++
                else toro[1]++
            }
            if(a.categoria==="Novillo Pesado"){
                if(a.correlativo.includes("D")) toro[2]++
                if(a.correlativo.includes("T")) toro[3]++
                else Novp[1]++
            }
        })

var array=[vaq,vaca,nov,toro,Novp,total_kg]
    return(
        <div className={styleSt.Conteiner}>
            <NavBar
            title={"Stock"}
            />
            <div className={styleSt.contTable}>
                <Table_Stock
                    array={array}
                />
            </div>
            <div className={styleSt.title}>
                <div><b>Fecha</b></div>
                <div><b>|</b></div>
                <div><b>Frigorífico</b></div>
                <div><b>|</b></div>
                <div><b>Tropa</b></div>
            </div>
            <div className={styleSt.cardsCont}>
                {arrayResByTropa.map((a,i)=>{
                    return(
                        <CardSmall
                            id={i}
                            fecha={a[0].fecha}
                            otro={a[0].frigorifico}
                            monto={a[0].tropa}
                            tipo={"Detalle_Stock_Tropa"}
                            pago={false}
                        />
                    )
                })}
            </div>
        </div>
    )
}
