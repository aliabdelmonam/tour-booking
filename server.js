import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
