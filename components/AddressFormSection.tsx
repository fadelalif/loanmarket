import React from "react";
export interface AddressData {
  alamatLengkap: string;
  kodePos: string;
  provinsi: string;
  kabupatenKota: string;
  kecamatan: string;
  kelurahan: string;
}

interface AddressFormSectionProps {
  title: string;
  formData: Partial<AddressData>;
  onChange: (field: keyof AddressData, value: string) => void;
  checkboxLabel?: string;
  checkboxChecked?: boolean;
  onCheckboxChange?: (isChecked: boolean) => void;
  onClear?: () => void;
}

const AddressFormSection: React.FC<AddressFormSectionProps> = ({
  title,
  formData,
  onChange,
  checkboxLabel,
  checkboxChecked,
  onCheckboxChange,
  onClear,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(name as keyof AddressData, value);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange?.(e.target.checked);
  };

  return (
    <div className="mb-6">
      <div className="bg-[#005274] text-white p-3 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor={`${title}-alamatLengkap`}
              className="text-sm font-medium text-black"
            >
              Alamat Lengkap (Jalan, Komplek, RT/RW)
            </label>
            <input
              type="text"
              id={`${title}-alamatLengkap`}
              name="alamatLengkap"
              value={formData.alamatLengkap || ""}
              onChange={handleChange}
              placeholder="--Isi Alamat Lengkap--"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor={`${title}-kodePos`}
              className="text-sm font-medium text-black"
            >
              Kode POS
            </label>
            <input
              type="text"
              id={`${title}-kodePos`}
              name="kodePos"
              value={formData.kodePos || ""}
              onChange={handleChange}
              placeholder="--Isi Kode POS--"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor={`${title}-provinsi`}
              className="text-sm font-medium text-black"
            >
              Provinsi
            </label>
            <select
              id={`${title}-provinsi`}
              name="provinsi"
              value={formData.provinsi || ""}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black" 
            >
              <option value="">--Pilih Provinsi--</option>
              <option value="dki_jakarta">DKI Jakarta</option>
              <option value="jawa_barat">Jawa Barat</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor={`${title}-kabupatenKota`}
              className="text-sm font-medium text-black"
            >
              Kabupaten / Kota
            </label>
            <select
              id={`${title}-kabupatenKota`}
              name="kabupatenKota"
              value={formData.kabupatenKota || ""}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black"
            >
              <option value="">--Pilih Kota--</option>
              <option value="jakarta_timur">Jakarta Timur</option>
              <option value="bekasi">Bekasi</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor={`${title}-kecamatan`}
              className="text-sm font-medium text-black"
            >
              Kecamatan
            </label>
            <select
              id={`${title}-kecamatan`}
              name="kecamatan"
              value={formData.kecamatan || ""}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black" // [PERUBAHAN] text-black ditambahkan
            >
              <option value="">--Pilih Kecamatan--</option>
              <option value="cakung">Cakung</option>
              <option value="duren_sawit">Duren Sawit</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor={`${title}-kelurahan`}
              className="text-sm font-medium text-black"
            >
              Kelurahan
            </label>
            <select
              id={`${title}-kelurahan`}
              name="kelurahan"
              value={formData.kelurahan || ""}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#17A9E2] text-black" // [PERUBAHAN] text-black ditambahkan
            >
              <option value="">--Pilih Kelurahan--</option>
              <option value="pulogebang">Pulogebang</option>
              <option value="klender">Klender</option>
            </select>
          </div>
        </div>

        {(checkboxLabel || onClear) && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            {checkboxLabel && onCheckboxChange && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`${title}-checkbox`}
                  checked={checkboxChecked}
                  onChange={handleCheckbox}
                  className="h-4 w-4 text-[#17A9E2] border-gray-300 rounded focus:ring-[#17A9E2]"
                />
                <label
                  htmlFor={`${title}-checkbox`}
                  className="ml-2 text-sm text-black"
                >
                  {checkboxLabel}
                </label>
              </div>
            )}
            {!checkboxLabel && <div />}{" "}
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
              >
                CLEAR
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressFormSection;
