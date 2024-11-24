/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bar } from 'react-chartjs-2'

interface Props {
    chartData?: any
    // any props that come into the component
}

function BarChart({ chartData }:Props) {

    return (
        <Bar data={chartData} width="700px" height="400px"/>
    );
};

export default BarChart;
