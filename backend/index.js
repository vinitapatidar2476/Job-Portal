require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  if (req.method !== 'GET') {
      console.log(`${req.method} ${req.url}`, req.body);
  } else {
      console.log(`${req.method} ${req.url}`);
  }
  next();
});

// DB Connection
connectDB();

// Routes
const AuthRoutes = require("./routes/AuthRoutes");
const jobRoutes = require("./routes/JobRoutes");
const applicationRoutes = require("./routes/ApplicationRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const savedJobRoutes = require("./routes/SavedJobRoutes");

app.use("/api/auth", AuthRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/saved-jobs", savedJobRoutes);

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(err.status || 500).json({ message: err.message, error: err });
});

// Admin Seeding
const seedAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await User.findOneAndUpdate(
            { email: "admin@jobportal.com" },
            { name: "Super Admin", password: hashedPassword, role: "admin" },
            { upsert: true, new: true }
        );
        console.log("Admin account guaranteed: admin@jobportal.com / admin123");
    } catch (err) {
        console.error("Seeding failed", err);
    }
};

app.get("/", (req, res) => res.send("JWT AUTH WORKING"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await seedAdmin();
});
