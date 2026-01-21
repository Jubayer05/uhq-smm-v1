import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Aug", value: 70 },
  { name: "Sep", value: 50 },
  { name: "Oct", value: 75 },
  { name: "Nov", value: 60 },
  { name: "Dec", value: 80 },
  { name: "Jan", value: 40 },
  { name: "Feb", value: 65 },
];

const DashboardCard04 = () => {
  return (
    <div className="bg-white dark:bg-[#18122B] text-gray-900 dark:text-white rounded-xl shadow-md p-6 w-full max-w-lg border border-gray-200 dark:border-gray-500">
      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-3">Monthly Profit</h3>
      <div className="text-2xl font-semibold text-black dark:text-white">+15%</div>
      <p className="text-sm mt-6 text-gray-600 dark:text-gray-400">
        Last 12 Months <span className="text-green-600 dark:text-green-500">+15%</span>
      </p>

      <div className="mt-12">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF00FF" />
                <stop offset="100%" stopColor="#AA00FF" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              stroke="#7F7F9C"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2C2541",
                borderColor: "#2C2541",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCard04;
