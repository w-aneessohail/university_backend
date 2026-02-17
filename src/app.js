import express from "express";
import studentRoutes from "./routes/student.routes.js";
const app = express();

//JSON Middleware
app.use(express.json());

app.use("/api/students", studentRoutes);
app.get("/", (req, res) => {
  res.send("Hello Boss Connected");
});

export default app;
