//import React, { useEffect, useState } from 'react';
//import { Chart, registerables } from 'chart.js';
//import { getTemperatures } from "./services/ApiService"
import { Bar } from 'react-chartjs-2'
//Chart.register(...registerables); 

function BarChart({ chartData}) {
//    const [years, setYears] = useState<number[]>([]);        
//    const [selectedYear, setSelectedYear] = useState<number>(0); 
//    const [labels, setLabels] = useState<string[]>([]); 
//    const [temperatures, setTemperatures] = useState<number[]>([]); 
//    const [chart, setChart] = useState<Chart>();

//    useEffect(() => {
//        const ctx = document.getElementById('temperatureChart') as HTMLCanvasElement;
//        setChart(new Chart(ctx, {
//            type: 'bar', 
//            data: {
//                labels: labels,
//                datasets: [{
//                    label: 'Temp в °C',
//                    data: temperatures,
//                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                    borderColor: 'rgba(75, 192, 192, 1)',
//                    borderWidth: 1,
//                }],
//            },
//            options: {
//                scales: {
//                    y: {
//                        beginAtZero: true,
//                        title: {
//                            display: true,
//                            text: 'Temp (°C)',
//                        },
//                    },
//                    x: {
//                        title: {
//                            display: true,
//                            text: 'Mounths',
//                        },
//                    },
//                },
//                plugins: {
//                    legend: {
//                        display: true,
//                        position: 'top',
//                    },
//                    tooltip: {
//                        enabled: true,
//                    },
//                },
//            },
//        }));


//        fetchData();
        
//        return () => {
//            chart!.destroy();
//        };
//    }, []); 

//    async function fetchData(year?:number) {
//        const data = await getTemperatures(year);
//        setYears(data.years);
//        setSelectedYear(data.year);
//        setLabels(data.data.map(x => x.mounth));
//        setTemperatures(data.data.map(x => x.temperature));
//        chart?.update();
//    }

//    async function onChangedYear(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> {
//        await fetchData(Number(event.target.value));
//    }

    return (
        <Bar data={chartData} width="700px" height="400px"/>
    );
};

export default BarChart;
