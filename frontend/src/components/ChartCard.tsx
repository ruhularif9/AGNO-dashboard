// src/components/ChartCard.tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface ChartCardProps {
  title: string;
  data: { name: string; value: number }[];
}

const ChartCard = ({ title, data }: ChartCardProps) => {
  return (
    <div className="bg-gray-800 rounded shadow p-4">
      <h2 className="text-blue-400 font-semibold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid stroke="#2c2c2c" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
