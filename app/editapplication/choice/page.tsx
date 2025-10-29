"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProgressIndicator from "@/components/ProgressIndicator";
import ChoiceBankCard, {
  ChoiceBankCardProps,
} from "@/components/ChoiceBankCard";

const applicationSteps = [
  { name: "Pinjaman", href: "#" },
  { name: "Pekerjaan", href: "#" },
  { name: "Alamat", href: "/editapplication/address" },
  { name: "Informasi Asset", href: "#" },
  { name: "Informasi Tambahan", href: "#" },
  { name: "Upload Dokumen", href: "/editapplication/uploading" },
  { name: "Review", href: "#" },
  { name: "Pilihan Produk & Bank", href: "/editapplication/choice" },
  { name: "Bank Officer", href: "#" },
  { name: "Surat Keterangan", href: "#" },
  { name: "PDF CPA", href: "#" },
  { name: "Summary", href: "#" },
];

const EditApplicationChoicePage: React.FC = () => {
  const currentStepIndex = 7;

  const [searchTerm, setSearchTerm] = useState("");
  const [sendToPool, setSendToPool] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const dummyBankProducts = [
    {
      id: "mandiri-imlek",
      bankLogo: "/assets/mandiri.png",
      rating: 4,
      reviewsCount: 1456,
      productName: "Bunga Special Tengah Imlek 2023",
      description:
        "Mandiri KPR adalah kredit pemilikan rumah (KPR) bank mandiri yang diberikan secara perseorangan untuk membeli rumah tinggal/apartemen/ruko/rukan, baik melalui developer atau tidak.",
    },
    {
      id: "panin-kpr",
      bankLogo: "/assets/panin.png",
      rating: 3,
      reviewsCount: 1456,
      productName: "Panin KPR & KPR XTRA",
      description:
        "KPR Panin adalah fasilitas kredit yang dipergunakan untuk pembelian rumah, ruko, rukan, kantor, apartemen, kavling dari perorangan, developer hingga agan properti dengan mudah dan aman. Jkk Waktu tenor 5 tahun",
    },
    {
      id: "mnc-kpr",
      bankLogo: "/assets/mnc.png",
      rating: 3,
      reviewsCount: 1456,
      productName: "MNC KPR Secondary",
      description: undefined,
    },
    {
      id: "uob-kpr-primary",
      bankLogo: "/assets/uob.png",
      rating: 4,
      reviewsCount: 1456,
      productName: "KPR Primary",
      description: undefined,
    },
    {
      id: "uob-kpr-secondary",
      bankLogo: "/assets/uob.png",
      rating: 4,
      reviewsCount: 1456,
      productName: "KPR Secondary",
      description: undefined,
    },
    {
      id: "ocbc-kpr",
      bankLogo: "/assets/ocbc.png",
      rating: 3,
      reviewsCount: 1456,
      productName: "KPR Kendali",
      description: undefined,
    },
    {
      id: "cimb-kpr-primary",
      bankLogo: "/assets/cimb.png",
      rating: 4,
      reviewsCount: 1456,
      productName: "KPR Primary",
      description: undefined,
    },
    {
      id: "cimb-kpr-secondary",
      bankLogo: "/assets/cimb.png",
      rating: 4,
      reviewsCount: 1456,
      productName: "KPR Secondary",
      description: undefined,
    },
  ];

  const filteredProducts = dummyBankProducts.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.bankLogo
        .split("/")
        .pop()
        ?.split(".")[0]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (productId: string) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handleUpdate = () => {
    console.log("Selected Products:", selectedProducts);
    console.log("Send to Pool:", sendToPool);
    alert("Pilihan produk bank disimpan!");
  };

  const prevStepHref =
    currentStepIndex > 0 ? applicationSteps[currentStepIndex - 1].href : "#";
  const nextStepHref =
    currentStepIndex < applicationSteps.length - 1
      ? applicationSteps[currentStepIndex + 1].href
      : "#";

  return (
    <div className="-mt-6 -mx-6">
      <div className="px-6 py-4 bg-white border-b border-gray-200 overflow-x-auto">
        <div className="min-w-[800px]">
          <ProgressIndicator
            steps={applicationSteps}
            currentStepIndex={currentStepIndex}
          />
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Link href={prevStepHref} legacyBehavior>
            <a
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#17A9E2] text-white hover:bg-[#0e5977] transition-colors ${
                prevStepHref === "#" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </a>
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Pilihan Produk & Bank
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Silahkan pilih produk bank yang sesuai
            </p>
          </div>
          <Link href={nextStepHref} legacyBehavior>
            <a
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#17A9E2] text-white hover:bg-[#0e5977] transition-colors ${
                nextStepHref === "#" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative flex-grow w-full md:w-auto">
              <input
                type="text"
                placeholder="Cari Nama Bank"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full pl-4 pr-10 py-3
                  border border-gray-300
                  rounded-lg
                  bg-white
                  placeholder-gray-400 text-black
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
              className="flex items-center space-x-2
                px-4 py-3
                border border-gray-300 rounded-lg
                bg-white
                text-gray-700
                hover:border-gray-400
                transition-colors
                md:w-auto w-full justify-center
              "
            >
              <i className="fa-solid fa-sort text-gray-500"></i>
              <span className="font-medium">Sort</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <input
              type="checkbox"
              id="sendToPool"
              checked={sendToPool}
              onChange={(e) => setSendToPool(e.target.checked)}
              className="h-5 w-5 text-[#17A9E2] border-gray-300 rounded focus:ring-[#17A9E2] focus:ring-offset-0"
            />
            <label htmlFor="sendToPool" className="text-sm text-black">
              Send to Pool (Pilih opsi ini jika Anda ingin mengirim leads ke
              semua bank rekanan Loan Market)
            </label>
            <i
              className="fa-solid fa-circle-question text-gray-400 cursor-help"
              title="Informasi tambahan tentang Send to Pool"
            ></i>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ChoiceBankCard
                key={product.id}
                id={product.id}
                bankLogo={product.bankLogo}
                rating={product.rating}
                reviewsCount={product.reviewsCount}
                productName={product.productName}
                description={product.description}
                isSelected={selectedProducts.includes(product.id)}
                onSelect={() => handleProductSelect(product.id)}
              />
            ))}
            {filteredProducts.length === 0 && (
              <p className="sm:col-span-2 lg:col-span-4 text-center text-gray-500 py-4">
                Tidak ada produk bank yang cocok dengan pencarian "{searchTerm}
                ".
              </p>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={handleUpdate}
              className="flex items-center space-x-2 bg-[#005274] text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-cyan-800 transition-colors"
            >
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <span>UPDATE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditApplicationChoicePage;
