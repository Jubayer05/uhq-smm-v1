import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Instagram Followers", "YouTube Views", "TikTok Likes", "SEO Services"],
  datasets: [
    {
      label: "Order Categories",
      data: [300.75, 834.35, 507.38, 146.24],
      backgroundColor: [
        "#00cfff", // Instagram Followers
        "#a259ff", // YouTube Views
        "#ff9f40", // TikTok Likes
        "#f734e5", // SEO Services
      ],
      borderWidth: 3,
      borderColor: "#1e1e2f",
      cutout: "75%",
    },
  ],
};

const options = {
  cutout: "75%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `$${tooltipItem.raw.toFixed(2)}`;
        },
      },
      backgroundColor: "#111827",
      titleColor: "#fff",
      bodyColor: "#fff",
      cornerRadius: 6,
      padding: 10,
    },
  },
};

const labels = [
  { color: "#00cfff", text: "Instagram Followers", value: "$300.75" },
  { color: "#a259ff", text: "YouTube Views", value: "$834.35" },
  { color: "#ff9f40", text: "TikTok Likes", value: "$507.38" },
  { color: "#f734e5", text: "SEO Services", value: "$146.24" },
];

const DashboardCard06 = () => {
  return (
    <div className="p-4 bg-white dark:bg-[rgba(37,33,57,1)] shadow-xs border dark:border-[#FFFFFF] w-full max-w-sm">
      <h2 className="text-xl font-light mb-8">My Order Categories</h2>

      <div className="relative flex justify-center mb-4">
        <div className="w-40 h-40">
          <Doughnut data={data} options={options} />
        </div>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-lg font-semibold">$834.35</div>
          <div className="text-xs text-gray-400">Affiliate</div>
        </div>
      </div>

      <div className="text-sm space-y-4 mt-8">
        {labels.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex font-light items-center gap-2">
              <span
                className="w-2.5 h-2.5 font-light rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              {item.text}
            </div>
            <div className=" font-light text-gray-400">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard06;
