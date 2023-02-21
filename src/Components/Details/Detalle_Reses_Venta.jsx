import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss";

export default function TableDetRes({ venta }) {
  function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }

  const saldoTotalEstenPesos = currencyFormatter({
    currency: "USD",
    value: venta.saldo,
  });

  return (
    <div className={tableVentaStyle.conteinerDet}>
      <table className="table">
        <thead>
          <tr>
            <th>fecha</th>
            <th>Frigorífico</th>
            <th>Correlativo</th>
            <th>Categoria</th>
            <th>1/2 Res</th>
            <th>kg</th>
            <th>$/kg</th>
          </tr>
        </thead>
        <tbody>
          {venta.detalle.map((a, j) => {
            return (
              <tr key={j} className={"table-warning"}>
                <td>
                  {new Date(venta.fecha)
                    .toLocaleDateString("es")
                    .replaceAll("/", "-")}
                </td>
                <td>{a.correlativo.includes("-") ? "El Hueco" : "Natilla"}</td>
                <td>{a.correlativo}</td>
                <td>{a.categoria}</td>
                <td>{a.total_media}</td>
                <td>{a.kg}</td>
                <td>
                  {currencyFormatter({
                    currency: "USD",
                    value: a.precio_kg,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="table">
        <thead>
          <tr>
            <th>Total KG</th>
            <th>{venta.kg} kg</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Total $</th>
            <th>
              {currencyFormatter({
                currency: "USD",
                value: venta.total,
              })}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
