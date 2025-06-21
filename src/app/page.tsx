// File: app/page.tsx
"use client";

import { useState } from "react";
import JobFilters from "@/componets/jobFilters/JobFilteres";
import Navbar from "@/componets/navbar/Navbar";
import JobsPage from "@/componets/Jobs";
import localFont from "next/font/local";
import { Filters } from "@/types/job"; // optional if shared type file

const satoshiVariable = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  display: "swap",
  variable: "--font-satoshi-variable",
});

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    title: "",
    location: "",
    jobType: "",
    salaryRange: [1, 80],
  });

  return (
    <div className={satoshiVariable.className}>
      <main className="min-h-screen bg-[#FBFBFF]">
        {/* Fixed Navbar */}
        <div className="w-full fixed top-0 pt-5 z-50 bg-white">
          <Navbar />
          <div className="mt-6 px-4 w-full bg-white">
                  <JobFilters filters={filters} setFilters={setFilters} />
          </div>
        </div>
        <div className="mt-54 px-6 py-6">
          <JobsPage filters={filters} />
        </div>
      </main>
    </div>
  );
}