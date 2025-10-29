"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getProductById,
  ProductData,
} from "@/data/products";

interface EditFormData extends Omit<ProductData, "jaminan" | "targetMarket"> {
  jaminan?: string[];
  targetMarket?: string[];
  jenisProduct?: string;
  isPromotional?: boolean;
  promoStartDate?: string;
  promoEndDate?: string;
  targetMarketPengusaha?: string[];
  targetMarketKaryawan?: string[];
}

const dummyProductData: Partial<EditFormData> = {
  bank: "mandiri",
  namaProduct: "Nama Produk Baru",
  jenisProduct: "kpr-primary",
  isPromotional: false,
  promoStartDate: "",
  promoEndDate: "",
  jaminan: ["Rumah"],
  targetMarket: ["Karyawan"],
  komisi: "0%",
  appraisal: "0%",
  floating: "0%",
  loanToValue: "0%",
  penaltyFee: "0%",
  interestRate: "0%",
  fixRatePercent: "0%",
  fixRateYear: "0",
  maxTenor: "0",
  keterangan: "",
  url: "https://",
};

const dummyBanks = [
  { id: "mandiri", name: "Mandiri" },
  { id: "panin", name: "Panin" },
  { id: "mnc", name: "MNC" },
  { id: "commonwealth", name: "Commonwealth" },
];
const dummyProductTypes = [
  {
    id: "kpr-secondary",
    name: "Kredit Pemilikan Rumah Secondary (KPR Secondary)",
  },
  { id: "kpr-primary", name: "Kredit Pemilikan Rumah Primary (KPR Primary)" },
  { id: "refinancing", name: "Refinancing" },
];
const dummyJaminanOptions = [
  "Ruko",
  "Rumah",
  "Rukan",
  "Apartemen",
  "Kendaraan Pribadi",
  "Sertifikat Perusahaan",
  "Slip gaji",
];
const allTargetMarketOptions = [
  "Pengusaha",
  "Profesional",
  "ASN",
  "TNI",
  "Karyawan",
  "Milenial",
  "POLRI",
  "Lainnya",
];

const NumericInputWithControls: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  unit?: string;
  name: keyof ProductData;
}> = ({ label, value, onChange, onIncrement, onDecrement, unit, name }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-black">{label}</label>
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={onDecrement}
        className="px-3 py-2 bg-[#17A9E2] text-white rounded-lg hover:bg-[#0e5977] transition-colors"
      >
        <i className="fa-solid fa-minus"></i>
      </button>
      <input
        type="text"
        name={String(name)}
        value={value}
        onChange={onChange}
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
      />
      {unit && <span className="text-gray-600">{unit}</span>}
      <button
        type="button"
        onClick={onIncrement}
        className="px-3 py-2 bg-[#17A9E2] text-white rounded-lg hover:bg-[#0e5977] transition-colors"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
);

