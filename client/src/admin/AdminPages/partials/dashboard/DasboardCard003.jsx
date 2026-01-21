import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { day: "Mon", users: 100 },
  { day: "Tue", users: 100 },
  { day: "Wed", users: 100 },
  { day: "Thu", users: 100 },
  { day: "Fri", users: 100 },
  { day: "Sat", users: 100 },
  { day: "Sun", users: 100 },
];

const DashboardCard003 = () => {
  return (
    <div className="bg-white dark:bg-[#1A172B] p-6 rounded-xl shadow-md w-full max-w-lg border border-gray-200 dark:border-gray-500">
      <div className="mb-1">
        <p className="text-sm text-gray-500 mb-3 dark:text-gray-400">Daily Active Users</p>
        <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white">+7%</h2>
        <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
          Last 7 Days <span className="text-green-600 dark:text-green-500">+7%</span>
        </p>
      </div>

      <div className="mt-0">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            {/* Define gradient above Bar */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              stroke="#94A3B8"
              tick={{
                fill: "#94A3B8",
                fontSize: 12,
                dy: 12, // pushes the label downward (adds margin-top)
              }}
            />


            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#1A172B",
                border: "none",
                color: "#fff",
              }}
              labelStyle={{ color: "#cbd5e1" }}
              itemStyle={{ color: "#fff" }}
            />

            <Bar dataKey="users" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((_, index) => (
                <Cell key={index} fill="url(#barGradient)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCard003;
