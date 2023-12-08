import express, { Request, Response } from "express";
import dotenv from "dotenv";
import todosRoutes from "./routes/todos";
import { middlewareLogRequest } from "./middleware/log";

dotenv.config();

const app = express();
const port = process.env.PORT;

// MIDDLEWARE = sebuah fungsi yang bisa mengakses response, request dan next di dalam express, middleware juga di sebut penghubung, dan middleware pasti dilewati ketika request masuk, sehingga kita bisa melakukan pengecekan yang ingin kita lakukan kepada request
// app.use((req, res, next) => {})
// artinya semua request akan melewati middleware dulu sebelum dia di lanjutkan ke app.method lainnya

app.use(express.json());

app.use(middlewareLogRequest);

// CRUD = Create, Read, Update, Delete
app.use("/todos", todosRoutes);

app.listen(port, () => {
  console.log("Server is running on port", port);
  console.log("url : ", `http://localhost:${port}`);
});
