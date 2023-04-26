import React, { useEffect, useState } from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    getAllFaenas,
    getAllVentas,
    getAllVentasAchuras,
    getAllVentasultimos30dias,
    getCaja,
    getFaenasUltimosVeinteDias,
    getSaldoAllComrpas,
    getSaldoAllFaenas,
    getSaldoAllVentas
} from "../../Redux/Actions/Actions.js"
import NavBar from "../../Components/Navbar/Navbar"
import styleBalance from "./Balance.module.scss"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Graph from '../../Components/Graph/Graph'
import PieChart from "../../Components/Graph/Pie.jsx";
import GraficoGanancias from "../../Components/Graph/GraphGanancias.jsx";

export default function Balance() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFaenas())
        dispatch(getAllVentas())
        dispatch(getAllVentasAchuras())
        dispatch(getSaldoAllComrpas())
        dispatch(getSaldoAllVentas())
        dispatch(getSaldoAllFaenas())
        dispatch(getAllVentasultimos30dias())
        dispatch(getFaenasUltimosVeinteDias())
        dispatch(getCaja())
    }, [dispatch])

    const AllFaenas = useSelector((state) => state.ultimasFaenas)
    const AllVentasAchuras = useSelector((state) => state.AllVentasAchuras)
    const VentasUltimos30Dias = useSelector((state) => state.VentasUltimos30Dias)
    const saldoTotalProveedores = useSelector((state) => state.saldoAllCompras)
    const saldoTotalClientes = useSelector((state) => state.saldoAllVentas)
    const saldoTotalFaenas = useSelector((state) => state.saldoAllFaenas)
    const caja = useSelector((state) => state.caja.total)


    let [totalDeAchuras, settotalDeAchuras] = useState(0)
    let [totalDeAchuras30Dias, settotalDeAchuras30Dias] = useState(0)

    const kgPorSemana = VentasUltimos30Dias.reduce((acumulador, venta) => {
        const fechaVenta = new Date(venta.fecha);
        const diaSemana = fechaVenta.getDay();
        const fechaInicioSemana = new Date(fechaVenta.getFullYear(), fechaVenta.getMonth(), fechaVenta.getDate() - diaSemana);
        const fechaInicioSemanaStr = fechaInicioSemana.toLocaleDateString();

        acumulador[fechaInicioSemanaStr] = (acumulador[fechaInicioSemanaStr] || 0) + venta.kg;

        return acumulador;
    }, {});

    const kgPorSemanaArray = Object.values(kgPorSemana);



    const margen = 1.07;  // El valor estimado del stock se le considera una venta con margen del 7%.
    let kgEnStock = 0;      // Variable que acumula la cantidad de kilogramos en stock.
    let totalEstimado = 0;  // Variable que acumula el costo estimado de los productos en stock.

    // Recorre todas las faenas y sus detalles.
    AllFaenas.forEach(faena => {
        faena.detalle.forEach(detalle => {

            // Suma el costo estimado y la cantidad de kilogramos en stock si se cumple alguna de estas condiciones.
            if (detalle.stock && detalle.costo_kg) {
                if (detalle.CuartoT > 0) {
                    kgEnStock += +detalle.CuartoT;
                    totalEstimado += +detalle.costo_kg * +detalle.CuartoT * margen;
                } else if (detalle.CuartoD > 0) {
                    kgEnStock += +detalle.CuartoD;
                    totalEstimado += +detalle.costo_kg * +detalle.CuartoD * margen;
                } else if (detalle.kg > 0) {
                    kgEnStock += +detalle.kg;
                    totalEstimado += +detalle.costo_kg * +detalle.kg * margen;
                }
            }
        });
    });

    let acumKg = 0;
    let acumKg30dias = 0;
    let gananciaUltimos30Dias = 0;
    let gananciaMensual = 0;

    const mesActual = new Date().getMonth()
    if (VentasUltimos30Dias.length) {
        VentasUltimos30Dias.forEach(venta => {
            gananciaUltimos30Dias += +venta.total - +venta.costo;
            acumKg30dias += +venta.kg;
            if (new Date(venta.fecha).getMonth() === mesActual) {
                gananciaMensual += +venta.total - +venta.costo;
                acumKg += +venta.kg;
            }
        });
    }

    if (AllVentasAchuras.length) {
        AllVentasAchuras.forEach(venta => {
            totalDeAchuras30Dias += +venta.cantidad;
            if (new Date(venta.fecha).getMonth() === mesActual) {
                totalDeAchuras += +venta.cantidad;
            }
        }
        )
    }

    function currencyFormatter({ currency, value }) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        })
        return formatter.format(value)
    }

    function formatCurrency(value) {
        return currencyFormatter({
            currency: "USD",
            value: value
        });
    }

    const totalEstenPesos = formatCurrency(totalEstimado);
    const gananciaMensualUltimos30EnPesos = formatCurrency(gananciaUltimos30Dias);
    const gananciaMensualEnPesos = formatCurrency(gananciaMensual);
    const saldoFaenaPendienteEnPesos = formatCurrency(saldoTotalFaenas);
    const saldoProvPendienteEnPesos = formatCurrency(saldoTotalProveedores);
    const saldoClientePendienteEnPesos = formatCurrency(saldoTotalClientes);
    const saldoPagarEnPesos = formatCurrency(saldoTotalFaenas + saldoTotalProveedores);
    const patrimonioEnPesos = formatCurrency(saldoTotalClientes + caja);
    const cajaFormat = formatCurrency(caja);

    const chartData = [totalEstimado, saldoTotalClientes, caja];
    const chartData2 = [totalEstimado, saldoTotalClientes, caja, saldoTotalFaenas + saldoTotalProveedores]
    const chartData3 = [saldoTotalFaenas, saldoTotalProveedores]

    return (
        <div className={styleBalance.ConteinerBalance}>
            <NavBar
                title="Balance"
            />
            {saldoTotalClientes ?
                <div className={styleBalance.dashboard}>
                    <div className={styleBalance.dashboardTopConteiner}>
                        <div className={styleBalance.dashboardTop}>
                            <div className={styleBalance.divTop}>

                                <p>{gananciaMensualEnPesos} </p>
                                <p className={styleBalance.titles}>Margenes mes actual </p>
                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{gananciaMensualUltimos30EnPesos} </p>
                                <p className={styleBalance.titles}>Margenes ultimos 30 dias </p>
                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{totalDeAchuras} un.</p>
                                <p className={styleBalance.titles}>N° de achuras </p>
                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{acumKg.toFixed(2)} kg</p>
                                <p className={styleBalance.titles}>Kg vendidos mensual </p>
                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{acumKg30dias.toFixed(2)} kg</p>
                                <p className={styleBalance.titles}>Kg vendidos 30 dias</p>
                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{totalEstenPesos}</p>
                                <p className={styleBalance.titles}> Valor aprox. en Stock </p>
                            </div>
                        </div>
                    </div>
                    <div className={styleBalance.dashboardTopConteiner}>
                        <div className={styleBalance.dashboardTop}>
                            <div className={styleBalance.divTop}>
                                <p>{saldoProvPendienteEnPesos}</p>
                                <p className={styleBalance.titles}>Saldo a Proveedores</p>
                            </div>

                            <div className={styleBalance.divTop}>
                                <p>{saldoFaenaPendienteEnPesos}</p>
                                <p className={styleBalance.titles}>Saldo a Frigorificos</p>
                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{saldoClientePendienteEnPesos}</p>
                                <p className={styleBalance.titles}>Total por cobrar</p>
                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{cajaFormat}</p>
                                <p className={styleBalance.titles}>Total en Caja</p>

                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{patrimonioEnPesos}</p>
                                <p className={styleBalance.titles}>Total por cobrar + caja</p>
                            </div>
                            <div className={styleBalance.divTop}>
                                <p>{saldoPagarEnPesos}</p>
                                <p className={styleBalance.titles}>Total por pagar</p>
                            </div>
                        </div>
                    </div>
                    <div className={styleBalance.divBotton}>
                        <div className={styleBalance.pie}>
                            <PieChart
                                data={chartData2}
                                className={styleBalance.pie}
                            />
                        </div>
                        <div className={styleBalance.GraphVar}>
                            <GraficoGanancias
                                kgSemanal={kgPorSemanaArray}
                            />
                            <p>Grafico de kg vendidos(Tn) / tiempo(semanas)</p>
                        </div>
                        <div className={styleBalance.divDeudas}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <p className={styleBalance.titles}>Deudas a Proveedores</p>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>1° Finca la Soñada </p><p>$2.456.670</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>2° Los Nogales </p><p>$1.830.770</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>3° Fabian Ori </p><p>$1.606.060</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>4° Finca don Albero</p><p>$953.104</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>5° Ferreyra Spesot</p><p>$888.075</p>
                            </div>
                        </div>
                        <div className={styleBalance.divDeudas}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <p className={styleBalance.titles}>Deudas de Clientes</p>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>1° Don Alberto </p><p>$958.500</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>2° Jorge Barrion </p><p>$835.200</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>3° Jorge Dias </p><p>$548.900</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>4° Kelo Ance</p><p>$443.600</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>5° Ricardo Cabre</p><p>$432.160</p>
                            </div>
                        </div>

                    </div>
                </div>
                :
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                </Box>
            }
            {/* <Graph
                    className={styleBalance.Graph}
                />  */}


        </div>
    )
}

