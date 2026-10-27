import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import taskRouter from "./routes/taskRoutes";

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRouter);

const port = Number(process.env.PORT ?? 6741);
const mongoUri = process.env.MONGODB_URI;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid port number between 1 and 65535.");
}

if (!mongoUri) {
  throw new Error("MONGODB_URI is required. Add it to server/.env.");
}

const startServer = async () => {
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`TaskDuty API is running on port ${port}.`);
  });
};

void startServer().catch((error: unknown) => {
  console.error("Could not start TaskDuty API:", error);
  process.exitCode = 1;
});
