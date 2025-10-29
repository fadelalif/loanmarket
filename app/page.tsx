import Image from "next/image";
import CircularProgress from "@/components/CircularProgress"; // Asumsi path benar
import BankApprovalChart from "@/components/BankApprovalChart"; // Asumsi path benar

// --- Komponen StatCard (Tetap Sama) ---
const StatCard = ({
  icon,
  title,
  value,
  color,
}: {
  icon: string;
  title: string;
  value: string;
  color: string;
}) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-sm flex items-center space-x-4">
      <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
        <i className={`${icon} fa-2x`}></i>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

// --- Halaman Dashboard Utama (Dengan Perubahan Responsif) ---
export default function DashboardPage() {
  return (
    // Menggunakan p-4 di mobile, p-6 di layar lebih besar
    <div className="space-y-6 p-4 md:p-6">
      {/* 1. User Info Card */}
      {/* [RESPONSIVE] flex-col di mobile, md:flex-row di medium ke atas */}
      <section className="p-4 md:p-6 bg-white rounded-lg shadow-sm flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5">
        <Image
          src="/assets/ava2.jpeg"
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full flex-shrink-0"
        />
        <div className="flex-1 w-full text-center md:text-left">
          {" "}
          {/* w-full & text-center di mobile */}
          {/* [RESPONSIVE] Ukuran teks disesuaikan */}
          <h2 className="text-xl md:text-2xl font-bold text-[#17A9E2] mb-4">
            YOHANNES AFFANDY (JOJO)
          </h2>
          {/* [RESPONSIVE] grid-cols-1 di mobile, md:grid-cols-2 di medium ke atas */}
          {/* Hapus divide-x di mobile, tambahkan di md */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:divide-x md:divide-gray-200">
            {/* Kolom Kiri */}
            {/* [RESPONSIVE] Rata tengah di mobile, rata kiri di md */}
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-[#17A9E2]">
                  <i className="fa-solid fa-building"></i>
                </span>
                <span className="text-sm text-gray-700">
                  Loan Market Office Dev
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-[#17A9E2]">
                  <i className="fa-solid fa-id-badge"></i>
                </span>
                <span className="text-sm text-gray-700">ID: LM9990001</span>
              </div>
            </div>
            {/* Kolom Kanan */}
            {/* [RESPONSIVE] Rata tengah di mobile, rata kiri di md. Hilangkan pl-8 di mobile */}
            <div className="space-y-4 md:pl-8 flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-[#17A9E2]">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <span className="text-sm text-gray-700">
                  it@loanmarket.co.id
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-[#17A9E2]">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <span className="text-sm text-gray-700">6281234567890</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stat Cards */}
      {/* [RESPONSIVE] 1 kolom default, 2 kolom di md, 4 kolom di lg */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          icon="fa-solid fa-address-book text-[#17A9E2]"
          title="CONTACT"
          value="51"
          color="text-blue-500"
        />
        <StatCard
          icon="fa-solid fa-file-invoice-dollar text-[#17A9E2]"
          title="LOAN"
          value="56"
          color="text-green-500"
        />
        <StatCard
          icon="fa-solid fa-box text-[#17A9E2]"
          title="PRODUCT"
          value="80"
          color="text-yellow-500"
        />
        <StatCard
          icon="fa-solid fa-building-columns text-[#17A9E2]"
          title="BANK"
          value="30"
          color="text-purple-500"
        />
      </section>

      {/* 3. Progress & Notification Section */}
      {/* [RESPONSIVE] 1 kolom default, 3 kolom di lg */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start">
        {/* Kolom Kiri (Progress & Bank Approval) */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* 3.1 Progress Bars Card */}
          {/* [RESPONSIVE] 1 kolom default (chart tumpuk), 2 kolom di md */}
          <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-[#17A9E2]">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                PINJAMAN DISETUJUI
              </h3>
              <CircularProgress percentage={40}>
                <span className="font-bold text-3xl md:text-4xl text-gray-800">
                  40%
                </span>{" "}
                {/* Ukuran teks disesuaikan */}
              </CircularProgress>
              <p className="text-sm md:text-base text-gray-500 mt-4 text-center">
                2/5 Pinjaman telah disetujui
              </p>
            </div>
            <div className="flex flex-col items-center justify-around">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                TARGET
              </h3>
              <CircularProgress percentage={280}>
                <span className="font-bold text-3xl md:text-4xl text-gray-800">
                  280%
                </span>{" "}
                {/* Ukuran teks disesuaikan */}
              </CircularProgress>
              <p className="text-sm md:text-base text-gray-500 font-semibold text-center mt-4">
                Rp14.000.000.000,00 /
                <span className="block font-normal">Rp5.000.000.000,00</span>
              </p>
            </div>
          </div>

          {/* 3.2 Bank Approval Card */}
          <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 text-center">
              Top 5 Bank Approval Tertinggi
            </h3>
            {/* [RESPONSIVE] flex-col default, md:flex-row di medium ke atas */}
            <div className="relative w-full max-w-xl mx-auto flex flex-col md:flex-row justify-center items-center md:min-h-[250px] min-h-[400px]">
              {" "}
              {/* Tinggi disesuaikan */}
              <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                {" "}
                {/* Ukuran chart disesuaikan */}
                <BankApprovalChart />
              </div>
              {/* [RESPONSIVE] Hilangkan absolute positioning di mobile */}
              <div className="md:absolute top-10 left-0 flex items-center mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-start">
                <div className="text-center md:text-left">
                  <p className="text-lg md:text-xl font-bold text-[#17A9E2]">
                    10%
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    KEB Hana Bank
                  </p>
                </div>
                <div className="w-8 md:w-20 border-b border-dotted border-gray-400 ml-2 hidden md:block"></div>{" "}
                {/* Sembunyikan garis di mobile */}
              </div>
              <div className="md:absolute top-1/2 left-0 md:-translate-y-1/2 flex items-center mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-start">
                <div className="text-center md:text-left">
                  <p className="text-lg md:text-xl font-bold text-[#17A9E2]">
                    15%
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">Mandiri</p>
                </div>
                <div className="w-12 md:w-24 border-b border-dotted border-gray-400 ml-2 hidden md:block"></div>
              </div>
              <div className="md:absolute bottom-10 left-0 flex items-center mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-start">
                <div className="text-center md:text-left">
                  <p className="text-lg md:text-xl font-bold text-[#17A9E2]">
                    20%
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">BTN</p>
                </div>
                <div className="w-8 md:w-20 border-b border-dotted border-gray-400 ml-2 hidden md:block"></div>
              </div>
              <div className="md:absolute top-10 right-0 flex items-center mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                <div className="w-12 md:w-24 border-b border-dotted border-gray-400 mr-2 hidden md:block"></div>
                <div className="text-center md:text-right">
                  <p className="text-lg md:text-xl font-bold text-[#17A9E2]">
                    30%
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">BRI</p>
                </div>
              </div>
              <div className="md:absolute bottom-10 right-0 flex items-center mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                <div className="w-12 md:w-24 border-b border-dotted border-gray-400 mr-2 hidden md:block"></div>
                <div className="text-center md:text-right">
                  <p className="text-lg md:text-xl font-bold text-[#17A9E2]">
                    25%
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    Artha Graha
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (Notifikasi) */}
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-3">
            NOTIFICATION
          </h3>
          {/* [RESPONSIVE] max-h disesuaikan agar tidak terlalu tinggi di mobile */}
          <div className="flex flex-col max-h-80 md:max-h-96 overflow-y-auto">
            {/* Contoh item notifikasi */}
            <div className="flex">
              <div className="w-12 md:w-16 text-xs md:text-sm text-gray-500 pt-px flex-shrink-0">
                2 hrs
              </div>
              <div className="flex flex-col items-center w-6 mx-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#17A9E2]"></div>
                <div className="w-px flex-1 bg-gray-300 mt-1"></div>
              </div>
              <div className="flex-1 pb-4 md:pb-6">
                <p className="font-bold text-gray-800 text-sm">
                  admin_branch has updated
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Harry Handoko - Contact | MYCRM
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-12 md:w-16 text-xs md:text-sm text-gray-500 pt-px flex-shrink-0">
                2 hrs
              </div>
              <div className="flex flex-col items-center w-6 mx-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <div className="w-px flex-1 bg-gray-300 mt-1"></div>
              </div>
              <div className="flex-1 pb-4 md:pb-6">
                <p className="font-bold text-gray-800 text-sm">
                  admin_branch has updated
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Harry Handoko - Application | MYCRM
                </p>
              </div>
            </div>
            {/* ... Tambahkan item notifikasi lainnya ... */}
            {/* Item terakhir tanpa garis */}
            <div className="flex">
              <div className="w-12 md:w-16 text-xs md:text-sm text-gray-500 pt-px flex-shrink-0">
                4 hrs
              </div>
              <div className="flex flex-col items-center w-6 mx-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">
                  admin_branch has updated
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Harry Handoko - Contact | MYCRM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
