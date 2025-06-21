// components/JobCard.tsx
"use client";

import { IconStack2 } from "@tabler/icons-react";
import Image from "next/image";

interface JobCardProps {
  title: string;
  companyLogo: string;
  experience: string;
  location: string;
  salary: string;
  description: string[];
  postedTime: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  companyLogo,
  experience,
  location,
  salary,
  description,
  postedTime,
}) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-2xl shadow-[0px_0px_14px_#D3D3D326] p-5 relative">
      <div className="absolute h-[33px]  font-medium top-3 right-3 bg-[#B0D9FF] text-blue-700 text-sm px-3 py-1.5 rounded-[10px]">
        {postedTime}
      </div>

      <div className="mb-4">
        <div className="w-[84px] h-[84px] bg-gradient-to-b from-[#FEFEFD] to-[#F1F1F1] shadow-[0px_0px_10.25px_#94949440] rounded-xl flex items-center justify-center">
          <Image src={companyLogo} alt="Company Logo" width={65} height={65} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-black mb-3">{title}</h2>

      <div className="flex items-center gap-4 text-[#5A5A5A] text-base font-medium mb-4">
        <span className="flex items-center gap-1">
          <Image src="/experience.png" alt="exp" width={18} height={18} />
          {experience}
        </span>
        <span className="flex items-center gap-1">
          <Image src="/jobLocation.png" alt="loc" width={18} height={18} />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <IconStack2 size={18} /> {salary}
        </span>
      </div>

      <ul className="text-[#5A5A5A] text-sm font-medium text-justify space-y-1 mb-4 list-disc px-4">
        {description.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>

      <button className="w-full bg-[#00AAFF] text-white py-2 rounded-[10px] font-medium">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
