import React from "react";
import tableVentaStyle from "./tableVentaStyle.module.scss";

export default function Table_Stock({ array }) {
  return (
    <div className={tableVentaStyle.conteiner}>
      <table className="table">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>1/2 Res</th>
            <th>1/4 D</th>
            <th>1/4 T</th>
          </tr>
        </thead>
        <tbody>
          {array.map((e, j) => {

            return (
              e[0] === "Total kg Vaca" || e[0] === "Total kg Cerdo" ?
                <tr key={j} className="table-dark">
                  {e.map((a, i) => {
                    return <td key={i}>{a}</td>;
                  })}
                </tr> :
                <tr key={j} className={"table-warning"}>
                  {e.map((a, i) => {
                    return <td key={i}>{a}</td>;
                  })}
                </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
