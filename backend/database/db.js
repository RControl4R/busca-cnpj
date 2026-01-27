import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } //ssl: false
});

pool.on("connect", () => {
  console.log(
    `🟢 PostgreSQL conectado (${process.env.NODE_ENV || "dev"})`
  );
});

pool.on("error", (err) => {
  console.error("🔴 Erro PostgreSQL", err);
  process.exit(1);
});

export default pool;
