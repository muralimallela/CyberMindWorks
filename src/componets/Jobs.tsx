"use client";

import { useEffect, useState } from "react";
import JobCard from "./JobCard";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  description: string;
  application_deadline: string;
  created_at: string;
}

interface Filters {
  title: string;
  location: string;
  jobType: string;
  salaryRange: [number, number];
}

interface JobsPageProps {
  filters: Filters;
}

const formatSalary = (min: number) => `${Math.round(min / 100000)} LPA`;

const formatDescription = (desc: string): string[] =>
  desc
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function JobsPage({ filters }: JobsPageProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const locationMatch = job.location
      .toLowerCase()
      .includes(filters.location.toLowerCase());
    const jobTypeMatch = filters.jobType
      ? job.job_type === filters.jobType
      : true;
    const salaryMatch =
      job.salary_min >= filters.salaryRange[0] * 100000 &&
      job.salary_max <= filters.salaryRange[1] * 100000;

    return titleMatch && locationMatch && jobTypeMatch && salaryMatch;
  });

  const getElapsedTime = (createdAt: string): string => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffMs = now.getTime() - posted.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m Ago`;
    if (diffHours < 24) return `${diffHours}h Ago`;
    return `${diffDays}d Ago`;
  };

  if (loading) {
    return (
      <div className="flex mt-56 w-full h-56 items-center justify-center">
        <div className="loader">
          <div className="box box0">
            <div></div>
          </div>
          <div className="box box1">
            <div></div>
          </div>
          <div className="box box2">
            <div></div>
          </div>
          <div className="box box3">
            <div></div>
          </div>
          <div className="box box4">
            <div></div>
          </div>
          <div className="box box5">
            <div></div>
          </div>
          <div className="box box6">
            <div></div>
          </div>
          <div className="box box7">
            <div></div>
          </div>
          <div className="ground">
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8">
      {filteredJobs.map((job) => (
        <JobCard
          key={job.id}
          title={job.title}
          companyLogo={`/${job.company.toLowerCase()}-logo.png`}
          experience="1-3 yr Exp"
          location={job.location}
          salary={formatSalary(job.salary_min)}
          description={formatDescription(job.description)}
          postedTime={getElapsedTime(job.created_at)}
        />
      ))}
    </div>
  );
}
