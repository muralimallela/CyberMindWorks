import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM job ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      title,
      company,
      location,
      job_type,
      salary_min,
      salary_max,
      description,
      application_deadline,
    } = data;

    const query = `
      INSERT INTO job
        (title, company, location, job_type, salary_min, salary_max, description, application_deadline)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    await pool.query(query, [
      title,
      company,
      location,
      job_type,
      salary_min,
      salary_max,
      description,
      application_deadline,
    ]);

    return NextResponse.json({ message: "Job created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Failed to create job", { status: 500 });
  }
}
