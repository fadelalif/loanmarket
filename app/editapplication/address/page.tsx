"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProgressIndicator from "@/components/ProgressIndicator";
import AddressFormSection, {
  AddressData,
} from "@/components/AddressFormSection";

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

const EditApplicationAddressPage: React.FC = () => {
  const currentStepIndex = 2;

  const [ktpData, setKtpData] = useState<Partial<AddressData>>({});
  const [domisiliData, setDomisiliData] = useState<Partial<AddressData>>({});
  const [tempatKerjaData, setTempatKerjaData] = useState<Partial<AddressData>>(
    {}
  );

  const [domisiliSesuaiKtp, setDomisiliSesuaiKtp] = useState(false);
  const [tempatKerjaSesuaiKtp, setTempatKerjaSesuaiKtp] = useState(false);

  useEffect(() => {
    if (domisiliSesuaiKtp) {
      setDomisiliData(ktpData);
    }
  }, [domisiliSesuaiKtp, ktpData]);

  useEffect(() => {
    if (tempatKerjaSesuaiKtp) {
      const {
        alamatLengkap,
        kodePos,
        provinsi,
        kabupatenKota,
        kecamatan,
        kelurahan,
      } = ktpData;
      setTempatKerjaData({
        alamatLengkap,
        kodePos,
        provinsi,
        kabupatenKota,
        kecamatan,
        kelurahan,
      });
    }
  }, [tempatKerjaSesuaiKtp, ktpData]);

  const handleKtpChange = (field: keyof AddressData, value: string) => {
    setKtpData((prev: Partial<AddressData>) => ({ ...prev, [field]: value }));
    if (domisiliSesuaiKtp) {
      setDomisiliData((prev: Partial<AddressData>) => ({
        ...prev,
        [field]: value,
      }));
    }
    if (tempatKerjaSesuaiKtp) {
      if (
        [
          "alamatLengkap",
          "kodePos",
          "provinsi",
          "kabupatenKota",
          "kecamatan",
          "kelurahan",
        ].includes(String(field))
      ) {
        setTempatKerjaData((prev: Partial<AddressData>) => ({
          ...prev,
          [field]: value,
        }));
      }
    }
  };

  const handleDomisiliChange = (field: keyof AddressData, value: string) => {
    if (domisiliSesuaiKtp) setDomisiliSesuaiKtp(false);
    setDomisiliData((prev: Partial<AddressData>) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTempatKerjaChange = (field: keyof AddressData, value: string) => {
    if (tempatKerjaSesuaiKtp) setTempatKerjaSesuaiKtp(false);
    setTempatKerjaData((prev: Partial<AddressData>) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDomisiliCheckbox = (isChecked: boolean) => {
    setDomisiliSesuaiKtp(isChecked);
    if (isChecked) {
      setDomisiliData(ktpData);
    }
  };

  const handleTempatKerjaCheckbox = (isChecked: boolean) => {
    setTempatKerjaSesuaiKtp(isChecked);
    if (isChecked) {
      const {
        alamatLengkap,
        kodePos,
        provinsi,
        kabupatenKota,
        kecamatan,
        kelurahan,
      } = ktpData;
      setTempatKerjaData({
        alamatLengkap,
        kodePos,
        provinsi,
        kabupatenKota,
        kecamatan,
        kelurahan,
      });
    }
  };

  const clearDomisili = () => {
    setDomisiliData({});
    setDomisiliSesuaiKtp(false);
  };

  const clearTempatKerja = () => {
    setTempatKerjaData({});
    setTempatKerjaSesuaiKtp(false);
  };

  const handleUpdate = () => {
    const allData = {
      ktp: ktpData,
      domisili: domisiliData,
      tempatKerja: tempatKerjaData,
    };
    console.log("Updating data:", allData);
    alert("Data Alamat Disimpan!");
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
          <h1 className="text-xl font-bold text-gray-800">Alamat</h1>
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
          <form onSubmit={(e) => e.preventDefault()}>
            <AddressFormSection
              title="Data KTP"
              formData={ktpData}
              onChange={handleKtpChange}
            />
            <AddressFormSection
              title="Data Domisili"
              formData={domisiliData}
              onChange={handleDomisiliChange}
              checkboxLabel="Domisili Sesuai KTP"
              checkboxChecked={domisiliSesuaiKtp}
              onCheckboxChange={handleDomisiliCheckbox}
              onClear={clearDomisili}
            />
            <AddressFormSection
              title="Data Alamat Tempat Bekerja"
              formData={tempatKerjaData}
              onChange={handleTempatKerjaChange}
              checkboxLabel="Alamat tempat Bekerja / perusahaan Sesuai KTP"
              checkboxChecked={tempatKerjaSesuaiKtp}
              onCheckboxChange={handleTempatKerjaCheckbox}
              onClear={clearTempatKerja}
            />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditApplicationAddressPage;
