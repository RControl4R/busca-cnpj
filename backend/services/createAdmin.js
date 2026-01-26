import pg from "pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const username = "admin";
const senha = "12345"; // depois você troca

const hash = await bcrypt.hash(senha, 10);

await pool.query(
  "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
  [username, hash]
);

console.log("Usuário admin criado com sucesso");
process.exit(0);
