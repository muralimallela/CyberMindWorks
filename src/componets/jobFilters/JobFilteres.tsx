"use client";

import {
  IconSearch,
  IconMapPin,
  IconUser,
} from "@tabler/icons-react";
import { RangeSlider } from "@mantine/core";
import { Filters } from '../../types/job'
import { ChangeEvent } from "react";

interface JobFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, setFilters }) => {
  const handleChange = (key: keyof Filters, value: Filters[keyof Filters]) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white px-16 py-4 flex items-center justify-around w-full mx-auto space-x-6">
      {/* Search Input */}
      <div className="flex items-center space-x-6 w-1/4">
        <IconSearch className="text-[#686868]" size={24} />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          className="outline-none w-full text-black font-medium placeholder:text-[#686868]"
          value={filters.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="border-2 h-12 border-[#EAEAEA]" />

      {/* Preferred Location */}
      <div className="flex items-center space-x-6 w-1/5">
        <IconMapPin className="text-[#686868]" size={24} />
        <input
          type="text"
          placeholder="Preferred Location"
          className="outline-none w-full text-black font-medium placeholder:text-[#686868]"
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className="border-2 h-12 border-[#EAEAEA]" />

      {/* Job Type */}
      <div className="flex items-center space-x-6 w-1/5">
        <IconUser className="text-[#686868]" size={24} />
        <select
          className="text-[#686868] w-full font-medium outline-none bg-transparent"
          value={filters.jobType}
          onChange={(e) => handleChange("jobType", e.target.value)}
        >
          <option value="" hidden>Job type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="border-2 h-12 border-[#EAEAEA]" />

      {/* Salary Range */}
      <div className="flex flex-col w-1/5">
        <label className="text-base text-[#222222] font-semibold mb-1 flex justify-between">
          <span>Salary Per Month</span>
          <span>₹{filters.salaryRange[0]}L - ₹{filters.salaryRange[1]}L</span>
        </label>
        <RangeSlider
          value={filters.salaryRange}
          onChange={(value) => handleChange("salaryRange", value)}
          label={(value) => `₹${value}L`}
          min={1}
          max={80}
          step={1}
          minRange={5}
          color="black"
          className="mt-1"
          thumbSize={14}
          size="sm"
        />
      </div>
    </div>
  );
};

export default JobFilters;
