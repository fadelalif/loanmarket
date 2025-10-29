type LegendItemProps = {
  percentage: number;
  name: string;
};

const LegendItem = ({ percentage, name }: LegendItemProps) => {
  return (
    <div className="flex items-center space-x-3 w-full max-w-xs">
      <div className="text-xl font-bold text-[#17A9E2] w-12 text-right">
        {percentage}%
      </div>
      <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
      <div className="text-gray-700 text-sm">{name}</div>
    </div>
  );
};

export default LegendItem;
