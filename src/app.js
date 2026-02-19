import express from "express";
import studentRoutes from "./routes/student.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";

const app = express();

//JSON Middleware
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello Boss Connected");
// });

export default app;
