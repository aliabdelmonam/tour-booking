import express from 'express';
import userRouter from './routes/userRoute.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express();
app.use(express.json({ limit: '5kb' }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);

export default app;