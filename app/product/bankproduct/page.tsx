"use client";
import React, { useState } from "react";
import BankProductCard from "@/components/BankProductCard";

interface ProductCardProps {
  icon: string;
  name: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ icon, name }) => (
  <div
    className="
    flex flex-col items-center justify-center 
    p-4 h-32
    bg-gray-50
    border border-gray-200
    rounded-lg 
    hover:border-gray-300 hover:bg-white
    transition-colors cursor-pointer 
    text-gray-500
  "
  >
    <i className={`${icon} text-3xl mb-3`}></i>
    <span className="text-sm text-center font-medium">{name}</span>
  </div>
);

const BankProductPage = () => {
  const [activeTab, setActiveTab] = useState("bank");

  return (
    <div className="-mt-6 -mx-6">
      <div className="flex justify-center space-x-4 border-b border-gray-200 bg-white py-4">
        <button
          className={`
            py-3 px-6 
            text-base font-bold transition-colors
            ${
              activeTab === "bank"
                ? "border-b-2 border-[#17A9E2] text-[#17A9E2] font-bold"
                : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent"
            }
          `}
          onClick={() => setActiveTab("bank")}
        >
          Bank
        </button>
        <button
          className={`
            py-3 px-6 
            text-base font-bold transition-colors
            ${
              activeTab === "developer"
                ? "border-b-2 border-[#17A9E2] text-[#17A9E2] font-bold"
                : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent"
            }
          `}
          onClick={() => setActiveTab("developer")}
        >
          Developer
        </button>
      </div>
      <div className="p-6">
        {activeTab === "bank" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ProductCard icon="fa-solid fa-house" name="KPR dan Multiguna" />
              <ProductCard icon="fa-solid fa-user-tie" name="Refinancing" />
              <ProductCard
                icon="fa-solid fa-credit-card"
                name="Kredit Modal Usaha dan Investasi"
              />
              <ProductCard icon="fa-solid fa-piggy-bank" name="Deposito" />
              <ProductCard
                icon="fa-solid fa-building"
                name="Take Over dan Bridging Loan"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-grow w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama"
                  className="
                    w-full pl-4 pr-10 py-3
                    border border-gray-200
                    rounded-lg
                    bg-white
                    placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-[#17A9E2]
                  "
                />
                <i
                  className="
                  fa-solid fa-magnifying-glass
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-[#17A9E2]
                "
                ></i>
              </div>
              <button
                className="
                  flex items-center justify-between
                  px-4 py-3 border border-gray-200 rounded-lg
                  bg-white
                  text-gray-700
                  hover:border-gray-300
                  transition-colors
                  md:w-auto w-full
                "
              >
                <span className="font-medium">Kredit Pemilikan...</span>
                <i className="fa-solid fa-chevron-down ml-4 text-gray-400 text-xs"></i>
              </button>
              <button
                className="
                  flex items-center space-x-2
                  px-4 py-3
                  border border-gray-200 rounded-lg
                  bg-white
                  text-gray-700
                  hover:border-gray-300
                  transition-colors
                  md:w-auto w-full justify-center
                "
              >
                <i className="fa-solid fa-sort text-gray-500"></i>
                <span className="font-medium">Sort</span>
              </button>
              <button
                className="
                  flex items-center space-x-2
                  px-4 py-3
                  bg-[#17A9E2] text-white rounded-lg
                  hover:bg-[#0e5977]
                  transition-colors
                  md:ml-auto md:w-auto w-full justify-center
                "
              >
                <i className="fa-solid fa-plus"></i>
                <span className="font-medium">Tambah Product</span>
              </button>
            </div>
            <div className="mt-6">
              <BankProductCard
                id="mandiri1"
                bankLogo="/assets/mandiri.png"
                bankName="Mandiri"
                productName="Bunga Special Tengah Imlek 2023"
                rating={4}
                reviewsCount={14}
                usersYearly={220}
                details={{
                  fixRate: "3.88",
                  maxTenor: "12",
                  loanToValue: "1",
                  jaminan: "Ruko, Rumah, Apartemen",
                  target: "Karyawan, Pengusaha",
                  komisi: "1",
                }}
              />
              <BankProductCard
                id="panin1"
                bankLogo="/assets/panin.png"
                bankName="Panin"
                productName="Panin KPR & KPR XTRA"
                rating={3}
                reviewsCount={9}
                usersYearly={220}
                details={{
                  fixRate: "9.90",
                  maxTenor: "10",
                  loanToValue: "85%",
                  jaminan: "Ruko, Rumah, Apartemen",
                  target: "Karyawan",
                  komisi: "1",
                }}
              />
              <BankProductCard
                id="mnc1"
                bankLogo="/assets/mnc.png"
                bankName="MNC"
                productName="MNC KPR Secondary"
                rating={3}
                reviewsCount={10}
                usersYearly={220}
                details={{
                  fixRate: "12.00",
                  maxTenor: "1",
                  loanToValue: "50-60%",
                  jaminan: "Rumah, Apartemen",
                  target: "Karyawan",
                  komisi: "1",
                }}
              />
              <BankProductCard
                id="cw1"
                bankLogo="/assets/commonwealth.png"
                bankName="Commonwealth"
                productName="KPR Primary"
                rating={3}
                reviewsCount={14}
                usersYearly={220}
                details={{
                  fixRate: "-",
                  maxTenor: "-",
                  loanToValue: "-",
                  jaminan: "Rumah, Apartemen, Ruko",
                  target: "Karyawan, Pengusaha & Profesional",
                  komisi: "2.4",
                }}
              />
              <BankProductCard
                id="cw2"
                bankLogo="/assets/commonwealth.png"
                bankName="Commonwealth"
                productName="KPR Secondary"
                rating={4}
                reviewsCount={9}
                usersYearly={220}
                details={{
                  fixRate: "-",
                  maxTenor: "-",
                  loanToValue: "-",
                  jaminan: "Ruko, Rumah, Apartemen",
                  target: "Karyawan",
                  komisi: "1",
                }}
              />
            </div>
          </div>
        )}

        {activeTab === "developer" && (
          <div className="p-4 text-gray-600">NULL</div>
        )}
      </div>
    </div>
  );
};

export default BankProductPage;
