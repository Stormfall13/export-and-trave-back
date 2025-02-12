const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false, // Отключаем лишние логи
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
