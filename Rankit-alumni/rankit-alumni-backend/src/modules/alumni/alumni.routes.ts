// src/modules/alumni/alumni.routes.ts
import { Router } from "express";
import { z } from "zod";
import { pool } from "@/config/db";

export const alumniRouter = Router();

// Query schema for basic filters
const alumniQuerySchema = z.object({
  q: z.string().optional(),
  graduationYear: z.string().optional(),
  program: z.string().optional(),
  country: z.string().optional()
});

alumniRouter.get("/", async (req, res) => {
  const parsed = alumniQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid query", errors: parsed.error.flatten() });
  }

  const { q, graduationYear, program, country } = parsed.data;

  const filters: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (q) {
    filters.push(
      "(full_name ILIKE $" +
        paramIndex +
        " OR current_title ILIKE $" +
        paramIndex +
        " OR current_company ILIKE $" +
        paramIndex +
        ")"
    );
    params.push(`%${q}%`);
    paramIndex++;
  }

  if (graduationYear) {
    filters.push("graduation_year = $" + paramIndex);
    params.push(Number(graduationYear));
    paramIndex++;
  }

  if (program) {
    filters.push("degree_program = $" + paramIndex);
    params.push(program);
    paramIndex++;
  }

  if (country) {
    filters.push("country = $" + paramIndex);
    params.push(country);
    paramIndex++;
  }

  const whereClause = filters.length ? "WHERE " + filters.join(" AND ") : "";

  const sql = `
    SELECT
      id,
      university_id,
      full_name,
      email,
      graduation_year,
      degree_program,
      current_title,
      current_company,
      country,
      employment_status,
      total_donations,
      last_job_change_date,
      is_verified,
      rank_score
    FROM alumni
    ${whereClause}
    ORDER BY rank_score DESC NULLS LAST, graduation_year DESC;
  `;

  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return res.json(result.rows);
  } finally {
    client.release();
  }
});
