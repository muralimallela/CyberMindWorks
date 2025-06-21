"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import localFont from "next/font/local";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
type JobFormValues = {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  jobDescription: string;
  requirements: string;
  responsibilities: string;
  deadline: string;
};

const satoshiVariable = localFont({
  src: "./../app/fonts/Satoshi-Variable.ttf",
  display: "swap",
  variable: "--font-satoshi-variable",
});

export default function JobCreationForm() {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<JobFormValues>();

  const onSubmit = async (data: JobFormValues) => {
    const payload = {
      title: data.jobTitle,
      company: data.companyName,
      location: data.location,
      job_type: data.jobType,
      salary_min: data.salaryMin,
      salary_max: data.salaryMax,
      description: data.jobDescription,
      application_deadline: data.deadline,
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const responseData = await res.json();
        console.log("Job created:", responseData);
        toast("Job posted successfully", {
          position: "top-right",
        });
        showNotification({
          title: "Success",
          message: "Job posted successfully",
          color: "green",
          icon: <IconCheck size={16} />,
        });

        reset();
      } else {
        showNotification({
          title: "Error",
          message: "Failed to create job",
          color: "red",
          icon: <IconX size={16} />,
        });
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      showNotification({
        title: "Error",
        message: "An unexpected error occurred",
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  return (
    <div className={satoshiVariable.className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col group">
            <label className="text-lg text-[#636363] font-semibold mb-1 group-focus-within:text-black">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Full Stack Developer"
              className="border px-3 py-2 rounded-md focus:outline-none focus:border-black focus:text-black"
              {...register("jobTitle", { required: true })}
            />
          </div>

          <div className="flex flex-col group">
            <label className="text-lg text-[#636363] font-semibold mb-1 group-focus-within:text-black">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Amazon, Microsoft, Swiggy"
              className="border px-3 py-2 rounded-md focus:outline-none focus:border-black focus:text-black"
              {...register("companyName", { required: true })}
            />
          </div>

          <div className="flex flex-col group">
            <label className="text-lg text-[#636363] font-semibold mb-1 group-focus-within:text-black">
              Location
            </label>
            <input
              type="text"
              placeholder="Choose Preferred Location"
              className="border px-3 py-2 rounded-md focus:outline-none focus:border-black focus:text-black"
              {...register("location", { required: true })}
            />
          </div>

          <div className="flex flex-col group">
            <label className="text-lg text-[#636363] font-semibold mb-1 group-focus-within:text-black">
              Job Type
            </label>
            <select
              className="border px-3 py-2 rounded-md focus:outline-none focus:border-black focus:text-blalg text-[#636363] font-semibold"
              {...register("jobType", { required: true })}
            >
              <option value="" hidden>
                Select Job Type
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6 w-full">
          <div className="flex flex-col gap-2 w-1/2 group">
            <label className="text-[#636363] text-lg font-medium group-focus-within:text-black">
              Salary Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="₹0"
                className="border px-3 py-2 rounded-md w-full focus:outline-none focus:border-black focus:text-black"
                {...register("salaryMin", { required: true, min: 0 })}
              />
              <input
                type="number"
                placeholder="₹12,00,000"
                className="border px-3 py-2 rounded-md w-full focus:outline-none focus:border-black focus:text-black"
                {...register("salaryMax", { required: true, min: 0 })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-1/2 group">
            <label className="text-[#636363] text-lg font-medium group-focus-within:text-black">
              Application Deadline
            </label>
            <input
              type="date"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:border-black focus:text-black"
              {...register("deadline", { required: true })}
            />
          </div>
        </div>

        <div className="flex flex-col group">
          <label className="text-lg text-[#636363] font-semibold mb-1 group-focus-within:text-black">
            Job Description
          </label>
          <textarea
            placeholder="Describe the job role..."
            rows={5}
            className="border px-3 py-2 rounded-md focus:outline-none focus:border-black focus:text-black resize-y"
            {...register("jobDescription", { required: true })}
          />
        </div>

        <div className="flex justify-between w-full">
          <button
            type="button"
            className="flex items-center w-[200px] h-[50px] gap-2 justify-center border border-black rounded-[10px] px-4 py-2 text-black font-medium bg-white"
          >
            Save Draft
            <Image
              src="/down-arrow.png"
              alt="Save Icon"
              width={10}
              height={10}
              className="mt-1"
            />
          </button>
          <button
            type="submit"
            className="flex items-center w-[200px] h-[50px] gap-2 justify-center border border-gray-300 rounded-[10px] px-4 py-2 text-white font-medium bg-[#00AAFF]"
          >
            Publish
            <Image
              src="/right-arrow.png"
              alt="Publish Icon"
              width={12}
              height={12}
              className="mt-1"
            />
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
