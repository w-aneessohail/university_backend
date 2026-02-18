import express from "express";
import studentRoutes from "./routes/student.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";

const app = express();

//JSON Middleware
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/teachers", teacherRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello Boss Connected");
// });

export default app;
