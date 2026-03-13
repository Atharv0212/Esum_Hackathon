import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface HealthScoreGaugeProps {
  score: number;
  size?: "small" | "large";
}

export function HealthScoreGauge({ score, size = "large" }: HealthScoreGaugeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "#10b981"; // Green
    if (score >= 60) return "#f59e0b"; // Amber
    if (score >= 40) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return "Low Risk";
    if (score >= 60) return "Moderate Risk";
    if (score >= 40) return "High Risk";
    return "Critical Risk";
  };

  const data = [
    { value: score },
    { value: 100 - score }
  ];

  const color = getColor(score);
  const riskLevel = getRiskLevel(score);
  const dimension = size === "large" ? 200 : 120;
  const fontSize = size === "large" ? "text-4xl" : "text-2xl";
  const labelSize = size === "large" ? "text-base" : "text-sm";

  return (
    <div className="relative flex flex-col items-center">
      <ResponsiveContainer width={dimension} height={dimension}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={size === "large" ? "70%" : "65%"}
            outerRadius={size === "large" ? "85%" : "80%"}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${fontSize} font-bold`} style={{ color }}>{score}</span>
        <span className={`${labelSize} text-gray-600 mt-1`}>/ 100</span>
      </div>
      <span className={`${labelSize} font-medium mt-2`} style={{ color }}>{riskLevel}</span>
    </div>
  );
}
