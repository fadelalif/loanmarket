"use client"; // Berguna jika ingin menambahkan interaksi nanti

import React from "react";
import Link from "next/link"; // Jika ingin langkahnya bisa diklik

interface Step {
  name: string;
  href: string; // URL untuk setiap langkah
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStepIndex: number; // Indeks langkah yang aktif (dimulai dari 0)
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStepIndex,
}) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-start">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            // Beri 'relative' untuk posisi garis
            className={`relative ${
              stepIdx !== steps.length - 1 ? "flex-1" : ""
            }`}
          >
            {/* [PERUBAHAN] Garis Penghubung dipindahkan ke sini (sebelum Link) */}
            {stepIdx > 0 && (
              <div
                // Posisi absolut relatif ke li
                // top-4: Sejajar vertikal dengan tengah dot (karena dot container h-8)
                // left-0, w-full: Membentang penuh
                // z-0: Kirim ke background
                className={`absolute top-4 left-0 w-full h-0.5 z-0 ${
                  stepIdx <= currentStepIndex ? "bg-[#17A9E2]" : "bg-gray-300" // Warna garis
                }`}
                aria-hidden="true"
              />
            )}

            {/* Wrapper untuk Dot dan Teks */}
            <Link
              href={step.href} // Mungkin nonaktifkan link ini jika belum bisa diakses
              // [PERUBAHAN] Beri 'relative' dan 'z-10' agar tampil di atas garis
              className="relative z-10 flex flex-col items-center text-center group pt-1"
              aria-current={stepIdx === currentStepIndex ? "step" : undefined}
            >
              {/* Dot Container */}
              {/* [PERUBAHAN] Tidak perlu 'relative' lagi di sini */}
              <span className="flex h-8 w-8 items-center justify-center">
                {/* Dot Aktual */}
                <span
                  // [PERUBAHAN] Beri background putih agar menutupi garis di belakangnya
                  className={`h-3 w-3 rounded-full bg-white ring-0 ${
                    stepIdx <= currentStepIndex
                      ? "ring-[#17A9E2] ring-offset-0 ring-4" // Efek ring biru untuk dot aktif/selesai
                      : "ring-gray-300 group-hover:ring-gray-400 ring-4" // Efek ring abu-abu
                  }`}
                  aria-hidden="true"
                />
              </span>

              {/* Teks */}
              <span
                className={`mt-2 text-xs font-semibold break-words w-20 ${
                  stepIdx <= currentStepIndex
                    ? "text-[#17A9E2]"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              >
                {step.name}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProgressIndicator;
