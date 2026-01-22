import { createLogger, format, transports } from "winston";

const isProd = process.env.NODE_ENV === "production";

const logger = createLogger({
  level: "silly", // NÃO filtra nada
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    // Sempre console (Render)
    new transports.Console({
      level: "info" // console não precisa de tudo
    }),

    // Apenas local grava em arquivo
    ...(!isProd
      ? [
          new transports.File({
            filename: "logs/auditoria.log",
            level: "silly" // grava info, warn, error
          })
        ]
      : [])
  ]
});

export default logger;
