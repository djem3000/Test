import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { getTemperatures } from "./services/ApiService"
import BarChart from './BarChart';

Chart.register(...registerables); 

function TemperatureChart() {
    const [years, setYears] = useState<number[]>([]);        
    const [selectedYear, setSelectedYear] = useState<number>(0); 
    const [labels, setLabels] = useState<string[]>([]); 
    const [temperatures, setTemperatures] = useState<number[]>([]); 
    
    const [chartData, setChartData] = useState({
        labels: labels,
        datasets: [{
            label: 'Temp в °C',
            data: temperatures,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    });

    useEffect(() => {      
        fetchData();                
    }, []); 

    async function fetchData(year?:number) {
        const data = await getTemperatures(year);
        setYears(data.years);
        setSelectedYear(data.year);
        setLabels(data.data.map(x => x.mounth));
        setTemperatures(data.data.map(x => x.temperature));

        setChartData({
            labels: data.data.map(x => x.mounth),
            datasets: [{
                label: 'Temp в °C',
                data: data.data.map(x => x.temperature),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        });
    }

    async function onChangedYear(event: React.ChangeEvent<HTMLSelectElement>): Promise<void> {
        await fetchData(Number(event.target.value));
    }

    return (
        <div>
            <p>
             <label htmlFor="years">Select the year:</label>
                <select id="years" onChange={onChangedYear} defaultValue={selectedYear }>
                        {years.map(y => <option key={y} >{ y}</option>) }                  
                </select> 
            </p>
              
            <BarChart chartData={chartData}/>
        </div>
    );
};

export default TemperatureChart;
