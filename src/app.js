import express from "express";

const app = express();

//JSON Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Boss Connected");
});

export default app;
