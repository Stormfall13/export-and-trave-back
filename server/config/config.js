require("dotenv").config(); // Подключаем .env

module.exports = {
  development: {
    url: process.env.DATABASE_URL_LOCAL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
