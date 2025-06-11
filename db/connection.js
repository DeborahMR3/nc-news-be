//db/connection.js
const { Pool } = require("pg");

// 1. Define o ambiente (development, test ou production)
const ENV = process.env.NODE_ENV || "development";

// 2. Carrega o .env correto (.env.development, .env.test, .env.production)
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

// 3. Valida se existe PGDATABASE (dev/test) ou DATABASE_URL (prod)
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

// 4. Prepara o config do Pool
const config = {};

if (ENV === "production") {
  // a) usa a URL do pooler em produção
  config.connectionString = process.env.DATABASE_URL;
  // b) limita conexões
  config.max = 2;
}

// 5. Exporta o pool já configurado
module.exports = new Pool(config);