const CheckboxGroup: React.FC<{
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (option: string, isChecked: boolean) => void;
  columns?: number;
}> = ({ label, options, selectedOptions, onChange, columns = 2 }) => (
  <div className="flex flex-col space-y-2">
    {label && <label className="text-sm font-medium text-black">{label}</label>}
    <div className={`grid grid-cols-2 sm:grid-cols-${columns} gap-2`}>
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <input
            type="checkbox"
            id={`${label.replace(/\s+/g, "-")}-${option.replace(/\s+/g, "-")}`}
            checked={selectedOptions.includes(option)}
            onChange={(e) => onChange(option, e.target.checked)}
            className="h-4 w-4 text-[#17A9E2] border-gray-300 rounded focus:ring-[#17A9E2] focus:ring-offset-0"
          />
          <label
            htmlFor={`${label.replace(/\s+/g, "-")}-${option.replace(
              /\s+/g,
              "-"
            )}`}
            className="ml-2 text-sm text-black"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const EditBankProductPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string);

  const [formData, setFormData] = useState<Partial<EditFormData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const product = getProductById(productId);
    let loadedData: Partial<EditFormData>;

    if (product) {
      loadedData = { ...product } as unknown as Partial<EditFormData>;
      if (typeof loadedData.jaminan === "string") {
        loadedData.jaminan = [loadedData.jaminan];
      } else if (!loadedData.jaminan) {
        loadedData.jaminan = [];
      }

      if (typeof loadedData.targetMarket === "string") {
        loadedData.targetMarket = [loadedData.targetMarket];
      } else if (!loadedData.targetMarket) {
        loadedData.targetMarket = [];
      }

      if ("targetMarketPengusaha" in loadedData) {
        delete (loadedData as any).targetMarketPengusaha;
      }
      if ("targetMarketKaryawan" in loadedData) {
        delete (loadedData as any).targetMarketKaryawan;
      }

      setFormData(loadedData);
    } else {
      setFormData({ ...dummyProductData, id: productId });
    }
    setLoading(false);
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && name === "isPromotional") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxGroupChange = (
    groupName: keyof EditFormData,
    option: string,
    isChecked: boolean
  ) => {
    setFormData((prev) => {
      const currentOptions = (prev[groupName] as string[] | undefined) || [];
      let newOptions: string[];
      if (isChecked) {
        newOptions = [...currentOptions, option];
      } else {
        newOptions = currentOptions.filter((item) => item !== option);
      }
      return { ...prev, [groupName]: newOptions };
    });
  };

  const handleNumericChange = (fieldName: keyof ProductData, delta: number) => {
    setFormData((prev) => {
      const currentStringValue = String(prev[fieldName] ?? "0");
      const currentValue =
        parseFloat(currentStringValue.replace(/[^0-9.-]+/g, "")) || 0;
      let newValue = currentValue + delta;

      if (["fixRateYear", "maxTenor"].includes(String(fieldName))) {
        newValue = Math.max(0, newValue);
      }

      let formattedValue: string;
      const isPercentageField = [
        "komisi",
        "appraisal",
        "floating",
        "loanToValue",
        "penaltyFee",
        "interestRate",
        "fixRatePercent",
      ].includes(String(fieldName));

      if (isPercentageField) {
        formattedValue = newValue.toFixed(2) + "%";
      } else if (["fixRateYear", "maxTenor"].includes(String(fieldName))) {
        formattedValue = String(Math.round(newValue));
      } else {
        formattedValue = String(newValue);
      }
      return { ...prev, [fieldName]: formattedValue };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    alert("Data berhasil diupdate (simulasi)!");
  };

  if (loading) {
    return <div className="p-6 text-center">Memuat data produk...</div>;
  }

  return (
    <div className="-mt-6 -mx-6">
      <section className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
        <Link href={`/product/bankproduct/${productId}`} legacyBehavior>
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
              Edit Product
            </span>
          </a>
        </Link>
      </section>

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6"
          >
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="bank"
                  className="text-sm font-medium text-black"
                >
                  Bank
                </label>
                <select
                  id="bank"
                  name="bank"
                  value={formData.bank || ""}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
                >
                  {dummyBanks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="jenisProduct"
                  className="text-sm font-medium text-black"
                >
                  Jenis Product
                </label>
                <select
                  id="jenisProduct"
                  name="jenisProduct"
                  value={formData.jenisProduct || ""}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
                >
                  {dummyProductTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPromotional"
                  name="isPromotional"
                  checked={formData.isPromotional || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#17A9E2] border-gray-300 rounded focus:ring-[#17A9E2]"
                />
                <label htmlFor="isPromotional" className="text-sm text-black">
                  Promotional Product
                </label>
              </div>
              {formData.isPromotional && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="promoStartDate"
                      className="text-sm font-medium text-black"
                    >
                      Mulai
                    </label>
                    <input
                      type="date"
                      id="promoStartDate"
                      name="promoStartDate"
                      value={formData.promoStartDate || ""}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="promoEndDate"
                      className="text-sm font-medium text-black"
                    >
                      Berakhir
                    </label>
                    <input
                      type="date"
                      id="promoEndDate"
                      name="promoEndDate"
                      value={formData.promoEndDate || ""}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
                    />
                  </div>
                </div>
              )}

              <CheckboxGroup
                label="Jaminan"
                options={dummyJaminanOptions}
                selectedOptions={(formData.jaminan as string[]) || []}
                onChange={(option, isChecked) =>
                  handleCheckboxGroupChange("jaminan", option, isChecked)
                }
              />

              <CheckboxGroup
                label="Target Market"
                options={allTargetMarketOptions}
                selectedOptions={(formData.targetMarket as string[]) || []}
                onChange={(option, isChecked) =>
                  handleCheckboxGroupChange("targetMarket", option, isChecked)
                }
                columns={2}
              />

              <NumericInputWithControls
                label="Komisi"
                name="komisi"
                value={String(formData.komisi || "0%")}
                unit="%"
                onChange={handleChange}
                onIncrement={() => handleNumericChange("komisi", 1)}
                onDecrement={() => handleNumericChange("komisi", -1)}
              />

              <NumericInputWithControls
                label="Appraisal"
                name="appraisal"
                value={String(formData.appraisal || "0%")}
                unit="%"
                onChange={handleChange}
                onIncrement={() => handleNumericChange("appraisal", 1)}
                onDecrement={() => handleNumericChange("appraisal", -1)}
              />

              <NumericInputWithControls
                label="Floating"
                name="floating"
                value={String(formData.floating || "0%")}
                unit="%"
                onChange={handleChange}
                onIncrement={() => handleNumericChange("floating", 1)}
                onDecrement={() => handleNumericChange("floating", -1)}
              />
            </div>

            <div className="space-y-6">
              <NumericInputWithControls
                label="Loan to Value"
                name="loanToValue"
                value={String(formData.loanToValue || "0%")}
                unit="%"
                onChange={handleChange}
                onIncrement={() => handleNumericChange("loanToValue", 1)}
                onDecrement={() => handleNumericChange("loanToValue", -1)}
              />

              <NumericInputWithControls
                label="Penalty Fee"
                name="penaltyFee"
                value={String(formData.penaltyFee || "0%")}
                unit="%"
                onChange={handleChange}
                onIncrement={() => handleNumericChange("penaltyFee", 1)}
                onDecrement={() => handleNumericChange("penaltyFee", -1)}
              />

              <NumericInputWithControls
                label="Interest Rate"
                name="interestRate"
                value={String(formData.interestRate || "0%")}
                unit="%"
                onChange={handleChange}
                onIncrement={() => handleNumericChange("interestRate", 0.01)}
                onDecrement={() => handleNumericChange("interestRate", -0.01)}
              />

              <NumericInputWithControls
                label="Fix Rate"
                name="fixRatePercent"
                value={String(formData.fixRatePercent || "0%")}
                unit="%"
                onChange={handleChange}
                onIncrement={() => handleNumericChange("fixRatePercent", 0.01)}
                onDecrement={() => handleNumericChange("fixRatePercent", -0.01)}
              />

              <NumericInputWithControls
                label="Fix Rate (Year)"
                name="fixRateYear"
                value={String(formData.fixRateYear || "0")}
                onChange={handleChange}
                onIncrement={() => handleNumericChange("fixRateYear", 1)}
                onDecrement={() => handleNumericChange("fixRateYear", -1)}
              />

              <NumericInputWithControls
                label="Max Tenor (Year)"
                name="maxTenor"
                value={String(formData.maxTenor || "0")}
                onChange={handleChange}
                onIncrement={() => handleNumericChange("maxTenor", 1)}
                onDecrement={() => handleNumericChange("maxTenor", -1)}
              />

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="keterangan"
                  className="text-sm font-medium text-black"
                >
                  Keterangan
                </label>
                <textarea
                  id="keterangan"
                  name="keterangan"
                  value={formData.keterangan || ""}
                  onChange={handleChange}
                  rows={5}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
                ></textarea>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="url" className="text-sm font-medium text-black">
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url || ""}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
                />
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-end mt-8">
              <button
                type="submit"
                className="
                  flex items-center space-x-2
                  bg-[#17A9E2] text-white
                  px-6 py-3 rounded-lg
                  text-base font-medium
                  hover:bg-[#0e5977] transition-colors
                "
              >
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>UPDATE</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBankProductPage;