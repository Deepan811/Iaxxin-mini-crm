import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import companyRoutes from "./routes/company.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/user.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
