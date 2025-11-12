import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color: "blue" | "lightBlue" | "cyan" | "pink";
}

const colorClasses = {
  blue: "bg-blue-600",
  lightBlue: "bg-blue-400",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
};

const DashboardCard = ({ title, value, icon, color }: DashboardCardProps) => {
  return (
    <div
      className={`
        p-5 rounded-lg shadow-lg flex items-center justify-between
        ${colorClasses[color]}
        hover:scale-105 hover:shadow-2xl transition-transform duration-200
      `}
    >
      <div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="text-2xl font-bold mt-2 text-white">{value}</p>
      </div>
      {icon && <div className="text-white">{icon}</div>}
    </div>
  );
};

export default DashboardCard;
