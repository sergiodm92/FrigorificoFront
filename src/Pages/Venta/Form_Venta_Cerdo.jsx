import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import CardReses from "../../Components/Cards/CardReses/CardReses";
import ShortButton from "../../Components/Buttons/Button_Short/Button_Short";
import ButtonNew from "../../Components/Buttons/ButtonNew/ButtonNew";
import NavBar from "../../Components/Navbar/Navbar";
import style from "./Ventas.module.scss";
import {
  getAllClientes,
  getAllVentas,
  getClienteByName,
  getFaenasUltimosVeinteDias,
  postNewVentaCarne,
  putStockReses,
  setAlert,
} from "../../Redux/Actions/Actions";
//calendario-----------------------------------
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { ValidationsVentaCarne, validate, validate2 } from "./validationsVentaCarne";

//Form Venta
var formV = {
  id: 0,
  type: "cerdo",
  cliente: "",
  fecha: new Date().toLocaleDateString("en"),
  detalle: [],
  costo: 0,
  saldo: 0,
  total: 0,
  //total
  kg: 0,
  cant: 0,
};
//Form para cargar el detalle de la venta
var formComV = {
  correlativo: "",
  categoria: "",
  total_media: 0,
  kg: 0,
  kg_total: 0,
  costo_kg: 0,
  precio_kg: 0,
};

// Arrays para los selects
const categorias = [
  "Capon",
  "Chancha"
];
const res = ["total"];

