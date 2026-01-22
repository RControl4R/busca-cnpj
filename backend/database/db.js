import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false
});

pool.query("SELECT 1")
    .then(() => {
        console.log("PostgreSQL conectado com sucesso.");
    })
    .catch(err => {
        console.error("Erro ao conectar no PostgreSQL:", err.message);
    });

export default pool;