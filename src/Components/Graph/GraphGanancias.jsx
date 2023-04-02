import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries
} from 'react-vis';

const GraficoGanancias = (kgSemanal) => {
   let kg = kgSemanal.kgSemanal
    return (
        <div style={{ color: "red", backgroundColor: "var(--ColorFour)", width: "400px", height: "250px", borderRadius: "20px", paddingLeft: "5px", paddingTop: "5px" }}>
            <XYPlot width={380} height={250} xType={"linear"} yDomain={[0, 4]} xDomain={[0, 5]}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis 
                    title={"Semanas"}

                />
                <YAxis 
                    title={"Tn"}
                />
                <LineMarkSeries
                    style={{
                        strokeWidth: '3px',
                        fill: 'none',
                    }}
                    lineStyle={{ stroke: 'var( --ColorOne)' }}
                    markStyle={{ stroke: 'var(--ColorOne)' }}
                    data={[{ x: 1, y: +kg[0]/1000 }, { x: 2, y: +kg[1]/1000 }, { x: 3, y: +kg[2]/1000 }, { x: 4, y: +kg[3]/1000}, { x: 5, y: kg[4]?(+kg[4]/1000):+kg[3]/1000}]}

                />

            </XYPlot>
        </div>
    );
}

export default GraficoGanancias