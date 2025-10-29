export interface ProductData {
  id: string;
  bank: string;
  namaProduct: string;
  jaminan: string;
  targetMarket: string;
  komisi: string;
  appraisal: string;
  floating: string;
  loanToValue: string;
  penaltyFee: string;
  interestRate: string;
  fixRatePercent: string;
  fixRateYear: string;
  maxTenor: string;
  keterangan: string;
  url: string;
}

const allProductData: ProductData[] = [
  {
    id: "mandiri1",
    bank: "Mandiri",
    namaProduct: "Bunga Special Tengah Imlek 2023",
    jaminan: "Ruko, Rukan, Rumah, Apartemen",
    targetMarket: "Karyawan, Pengusaha",
    komisi: "1%",
    appraisal: "1%",
    floating: "1%",
    loanToValue: "1%",
    penaltyFee: "-",
    interestRate: "3.65 %",
    fixRatePercent: "3.88 %",
    fixRateYear: "3",
    maxTenor: "12",
    keterangan:
      "Mandiri KPR adalah kredit pemilikan rumah (KPR) bank mandiri yang diberikan secara perseorangan untuk membeli rumah tinggal/apartemen/ruko/rukan, baik melalui developer atau tidak.",
    url: "null",
  },
  {
    id: "panin1",
    bank: "Panin",
    namaProduct: "Panin KPR & KPR XTRA",
    jaminan: "Ruko, Rumah, Apartemen",
    targetMarket: "Karyawan",
    komisi: "1%",
    appraisal: "1%",
    floating: "1%",
    loanToValue: "85%",
    penaltyFee: "-",
    interestRate: "9.90 %",
    fixRatePercent: "9.90 %",
    fixRateYear: "10",
    maxTenor: "10",
    keterangan: "Deskripsi untuk produk Panin KPR & KPR XTRA.",
    url: "null",
  },
  {
    id: "mnc1",
    bank: "MNC",
    namaProduct: "MNC KPR Secondary",
    jaminan: "Rumah, Apartemen",
    targetMarket: "Karyawan",
    komisi: "1%",
    appraisal: "1%",
    floating: "1%",
    loanToValue: "50-60%",
    penaltyFee: "-",
    interestRate: "12.00 %",
    fixRatePercent: "12.00 %",
    fixRateYear: "1",
    maxTenor: "1",
    keterangan: "Deskripsi untuk produk MNC KPR Secondary.",
    url: "null",
  },
  {
    id: "cw1",
    bank: "Commonwealth",
    namaProduct: "Commonwealth KPR Primary",
    jaminan: "Rumah, Apartemen",
    targetMarket: "Karyawan",
    komisi: "1%",
    appraisal: "1%",
    floating: "1%",
    loanToValue: "50-60%",
    penaltyFee: "-",
    interestRate: "12.00 %",
    fixRatePercent: "12.00 %",
    fixRateYear: "1",
    maxTenor: "1",
    keterangan: "Deskripsi untuk produk Commonwealt KPR Primary.",
    url: "null",
  },
  {
    id: "cw2",
    bank: "Commonwealth",
    namaProduct: "Commonwealth KPR Secondary",
    jaminan: "Rumah, Apartemen",
    targetMarket: "Karyawan",
    komisi: "1%",
    appraisal: "1%",
    floating: "1%",
    loanToValue: "50-60%",
    penaltyFee: "-",
    interestRate: "12.00 %",
    fixRatePercent: "12.00 %",
    fixRateYear: "1",
    maxTenor: "1",
    keterangan: "Deskripsi untuk produk Commonwealt KPR Secondary.",
    url: "null",
  },
];

export const getProductById = (id: string): ProductData | undefined => {
  return allProductData.find((product) => product.id === id);
};

export const getAllProducts = (): ProductData[] => {
  return allProductData;
};
