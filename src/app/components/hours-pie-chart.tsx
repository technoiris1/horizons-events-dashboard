"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
];

interface Props {
  approved: number;
  rejected: number;
  inReview: number;
  unsubmitted: number;
}

export default function HoursPieChart({
  approved,
  rejected,
  inReview,
  unsubmitted,
}: Props) {
  const data = [
    {
      name: "Approved",
      value: Math.round(approved),
    },
    {
      name: "Rejected",
      value: Math.round(rejected),
    },
    {
      name: "In Review",
      value: Math.round(inReview),
    },
    {
      name: "Unsubmitted",
      value: Math.round(unsubmitted),
    },
  ];

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={75}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}