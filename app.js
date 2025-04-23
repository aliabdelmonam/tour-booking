import express from "express";
import userRouter from "./routes/userRoute.js";

const app = express();
app.use(express.json({ limit: "5kb" }));

app.use("/api/v1/users", userRouter);

export default app;
