import { useEffect, useState } from "react";

interface CircularProgressProps {
  score: number;
  size?: number;
}

export function CircularProgress({ score, size = 140 }: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(score);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [score]);

  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = (value: number) => {
    if (value >= 80) return "#10b981"; // emerald-500
    if (value >= 60) return "#f59e0b"; // amber-500
    if (value >= 40) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-bold ${size > 120 ? 'text-4xl' : 'text-2xl'}`}
          style={{ color: getColor(score) }}
        >
          {Math.round(progress)}
        </span>
        <span className={`text-gray-500 mt-0.5 ${size > 120 ? 'text-xs' : 'text-[10px]'}`}>/ 100</span>
      </div>
    </div>
  );
}