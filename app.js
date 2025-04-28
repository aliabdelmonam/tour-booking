import express from 'express';
import userRouter from './routes/userRoute.js';
import reviewRouter from "./routes/reviewRoute.js";
import bookingRouter from './routes/bookingRoutes.js';
import tourRoutes from "./routes/tourRoutes.js";
import discountRouter from "./routes/discountRouter.js";

const app = express();
app.use(express.json({ limit: '5kb' }));

app.use('/api/v1/users', userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/booking", bookingRouter);
app.use('/api/v1/tours', tourRoutes);
app.use("/api/v1/discounts", discountRouter);

export default app;
