import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const DashboardCard04 = () => {
  const chartRef = useRef();
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradientStroke = ctx.createLinearGradient(0, 0, chart.width, 0);
    gradientStroke.addColorStop(0, "#7129FF");
    gradientStroke.addColorStop(1, "#FD00E3");

    setGradient(gradientStroke);
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
    datasets: [
      {
        label: "Current Week",
        data: [4500, 8000, 12000, 6000, 18542, 9000, 6000, 15000],
        borderColor: gradient || "#7129FF",
        backgroundColor: "rgba(253, 0, 227, 0.1)",
        tension: 0.5,
        fill: false,
        pointBackgroundColor: gradient || "#7129FF",
        pointRadius: 5,
      },
      {
        label: "Previous Week",
        data: [6000, 13000, 11000, 10000, 14000, 11000, 8000, 10000],
        borderColor: "#a1a1a1",
        backgroundColor: "rgba(161,161,161, 0.2)",
        tension: 0.5,
        fill: false,
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$ ${tooltipItem.raw.toLocaleString()}`,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#ccc",
          stepSize: 5000,
          callback: (value) => value.toLocaleString(),
        },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      x: {
        ticks: { color: "#ccc" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="mt-6">
      <div className="p-8 dark:bg-gradient-to-tr from-[#1c1c2c] to-[#2e0d3a] shadow-md border border-[#FFFFFF] bg-white dark:border-[#FFFFFF] dark:text-white w-full">
        <div className="mb-4">
          <h2 className="text-2xl font-light">My Order Activity</h2>
          {/* Flex layout adjustment for smaller screens */}
          <div className="flex flex-col sm:flex-row sm:gap-16 gap-6 mt-6 text-sm">
            <div className="flex flex-col items-start text-white">
              <span className="text-xs ml-5 text-gray-400 mb-1">Current Week</span>
              <div className="flex text-2xl dark:text-white text-black items-center gap-1">
                <span className="text-3xl text-pink-500">•</span> 45,320
              </div>
            </div>
            <div className="flex flex-col items-start text-white">
              <span className="text-xs ml-5 text-gray-400 mb-1">Previous Week</span>
              <div className="flex text-2xl dark:text-white text-black items-center gap-1">
                <span className="text-3xl text-[#a1a1a1]">•</span> 58,610
              </div>
            </div>
          </div>
        </div>
        {/* Chart container */}
        <div className="relative h-[250px] sm:h-[300px]">
          <Line ref={chartRef} data={data} options={options} />
          <div className="absolute left-[55%] top-[15%] bg-gradient-to-r from-[#7129FF] to-[#FD00E3] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
            $18,542
          </div>
          <div className="absolute right-0 bottom-[40px] text-[#FD00E3] text-sm font-semibold">
            +26%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard04;
