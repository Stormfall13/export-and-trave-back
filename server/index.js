require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const net = require('net');

const app = express();

// app.use(cors());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Защищённый маршрут (пример)
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({ message: "Доступ разрешён", user: req.user });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
});

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});

app.get("/test", (req, res) => {
    res.json({ message: "✅ Server is working!" });
});

const PORT = process.env.PORT || 8080;
console.log("🔍 Railway assigned PORT:", process.env.PORT)
app.listen(PORT, "0.0.0.0" , () => console.log(`🚀 Server running on port ${PORT}`));



const serverTest = net.createServer();
serverTest.listen(process.env.PORT || 8080, () => {
    console.log(`✅ TEST: Port ${process.env.PORT || 8080} is open`);
});
serverTest.on('error', (err) => {
    console.error(`❌ ERROR: Cannot bind to port ${process.env.PORT || 8080} - ${err.message}`);
});

sequelize
    .sync({ alter: true })
    .then(() => console.log("📦 DB updated with models"))
    .catch((err) => console.error("❌ Database sync error:", err));
