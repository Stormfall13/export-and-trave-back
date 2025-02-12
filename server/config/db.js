const { Sequelize } = require("sequelize");

const databaseUrl = process.env.NODE_ENV === "production"
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_LOCAL;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: process.env.NODE_ENV === "production" ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

const ServerDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

ServerDB();

module.exports = sequelize;
