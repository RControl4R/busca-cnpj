import pool from "../database/db.js"
import bcrypt from "bcrypt";
import "dotenv/config";

export async function autenticarUsuario(username, senha) {
  const result = await pool.query(
    "SELECT id, username, password_hash FROM users WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const senhaValida = await bcrypt.compare(senha, user.password_hash);
  if (!senhaValida) {
    return null;
  }

  return {
    id: user.id,
    username: user.username
  };
}
