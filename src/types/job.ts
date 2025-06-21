export interface Filters {
  title: string;
  location: string;
  jobType: string;
  salaryRange: [number, number];
}

export interface JobsPageProps {
  filters: Filters;
}
