// src/db/connection.js
const { Pool } = require("pg");

// 1️⃣ Detecta o ambiente
const ENV = process.env.NODE_ENV || "development";

// 2️⃣ Só faz load do .env local se NÃO for produção
if (ENV !== "production") {
  require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
  });
}

// 3️⃣ Validação das variáveis obrigatórias
if (ENV === "production" && !process.env.DATABASE_URL) {
  throw new Error("❌ Em produção, precisa definir DATABASE_URL");
}
if (ENV !== "production" && !process.env.PGDATABASE) {
  throw new Error("❌ Em desenvolvimento, precisa definir PGDATABASE");
}

// 4️⃣ Monta a config da pool
const config = {};
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

module.exports = new Pool(config);

// const { Pool } = require("pg");


// const ENV = process.env.NODE_ENV || "development";


// require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });


// if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
//   throw new Error("PGDATABASE or DATABASE_URL not set");
// }


// const config = {};

// if (ENV === "production") {
//   config.connectionString = process.env.DATABASE_URL;
//   config.max = 2;
// }

// module.exports = new Pool(config);
