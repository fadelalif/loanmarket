"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const chartData = {
  labels: ["BRI", "Artha Graha", "BTN", "Mandiri", "KEB Hana Bank"],
  datasets: [
    {
      data: [30, 25, 20, 15, 10],
      backgroundColor: [
        "#27346A",
        "#3AC2B8",
        "#88D6F2",
        "#317F9A",
        "#5A4F7F",
      ],
      borderColor: "#FFFFFF",
      borderWidth: 2,
    },
  ],
};

const chartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "40%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
};

const BankApprovalChart = () => {
  return <Doughnut data={chartData} options={chartOptions} />;
};

export default BankApprovalChart;