import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
} from "chart.js";


Chart.register(
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title
);

export default function LineCharts(props) {

    function getOptions() {
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: props.title
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (props.asPercentage) {
                                label += context.parsed.y.toFixed(2) + '%';
                            } else {
                                label += context.parsed.y.toFixed(0);
                            }
                            return label;
                        },
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: props.y_min_max && props.y_min_max[0],
                    max: props.y_min_max && props.y_min_max[1],
                },
            },

        };

        return options;
    }

    function getLabels() {
        const labels = props.labels;
        return labels;
    }

    function getData() {
        const data = {
            labels: getLabels(),
            datasets: [
                {
                    label: props.label1,
                    data: props.data1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255,255,255,1)'
                },
                {
                    label: props.label2,
                    data: props.data2,
                    borderColor: 'rgba(0,128,0)',
                    backgroundColor: 'rgba(255,255,255,1)',
                }
            ]
        };
        return data;
    }

    return (
        <div className="card w-full h-full bg-slate-400 text-white font-serif">
            <div className="card-body !p-2">
                <Line options={getOptions()} data={getData()} />
            </div>
        </div>
    )
}
