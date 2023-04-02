import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss";

export default function Tabla_Detalle_Stock_Tropa({ reses }) {
  let resesStockTrue = reses?.filter((res) => res.stock == true);
  let kgVaca = 0;
  let kgToro = 0;
  let kgNovillito = 0;
  let kgVaquillona = 0;
  let kgNovPes = 0;

  const totalesPorCategoria = resesStockTrue?.reduce((totales, res) => {
    const categoria = res.categoria || 0;
    const cuartoT = +res.CuartoT || 0;
    const cuartoD = +res.CuartoD || 0;
    const kg = +res.kg;

    if (categoria === "Vaca") {
      totales.Vaca += cuartoT > 0 ? cuartoT : (cuartoD > 0 ? cuartoD : kg);
    } else if (categoria === "Vaquillona") {
      totales.Vaquillona += cuartoT > 0 ? cuartoT : (cuartoD > 0 ? cuartoD : kg);
    } else if (categoria === "Novillito") {
      totales.Novillito += cuartoT > 0 ? cuartoT : (cuartoD > 0 ? cuartoD : kg);
    } else if (categoria === "Toro") {
      totales.Toro += cuartoT > 0 ? cuartoT : (cuartoD > 0 ? cuartoD : kg);
    } else if (categoria === "Novillo Pesado") {
      totales.NovilloPesado += cuartoT > 0 ? cuartoT : (cuartoD > 0 ? cuartoD : kg);
    }
    return totales;
  }, { Vaca: 0, Vaquillona: 0, Novillito: 0, Toro: 0, NovilloPesado: 0 });


  function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }

  let totalEstenPesos;

  return (
    <div className={tableVentaStyle.conteiner}>
      <table className="table">
        <tbody>
          <tr className="table-dark">
            <td>Correlativo</td>
            <td>Categoria</td>
            <td>kg</td>
            <td>Costo/kg</td>
          </tr>
          {resesStockTrue?.map((e, i) => {
            totalEstenPesos = currencyFormatter({
              currency: "USD",
              value: e.costo_kg ? e.costo_kg : 0,
            });
            return (
              <tr key={i} className={"table-warning"}>
                {e.CuartoT > 0 ? (
                  <td>
                    <b>{e.correlativo}T</b>
                  </td>
                ) : e.CuartoD > 0 ? (
                  <td>
                    <b>{e.correlativo}D</b>
                  </td>
                ) : (
                  <td>
                    <b>{e.correlativo}</b>
                  </td>
                )}
                <td>{e.categoria ? e.categoria : null}</td>
                <td>
                  {(+e.CuartoT > 0
                    ? +e.CuartoT
                    : +e.CuartoD > 0
                      ? +e.CuartoD
                      : +e.kg
                        ? +e.kg
                        : 0
                  ).toFixed(2)}
                </td>
                <td align="center">
                  {totalEstenPesos ? totalEstenPesos : null}
                </td>
              </tr>
            );
          })}
          {totalesPorCategoria?.Novillito ? (
            <tr className={"table-secondary"}>
              <td colSpan="2">
                <b>Total kg Novillito</b>
              </td>
              <td colSpan="2">{totalesPorCategoria.Novillito}</td>
            </tr>
          ) : null}
          {totalesPorCategoria?.NovilloPesado ? (
            <tr className={"table-secondary"}>
              <td colSpan="2">
                <b>Total kg Novillo Pesado</b>
              </td>
              <td colSpan="2">{totalesPorCategoria.NovilloPesado}</td>
            </tr>
          ) : null}
          {totalesPorCategoria?.Toro ? (
            <tr className={"table-secondary"}>
              <td colSpan="2">
                <b>Total kg Toro</b>
              </td>
              <td colSpan="2">{totalesPorCategoria.Toro}</td>
            </tr>
          ) : null}
          {totalesPorCategoria?.Vaca ? (
            <tr className={"table-secondary"}>
              <td colSpan="2">
                <b>Total kg Vaca</b>
              </td>
              <td colSpan="2">{totalesPorCategoria.Vaca}</td>
            </tr>
          ) : null}
          {totalesPorCategoria?.Vaquillona ? (
            <tr className={"table-secondary"}>
              <td colSpan="2">
                <b>Total kg Vaquillona</b>
              </td>
              <td colSpan="2">{totalesPorCategoria.Vaquillona}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
