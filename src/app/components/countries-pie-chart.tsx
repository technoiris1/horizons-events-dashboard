"use client";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#475569",
];

export default function CountryPieChart({
  countries,
}: {
  countries: {
    country: string;
    count: number;
  }[];
}) {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={countries}
            dataKey="count"
            nameKey="country"
            innerRadius={75}
            outerRadius={110}
          >
            {countries.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}