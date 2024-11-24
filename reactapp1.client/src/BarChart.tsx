import { Bar } from 'react-chartjs-2'

function BarChart({ chartData}) {

    return (
        <Bar data={chartData} width="700px" height="400px"/>
    );
};

export default BarChart;
