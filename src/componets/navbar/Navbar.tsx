"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "@mantine/core";
import JobCreationModal from "../JobCreationModal";
import localFont from "next/font/local";
import Link from "next/link";

const satoshiVariable = localFont({
  src: "./../../app/fonts/Satoshi-Variable.ttf",
  display: "swap",
  variable: "--font-satoshi-variable",
});

const navItems = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "#" },
  { label: "Find Talents", href: "#" },
  { label: "About us", href: "#" },
  { label: "Testimonials", href: "#" },
];

const Navbar: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <nav
        className={`${satoshiVariable.className} bg-white shadow-[0px_0px_20px_#7F7F7F26] border border-[#FCFCFC] rounded-[112px] px-8 py-4 flex items-center justify-between mx-auto w-fit`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/cmwlogo.png" alt="Logo" width={45} height={45} />
        </div>

        {/* Navigation Links */}
        <ul className="flex ml-6 text-gray-800 font-medium text-[16px]">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="navigationLinks h-[48px] w-[120px] flex items-center justify-center hover:text-purple-600 transition-colors"
            >
              <Link href={item.href} className="text-center w-full">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Create Jobs Button */}
        <div className="ml-5">
          <div className="group relative h-[38px] w-[133px] overflow-hidden transition-all duration-300">
            <button
              className="bg-gradient-to-b from-[#A128FF] to-[#6100AD] text-white px-6 rounded-[30px] font-semibold h-full w-full relative"
              onClick={() => setOpened(true)}
            >
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-full">
                Create Jobs
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Login
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        size="lg"
        radius="md"
        withCloseButton={false}
        classNames={{ body: "px-6 pb-6 pt-2 " }}
      >
        <div className={satoshiVariable.className}>
          <h2 className="text-2xl font-bold text-center mb-4">
            Create Job Opening
          </h2>
        </div>

        <JobCreationModal />
      </Modal>
    </>
  );
};

export default Navbar;
