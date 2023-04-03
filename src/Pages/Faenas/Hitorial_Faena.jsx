import React, { useEffect } from "react";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./Faenas.module.scss";
import { getAllFaenas } from "../../Redux/Actions/Actions.js";
import { useDispatch, useSelector } from "react-redux";
import CardSmallFaenas from "../../Components/Cards/Card_Small_faenas/Card_Small";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Historial_Faena() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFaenas()); // trae las faenas de los ultimos 30 dias solamente
  }, [dispatch]);

  const AllFaenas = useSelector((state) => state.AllFaenas);
  AllFaenas.sort(function (a, b) {
    if (a.fecha > b.fecha) {
      return -1;
    }
    if (a.fecha < b.fecha) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={style.ConteinerFaenas}>
      <NavBar title={"Hist. Faenas"} />
      <div>
      <div className={style.titles}>
      <div className={style.title1}><b>Tipo</b></div>

                    <div className={style.title1}><b>Fecha</b></div>
                    <div className={style.title2}><b>Frigorífico</b></div>
                    <div className={style.title3}><b>Tropa</b></div>
                    <div className={style.title4}><b>Saldo($)</b></div>
                </div>
        <div className={style.cardsCont}>
          {AllFaenas.length > 0 ? (
            AllFaenas?.map((a, i) => {
              return (
                <CardSmallFaenas
                  id={a.id}
                  key={i}
                  fecha={a.fecha}
                  frigorifico={a.frigorifico}
                  tropa={a.tropa}
                  saldo={a.costo_total}
                  tipo={"Faenas"}
                  pago={false}
                  type={a.type === "vaca" ? "🐮" : "🐷"}
                />
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
