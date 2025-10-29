import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BankProductCardProps {
  id: string;
  bankLogo: string;
  bankName: string;
  productName: string;
  rating: number;
  reviewsCount: number;
  usersYearly: number;
  details: {
    fixRate: string;
    maxTenor: string;
    loanToValue: string;
    jaminan: string;
    target: string;
    komisi: string;
  };
}

const BankProductCard: React.FC<BankProductCardProps> = ({
  id,
  bankLogo,
  bankName,
  productName,
  rating,
  reviewsCount,
  usersYearly,
  details,
}) => {
  const renderStars = (currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star text-base ${
          i < currentRating ? "text-[#17A9E2]" : "text-gray-300"
        }`}
      ></i>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 flex flex-col md:flex-row items-start space-x-0 md:space-x-6">
      <div className="flex-shrink-0 w-full md:w-1/4 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6 mb-4 md:mb-0">
        <Image
          src={bankLogo}
          alt={`${bankName} Logo`}
          width={120}
          height={40}
          objectFit="contain"
          className="mb-4"
        />
        <div className="flex justify-around w-full mt-2">
          <div className="flex flex-col items-center text-center">
            <p className="text-xs text-gray-500 mb-1">Rating :</p>
            <div className="flex items-center space-x-1 mb-1">
              {renderStars(rating)}
            </div>
            <p className="text-xs text-gray-500">{reviewsCount} Reviews</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-xs text-gray-500 mb-1">User :</p>
            <p className="text-lg font-bold text-gray-800 leading-tight">
              {usersYearly}
            </p>
            <p className="text-xs text-gray-500">Users yearly</p>
          </div>
        </div>
      </div>

      <div className="flex-grow w-full md:w-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {bankName} <span className="text-[#17A9E2]">{productName}</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-chart-line w-4 text-center text-gray-500"></i>
            <span>Fix Rate (Year): {details.fixRate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-building-columns w-4 text-center text-gray-500"></i>
            <span>Jaminan: {details.jaminan}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-clock w-4 text-center text-gray-500"></i>
            <span>Max Tenor: {details.maxTenor}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-user-tag w-4 text-center text-gray-500"></i>
            <span>Target: {details.target}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-hand-holding-dollar w-4 text-center text-gray-500"></i>
            <span>Loan to Value: {details.loanToValue}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-percent w-4 text-center text-gray-500"></i>
            <span>Komisi: {details.komisi}</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 w-full md:w-auto md:ml-auto md:self-center mt-4 md:mt-0">
        <Link
          href={`/product/bankproduct/${id}`}
          className="
            block text-center px-5 py-2 text-sm 
            bg-gray-100 text-[#17A9E2] font-semibold 
            rounded-lg border border-gray-300 
            hover:bg-gray-200 transition-colors 
            w-full md:w-auto
          "
        >
          Detail
        </Link>
      </div>
    </div>
  );
};

export default BankProductCard;
