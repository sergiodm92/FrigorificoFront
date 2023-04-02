import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
    if(data.length===2){
        const chartData = {
          labels: ["Saldo a Faenas", "Saldos a Proveedores"],
          datasets: [
            {
              data: data,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        };
        
        return <Pie data={chartData} />;
      }
    if(data.length===3 || data.length===2){
  const chartData = {
    labels: ["Valor estimado de Stock", "Saldos por cobrar", "Total en Caja"],
    datasets: [
      {
        data: data,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  
  return <Pie data={chartData} />;
}
if(data.length===4){
    const chartData = {
      labels: ["Valor estimado de Stock", "Saldos por cobrar", "Total en Caja","Total a Pagar"],
      datasets: [
        {
          data: data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8884D8"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56","#8884D8"],
        },
      ],
    };
    
    return <Pie data={chartData} />;
  }

};

export default PieChart;