const Form_Venta_Cerdo = () => {

  const dispatch = useDispatch();

  //Estados locales
  const [form, setForm] = useState(formV);
  const [formCV, setFormCV] = useState(formComV);
  const [error2, setError2] = useState({});
  const [resSelect, setresSelect] = useState({});
  const [margen, setMargen] = useState(0);
  const [arrResesTotales, setArrResesTotales] = useState([]);
  const [confirm, setconfirm] = useState(false);

  useEffect(() => {
    dispatch(getAllClientes());
    dispatch(getFaenasUltimosVeinteDias());
    dispatch(getAllVentas()); //Trae las faenas de los ultimos 30 dias solamente
  }, [dispatch]);

  //estados globales
  const alert_msj = useSelector((state) => state.alert_msj);
  const clientes = useSelector((state) => state.AllClientes);
  const AllFaenas = useSelector((state) => state.ultimasFaenas);

  let resesStockTrue = AllFaenas.filter(f=>f.tropa[f.tropa.length-1]==="C").reduce((allReses, a) => {
    return [...allReses, ...a.detalle.filter((s) => s.stock === true)];
  }, []);

  let stockByCat = resesStockTrue.filter(
    (a) => a.categoria === formCV.categoria && a.costo_kg 
  ); //reses con stock true filtrados por categoria

  useEffect(() => {
    if (formCV.correlativo !== "")
      setresSelect(
        resesStockTrue.find((a) => a.correlativo == formCV.correlativo)
      );
    if (formCV.precio_kg !== 0)
      setMargen(
        (
          ((+formCV.precio_kg - +resSelect.costo_kg) /
            (+resSelect.costo_kg)) *
          100
        ).toFixed(2)
      );
    if (formCV.total_media === "total") formCV.kg = +resSelect.kg;
  }, [formCV]);

  useEffect(() => {
    if (alert_msj !== "") {
      swal({
        title: alert_msj,
        icon: alert_msj === "Venta creada con éxito" ? "success" : "warning",
        button: "ok",
      });
    }
    dispatch(setAlert());
    form.detalle = [];
    setconfirm(false);
  }, [alert_msj]);

  useEffect(() => {
    if (form.cliente) {
      dispatch(getClienteByName(form.cliente));
    }
  }, [form]);

  const cliente = useSelector((state) => state.clienteByNombre);

  //handleChange del detalle
  const handleChangeCV = (e) => {
    e.preventDefault();
    setError2(
      validate2({
        ...formCV,
        [e.target.name]: e.target.value,
      })
    );
    setFormCV({
      ...formCV,
      [e.target.name]: e.target.value,
    });
  };

  //handleSubmit del detalle
  const handleSubmitRes = (e) => {
    e.preventDefault();
    if (
      !error2.categoria &&
      formCV.categoria &&
      !error2.correlativo &&
      formCV.correlativo &&
      !error2.precio_kg &&
      formCV.precio_kg
    ) {
      formCV.costo_kg = +resSelect.costo_kg;
      formCV.kg = +resSelect.kg;
      formCV.precio_kg = +formCV.precio_kg;
      form.detalle.unshift(formCV);
      arrResesTotales.push(formCV.correlativo);
      document.getElementById("categoria").selectedIndex = 0;
      document.getElementById("res").selectedIndex = 0;
      setFormCV(formComV);
    } else {
      swal({
        title: "Datos incorrectos, por favor intente nuevamente",
        icon: "warning",
        button: "ok",
      });
    }
  };

  //handleSubmit de la Venta completa
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidationsVentaCarne(form)) {
      setconfirm(true);
      let detallesPut = [];
      form.fecha = form.fecha.getTime();
      form.id =
        "V" + form.detalle[0].correlativo + Math.floor(Math.random() * 10000) + "C";
      if (form.detalle.length > 0) {
        form.detalle.forEach((a) => {
          if (+a.kg < 10) {
            swal({
              titleForm: "Alerta",
              text: "Faltan kg",
              icon: "warning",
              button: "ok",
            });
            return;
          }
          form.total += +a.kg * a.precio_kg;
          form.costo += +a.kg * a.costo_kg;
          form.kg += +a.kg;
          form.cant++;
        });
      }
      form.saldo = form.total;
      arrResesTotales.forEach((a) =>
        AllFaenas.forEach((g) => {
          if (g.detalle.some((f) => f.correlativo == a)) {
            let current = {};
            g.detalle.map((f, i) => {
              if (f.correlativo == a)
                current = {
                  res: f,
                  pos: i,
                  tropa: g.tropa,
                  detalle: g.detalle,
                };
            });
            current.res.stock = false;
            current.res.ventaID = form.id;
            detallesPut.push({ detalle: current.detalle, id: current.tropa });
          }
        })
      );
      console.log(form)
      dispatch(putStockReses(detallesPut));
      dispatch(postNewVentaCarne(form));
      document.getElementById("categoria").selectedIndex = 0;
      document.getElementById("res").selectedIndex = 0;
      document.getElementById("Cliente").selectedIndex = 0;
      setForm(formV);
    }
  };

  //carga de calendario
  const handleChangeDate = (date) => {
    setForm({
      ...form,
      fecha: date,
    });
  };

  //Select de Cliente
  function handleSelectCl(e) {
    setForm({
      ...form,
      cliente: e.target.value,
    });
  }

  //Select de Correlativo
  function handleSelectCorr(e) {
    setFormCV({
      ...formCV,
      correlativo: e.target.value,
    });
  }

  //Select de las reses
  function handleSelectRes(e) {
    setFormCV({
      ...formCV,
      total_media: e.target.value,
    });
  }

  //Select de las categorias
  function handleSelectCat(e) {
    setFormCV({
      ...formCV,
      categoria: e.target.value,
    });
  }

  //funcion para eliminar reses del detalle
  const handleDelete = (e) => {
    setForm({
      ...form,
      detalle: form.detalle.filter((d) => d !== e),
    });
    setArrResesTotales(arrResesTotales.filter((r) => r !== e.correlativo))
  };
  //tema del calendario
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: "#640909",
      },
    },
  });

  return (
    <div className={style.ConteinerVenta}>
      <NavBar title={"Nueva Venta"} />
      <div className={style.formContainer}>
        <form className={style.form}>
          <div className={style.formItem}>
            <h5 className={style.titleForm}>Cliente: </h5>
            <select
              id="Cliente"
              className="selectform"
              onChange={(e) => handleSelectCl(e)}
            >
              <option defaultValue>-</option>
              {clientes.length > 0 &&
                clientes.map((c, i) => (
                  <option key={i} value={c.nombre}>
                    {c.nombre.length < 20 ? c.nombre : c.nombre.slice(0, 17)}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.formItemDate}>
            <h5 className={style.titleForm}>Fecha: </h5>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
              <ThemeProvider theme={outerTheme}>
                <KeyboardDatePicker
                  format="dd-MM-yyyy"
                  value={form.fecha}
                  onChange={handleChangeDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
          <p
            className={
              form.fecha !== new Date().toLocaleDateString()
                ? style.pass
                : style.danger
            }
          >
            Debe ingresar la fecha
          </p>

          {/*----------------Carga del detalle---------------------*/}
          <div className={style.formItem2}>
            <div className={style.item}>
              <select
                id="categoria"
                className="selectform"
                onChange={(e) => handleSelectCat(e)}
              >
                <option defaultValue>Categoría</option>
                {categorias.length > 0 &&
                  categorias.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
              <select
                id="res"
                className="selectform"
                onChange={(e) => handleSelectRes(e)}
              >
                <option defaultValue="total">total</option>
              </select>
            </div>
            <div className={style.formItem}>
              <h5 className={style.titleForm}>Correlativo: </h5>
              <select
                className="selectform"
                onChange={(e) => handleSelectCorr(e)}
              >
                <option defaultValue>-</option>
                {stockByCat.length > 0 &&
                  stockByCat.map((c, i) => (
                    <option key={i} value={c.correlativo}>
                      {c.correlativo + "-" + c.kg}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <div className={style.item}>
                <h5 className={style.titleForm}>kg </h5>
                <h5 className={style.titleForm}>
                  {resSelect.kg}
                </h5>
              </div>
              <div className={style.item}>
                <h5 className={style.titleForm}>Costo/kg </h5>
                <h5 className={style.titleForm}>
                  {typeof resSelect.costo_kg !== "number"
                    ? null
                    : (+resSelect.costo_kg).toFixed(2)}
                </h5>
              </div>
            </div>

            <div className={style.item}>
              <h5 className={style.titleForm}>$/kg </h5>
              <input
                type="number"
                step="any"
                value={formCV.precio_kg ? formCV.precio_kg : ""}
                id="precio_kg"
                name="precio_kg"
                onChange={handleChangeCV}
                placeholder="0.00"
                className={style.size2}
              />
            </div>
            <div className={style.item}>
              <h5 className={style.titleForm}>Margen(%) </h5>
              <h5 className={style.titleForm}>{margen}</h5>
            </div>
          </div>
          <div className={style.button}>
            <ButtonNew
              style={"right"}
              icon={"right"}
              onClick={handleSubmitRes}
            />
          </div>
          {/*-----------------------------------------------------------*/}

          {form.detalle.length
            ? form.detalle.map((e, i) => {
              return (
                <CardReses
                  key={i}
                  correlativo={e.correlativo}
                  categoria={e.categoria}
                  kg={e.kg}
                  res={e.res}
                  costo_kg={e.costo_kg}
                  margen={e.margen}
                  precio_kg={+e.precio_kg}
                  onClick={() => handleDelete(e)}
                />
              );
            })
            : null}
          <div className={style.buttons} id={style.buttonOk}>
            <ShortButton
              title="✔ Confirmar"
              onClick={!confirm ? handleSubmit : null}
              color={!confirm ? "green" : "grey"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form_Venta_Cerdo;
