import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import ownerRoutes from "./routes/ownerRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import leaseRoutes from "./routes/leaseRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";

dotenv.config();

const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/owners", ownerRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/leases", leaseRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/maintenance", maintenanceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});