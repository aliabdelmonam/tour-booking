import express from "express";
import userRouter from "./routes/userRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import semanticSearchRouter from "./routes/semanticSearchRoutes.js";
import discountRouter from "./routes/discountRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";


const app = express();
app.use(express.json({ limit: "5kb" }));

// 1. Swagger Config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Tour Booking API Documentation",
    },
    servers: [
      {
        url: "/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./docs/*.js"], // Path to the API docs (where you write Swagger comments)
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// 2. Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/booking", bookingRouter);
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/semantic_search', semanticSearchRouter);
app.use("/api/v1/discounts", discountRouter);


export default app;
