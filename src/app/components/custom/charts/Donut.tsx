// DonutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
	data: {
		labels: string[];
		datasets: {
			data: number[];
			backgroundColor: string[];
			borderColor?: string[];
			borderWidth?: number;
		}[];
	};
}

const DonutChart = ({ data }: DonutChartProps): JSX.Element => {
	const options: ChartOptions<"doughnut"> = {
		plugins: {
			legend: {
				display: false, // Hide the legend
			},
			tooltip: {
				enabled: true, // Enable tooltips
			},
		},
	};

	return <Doughnut data={data} options={options} />;
};
export default DonutChart;
