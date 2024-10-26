import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use("/", routes);

export default app;




