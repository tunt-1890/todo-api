import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { todosController } from "./controllers/todo.controller";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 *  App Configuration
 */

const app: Application = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Routers
 */
app.use("/api/todos", todosController);

app.get("/", (req: Request, res: Response) => {
  res.send("Well done!");
});

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
