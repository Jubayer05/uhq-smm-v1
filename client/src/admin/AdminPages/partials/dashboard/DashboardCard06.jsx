import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard06 = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ["YouTube Views", "Other"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#7129FF", "#444"], // Placeholder
        borderWidth: 0,
        cutout: "72%",
      },
    ],
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "#7129FF");
    gradient.addColorStop(1, "#FD00E3");

    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          backgroundColor: [gradient, "#e5e7eb"], // gray-200 in light mode
        },
      ],
    }));
  }, []);

  const options = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="p-6 bg-white dark:bg-[#141126] text-gray-900 dark:text-white shadow-xs border border-gray-200 dark:border-gray-500 w-full max-w-xl rounded-xl">
      <div className="text-md text-gray-800 dark:text-gray-100 mb-4">Top Category</div>
      <div className="text-3xl mb-6 font-semibold text-gray-900 dark:text-white">YouTube Views</div>
      <p className="text-md mb-4 text-gray-600 dark:text-gray-400">
        Last 30 Days <span className="text-green-600 dark:text-green-500">+10%</span>
      </p>
      <div className="relative flex justify-center mb-4">
        <div className="mt-4 w-40 h-40">
          <Doughnut ref={chartRef} data={chartData} options={options} />
        </div>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-xl font-semibold">54%</div>
        </div>
      </div>
      <div className="text-md text-gray-800 dark:text-gray-100 font-bold text-center">12,432 Orders</div>
    </div>
  );
};

export default Dashboard06;
