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
  desc.split("\n").map((line) => line.trim()).filter(Boolean);

export default function JobsPage({ filters }: JobsPageProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
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
    console.log(`Time difference in milliseconds: ${diffMs}`);
    console.log(`Posted at: ${posted.toISOString()}`);
    console.log(`Current time: ${now.toISOString()}`);
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m Ago`;
    if (diffHours < 24) return `${diffHours}h Ago`;
    return `${diffDays}d Ago`;
  };
  


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
