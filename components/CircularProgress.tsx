import React from "react";

type Props = {
  percentage: number;
  children: React.ReactNode;
};

const CircularProgress = ({ percentage, children }: Props) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const visualPercentage = Math.min(percentage, 100);
  const offset = circumference * (1 - visualPercentage / 100);

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-gray-200"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-[#17A9E2]"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default CircularProgress;