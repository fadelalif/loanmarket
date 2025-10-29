"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import ProgressIndicator from "@/components/ProgressIndicator";

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

interface FileUploadFieldProps {
  label: string;
  placeholder?: string;
  fileName: string | null;
  onFileChange: (file: File | null) => void;
  name: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  placeholder = "--Upload File--",
  fileName,
  onFileChange,
  name,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <label
        htmlFor={`file-display-${name}`}
        className="text-sm font-medium text-black md:col-span-1"
      >
        {label}
      </label>

      <div
        className="relative md:col-span-2 cursor-pointer"
        onClick={handleContainerClick}
      >
        <input
          type="text"
          id={`file-display-${name}`} 
          value={fileName || ""}
          readOnly
          placeholder={placeholder}
          className="
            w-full pl-4 pr-10 py-2 {/* Tambah padding kanan untuk ikon */}
            border border-gray-300
            rounded-lg
            bg-gray-50 {/* Latar belakang abu-abu */}
            text-black {/* Teks hitam */}
            placeholder-gray-400 {/* Placeholder abu-abu */}
            focus:outline-none focus:ring-2 focus:ring-[#17A9E2]
            cursor-pointer {/* Pointer saat hover */}
          "
        />
        <i
          className="
            fa-solid fa-upload
            absolute right-4 top-1/2 -translate-y-1/2
            text-gray-400 {/* Warna ikon abu-abu */}
            peer-focus:text-[#17A9E2] {/* Optional: Ganti warna ikon saat input fokus */}
          "
          aria-hidden="true"
        ></i>
      </div>

      <input
        type="file"
        id={`file-input-${name}`}
        ref={fileInputRef}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

const EditApplicationUploadPage: React.FC = () => {
  const currentStepIndex = 5;

  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: string | null;
  }>({});

  const handleFileUpload = (key: string, file: File | null) => {
    if (file) {
      console.log(`Uploading ${key}:`, file.name);
      setUploadedFiles((prev) => ({ ...prev, [key]: file.name }));
    } else {
      setUploadedFiles((prev) => ({ ...prev, [key]: null }));
    }
  };

  const handleUpdate = () => {
    console.log("Updating uploaded documents:", uploadedFiles);
    alert("Dokumen berhasil diupdate (simulasi)!");
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
            <h1 className="text-xl font-bold text-gray-800">Upload Dokumen</h1>
            <p className="text-sm text-gray-600 mt-1">
              Silahkan upload dokumen yang dibutuhkan
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
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="mb-6">
              <div className="bg-[#005274] text-white p-3 rounded-t-lg flex items-center space-x-2">
                <i className="fa-solid fa-chevron-down"></i>{" "}
                <h2 className="text-lg font-semibold">Data Pribadi</h2>
              </div>
              <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-gray-200 space-y-4">
                <FileUploadField
                  label="Fotokopi KTP Pemohon"
                  name="ktpPemohon"
                  fileName={uploadedFiles.ktpPemohon}
                  onFileChange={(file) => handleFileUpload("ktpPemohon", file)}
                  placeholder="--Upload Fotokopi KTP Pemohon--"
                />
                <FileUploadField
                  label="Fotokopi KTP Suami / Istri"
                  name="ktpPasangan"
                  fileName={uploadedFiles.ktpPasangan}
                  onFileChange={(file) => handleFileUpload("ktpPasangan", file)}
                  placeholder="--Upload Fotokopi KTP Suami / Istri--"
                />
                <FileUploadField
                  label="Fotokopi Kartu Keluarga"
                  name="kartuKeluarga"
                  fileName={uploadedFiles.kartuKeluarga}
                  onFileChange={(file) =>
                    handleFileUpload("kartuKeluarga", file)
                  }
                  placeholder="--Upload Fotokopi Kartu Keluarga--"
                />
                <FileUploadField
                  label="Fotokopi Akte Nikah/Cerai"
                  name="akteNikahCerai"
                  fileName={uploadedFiles.akteNikahCerai}
                  onFileChange={(file) =>
                    handleFileUpload("akteNikahCerai", file)
                  }
                  placeholder="--Upload Fotokopi Akte Nikah/Cerai--"
                />
                <FileUploadField
                  label="Fotokopi NPWP Pemohon"
                  name="npwpPemohon"
                  fileName={uploadedFiles.npwpPemohon}
                  onFileChange={(file) => handleFileUpload("npwpPemohon", file)}
                  placeholder="--Upload Fotokopi NPWP Pemohon--"
                />
                <FileUploadField
                  label="Akta Pisah Harga Notaril..."
                  name="aktaPisahHarga"
                  fileName={uploadedFiles.aktaPisahHarga}
                  onFileChange={(file) =>
                    handleFileUpload("aktaPisahHarga", file)
                  }
                  placeholder="--Upload Akta Pisah Harga Notaril--"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-[#005274] text-white p-3 rounded-t-lg flex items-center space-x-2">
                <i className="fa-solid fa-chevron-down"></i>
                <h2 className="text-lg font-semibold">Data Jaminan</h2>
              </div>
              <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-gray-200 space-y-4">
                <FileUploadField
                  label="Fotokopi Dokumen Jaminan..."
                  name="dokumenJaminan"
                  fileName={uploadedFiles.dokumenJaminan}
                  onFileChange={(file) =>
                    handleFileUpload("dokumenJaminan", file)
                  }
                  placeholder="--Upload Fotokopi Dokumen Jaminan--"
                />
                <FileUploadField
                  label="Scan Signed PDF Surat Pengajuan Bank..."
                  name="suratPengajuanBank"
                  fileName={uploadedFiles.suratPengajuanBank}
                  onFileChange={(file) =>
                    handleFileUpload("suratPengajuanBank", file)
                  }
                  placeholder="--Upload PDF Surat Pengajuan Bank--"
                />
                <FileUploadField
                  label="Fotokopi Perjanjian Kredit (Jika Over Kredit)"
                  name="perjanjianKredit"
                  fileName={uploadedFiles.perjanjianKredit}
                  onFileChange={(file) =>
                    handleFileUpload("perjanjianKredit", file)
                  }
                  placeholder="--Upload Fotokopi Perjanjian Kredit--"
                />
                <FileUploadField
                  label="Dokumen PRJB (Jika Developer)"
                  name="dokumenPrjb"
                  fileName={uploadedFiles.dokumenPrjb}
                  onFileChange={(file) => handleFileUpload("dokumenPrjb", file)}
                  placeholder="--Upload Dokumen PRJB--"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-[#005274] text-white p-3 rounded-t-lg flex items-center space-x-2">
                <i className="fa-solid fa-chevron-down"></i>
                <h2 className="text-lg font-semibold">Data Keuangan</h2>
              </div>
              <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-gray-200 space-y-4">
                <FileUploadField
                  label="Fotokopi SPT / PPh21"
                  name="sptPph21"
                  fileName={uploadedFiles.sptPph21}
                  onFileChange={(file) => handleFileUpload("sptPph21", file)}
                  placeholder="--Upload Fotokopi SPT / PPh21--"
                />
                <FileUploadField
                  label="Asli Slip Gaji / Surat Keterangan..."
                  name="slipGaji"
                  fileName={uploadedFiles.slipGaji}
                  onFileChange={(file) => handleFileUpload("slipGaji", file)}
                  placeholder="--Upload Asli Slip Gaji--"
                />
                <FileUploadField
                  label="Fotokopi R/K atau tabungan 6 bulan terakhir"
                  name="rekeningKoran"
                  fileName={uploadedFiles.rekeningKoran}
                  onFileChange={(file) =>
                    handleFileUpload("rekeningKoran", file)
                  }
                  placeholder="--Upload Fotokopi R/K 6 Bulan Terakhir--"
                />
                <FileUploadField
                  label="Surat Keterangan / Rekomendasi Perusahaan"
                  name="suratRekomendasiPerusahaan"
                  fileName={uploadedFiles.suratRekomendasiPerusahaan}
                  onFileChange={(file) =>
                    handleFileUpload("suratRekomendasiPerusahaan", file)
                  }
                  placeholder="--Upload Surat Keterangan Perusahaan--"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-[#005274] text-white p-3 rounded-t-lg flex items-center space-x-2">
                <i className="fa-solid fa-chevron-down"></i>
                <h2 className="text-lg font-semibold">Data Tambahan</h2>
              </div>
              <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-gray-200 space-y-4">
                <FileUploadField
                  label="File Kekurangan 1"
                  name="fileKekurangan1"
                  fileName={uploadedFiles.fileKekurangan1}
                  onFileChange={(file) =>
                    handleFileUpload("fileKekurangan1", file)
                  }
                  placeholder="--Upload File Kekurangan 1--"
                />
                <FileUploadField
                  label="File Kekurangan 2"
                  name="fileKekurangan2"
                  fileName={uploadedFiles.fileKekurangan2}
                  onFileChange={(file) =>
                    handleFileUpload("fileKekurangan2", file)
                  }
                  placeholder="--Upload File Kekurangan 2--"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleUpdate}
                className="
                  flex items-center space-x-2
                  bg-[#005274] text-white
                  px-6 py-3 rounded-lg
                  text-base font-medium
                  hover:bg-cyan-800 transition-colors
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

export default EditApplicationUploadPage;