/*
  <table className="table">
                        <tbody>
                            <tr>
                                <td className="table-warning">Ganancia (30 Dias)</td>
                                <td className="table-warning">{gananciaMensualUltimos30EnPesos}</td>
                            </tr>
                            <tr>
                                <td className="table-warning">Ganancia (mes actual)</td>
                                <td className="table-warning">{gananciaMensualEnPesos}</td>
                            </tr>
                            <tr>
                                <td className="table-warning">Kg vendidos (30 Dias)</td>
                                <td className="table-warning">{acumKg30dias.toFixed(2)}kg</td>
                            </tr>
                            <tr>
                                <td className="table-warning">Kg vendidos (mes actual)</td>
                                <td className="table-warning">{acumKg.toFixed(2)}kg</td>
                            </tr>
                            <tr>
                                <td className="table-warning">N° de juegos de achuras (mes actual)</td>
                                <td className="table-warning">{totalDeAchuras}</td>
                            </tr>
                            <tr>
                                <td className="table-warning">N° de juegos de achuras (30 dias)</td>
                                <td className="table-warning">{totalDeAchuras30Dias}</td>
                            </tr>
                            <tr>
                                <td className="table-dark" colSpan="2">Stock</td>
                            </tr>
                            <tr>
                                <td className="table-warning">Cantidad</td>
                                <td className="table-warning">{kgEnStock} kg</td>
                            </tr>
                            <tr>
                                <td className="table-warning">Valor estimado</td>
                                <td className="table-warning">{totalEstenPesos}</td>
                            </tr>
                            <tr>
                                <td className="table-dark" colSpan="2">Proveedores</td>
                            </tr>
                            <tr>
                                <td className="table-warning">Saldo pendiente</td>
                                <td className="table-warning">{saldoProvPendienteEnPesos}</td>
                            </tr>
                            <tr>
                                <td className="table-dark" colSpan="2">Clientes</td>
                            </tr>
                            <tr>
                                <td className="table-warning">Saldo pendiente</td>
                                <td className="table-warning">{saldoClientePendienteEnPesos}</td>
                            </tr>
                            <tr>
                                <td className="table-dark" colSpan="2">Faena</td>
                            </tr>
                            <tr>
                                <td className="table-warning">Saldo pendiente</td>
                                <td className="table-warning">{saldoFaenaPendienteEnPesos}</td>
                            </tr>

                            <tr>
                                <td className="table-dark" colSpan="2">General</td>
                            </tr>
                            <tr>
                                <td className="table-success">Saldo total a cobrar</td>
                                <td className="table-success">{saldoClientePendienteEnPesos}</td>
                            </tr>
                            <tr>
                                <td className="table-danger">Saldo total a pagar</td>
                                <td className="table-danger">{saldoPagarEnPesos}</td>
                            </tr>
                        </tbody>
                    </table>
*/

