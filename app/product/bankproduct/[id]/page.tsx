"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById } from "@/data/products";

const DetailRow = ({
  label,
  value,
  isTextArea = false,
}: {
  label: string;
  value: string;
  isTextArea?: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-start">
      <span className="font-semibold text-gray-700 pt-3">{label}</span>
      <div
        className={`
          col-span-2 
          bg-gray-100 
          p-3 
          rounded-lg 
          text-gray-800 
          w-full
          min-h-[48px]
          ${isTextArea ? "h-32" : ""}
        `}
      >
        {value}
      </div>
    </div>
  );
};

const BankProductDetailPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const productData = getProductById(id);
  if (!productData) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Produk Tidak Ditemukan</h1>
        <Link
          href="/product/bankproduct"
          className="text-[#17A9E2] hover:underline mt-4"
        >
          Kembali ke daftar produk
        </Link>
      </div>
    );
  }

  return (
    <div className="-mt-6 -mx-6">
      <section className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
        <Link href="/product/bankproduct" legacyBehavior>
          <a className="flex items-center space-x-3 group cursor-pointer">
            <span
              className="
              flex items-center justify-center 
              w-8 h-8 rounded-full 
              bg-[#17A9E2] 
              text-white 
              group-hover:bg-[#0e5977]
              transition-colors
            "
            >
              <i className="fa-solid fa-arrow-left"></i>
            </span>
            <span className="text-xl font-semibold text-gray-700 group-hover:text-gray-900">
              Bank Product Detail
            </span>
          </a>
        </Link>

        <div className="flex items-center space-x-3">
          <Link
            href={`/product/bankproduct/${id}/edit`}
            className="
              flex items-center space-x-2 
              bg-teal-700 text-white 
              px-4 py-2 rounded-lg 
              text-sm font-medium 
              hover:bg-teal-800 transition-colors
            "
          >
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Edit Product</span>
          </Link>
          <button
            className="
            flex items-center space-x-2 
            bg-red-600 text-white 
            px-4 py-2 rounded-lg 
            text-sm font-medium 
            hover:bg-red-700 transition-colors
          "
          >
            <i className="fa-solid fa-trash"></i>
            <span>Delete Product</span>
          </button>
        </div>
      </section>

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <DetailRow label="Bank" value={productData.bank} />
            <DetailRow label="Nama Product" value={productData.namaProduct} />
            <DetailRow label="Jaminan" value={productData.jaminan} />
            <DetailRow label="Target Market" value={productData.targetMarket} />
            <DetailRow label="Komisi" value={productData.komisi} />
            <DetailRow label="Appraisal" value={productData.appraisal} />
            <DetailRow label="Floating" value={productData.floating} />
            <DetailRow label="Loan to Value" value={productData.loanToValue} />
            <DetailRow label="Penalty Fee" value={productData.penaltyFee} />
            <DetailRow label="Interest Rate" value={productData.interestRate} />
            <DetailRow label="Fix Rate %" value={productData.fixRatePercent} />
            <DetailRow
              label="Fix Rate (year)"
              value={productData.fixRateYear}
            />
            <DetailRow label="Max Tenor (year)" value={productData.maxTenor} />
            <DetailRow
              label="Keterangan"
              value={productData.keterangan}
              isTextArea={true}
            />
            <DetailRow label="URL" value={productData.url} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BankProductDetailPage;
