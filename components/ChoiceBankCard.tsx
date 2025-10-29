import React from "react";
import Image from "next/image";

export interface ChoiceBankCardProps {
  bankLogo: string;
  rating: number;
  reviewsCount: number;
  productName: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
  id: string;
}

const ChoiceBankCard: React.FC<ChoiceBankCardProps> = ({
  bankLogo,
  rating,
  reviewsCount,
  productName,
  description,
  isSelected,
  onSelect,
  id,
}) => {
  const renderStars = (currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={`${id}-star-${i}`}
        className={`fa-solid fa-star text-sm ${
          i < currentRating ? "text-yellow-400" : "text-gray-300"
        }`}
      ></i>
    ));
  };

  return (
    <div
      className={`
        relative bg-white rounded-lg shadow-sm border
        p-4 cursor-pointer transition-all duration-200 h-full {/* Tambah h-full */}
        flex flex-col {/* Pastikan flex column */}
        ${
          isSelected
            ? "border-[#17A9E2] ring-2 ring-[#17A9E2]"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
      onClick={onSelect}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        aria-labelledby={`bank-card-label-${id}`}
        className="
          absolute top-3 left-3 h-5 w-5
          text-[#17A9E2] border-gray-300 rounded
          focus:ring-0 focus:ring-offset-0 pointer-events-none
        "
      />
      <div className="flex flex-col items-center text-center flex-grow">
        {" "}
        <div className="w-full h-[100px] mb-3 relative">
          {" "}
          <Image
            src={bankLogo}
            alt={`${productName} Logo`}
            layout="fill"
            objectFit="contain"
            className="mb-3"
          />
        </div>
        <div className="flex items-center space-x-1">{renderStars(rating)}</div>
        <p className="text-xs text-gray-500 mb-2">
          {reviewsCount.toLocaleString()} Reviews
        </p>
        <p
          id={`bank-card-label-${id}`}
          className="text-sm font-semibold text-gray-800 mb-1"
        >
          {productName}
        </p>
        <div className="mt-auto w-full">
          {" "}
          {description && (
            <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
          )}
          {!description && <p className="text-xs text-gray-400">null</p>}
        </div>
      </div>
    </div>
  );
};

export default ChoiceBankCard;
