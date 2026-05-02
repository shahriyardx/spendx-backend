import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
const PORT = Number(process.env.PORT) || 5001;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://spendx.shahriyar.dev",
      "spendx://",
      "spendx+dev://",
      "exp://",
    ],
    credentials: true,
  }),
);

app.get("/", (_, res) => {
  res.json({ message: "Welcome to SpendX backend" });
});

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
