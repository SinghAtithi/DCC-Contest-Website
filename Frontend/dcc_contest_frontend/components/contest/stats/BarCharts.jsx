import React from 'react';
import { Bar } from 'react-chartjs-2';
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

export default function BarCharts(props) {

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
                    label: props.label,
                    data: props.data,
                    borderColor: '#FF6384',
                    backgroundColor: "#FFB1C1",
                }
            ]
        };
        return data;
    }

    return (
        <div className="card w-full h-full bg-slate-400 text-white font-serif">
            <div className="card-body !p-2">
                <Bar options={getOptions()} data={getData()} />
            </div>
        </div>
    )
}
