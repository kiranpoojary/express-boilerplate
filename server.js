import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
dotenv.config();
const app = express();

const { SERVICE_PORT: PORT = 3000, SERVICE = "noname" } = process.env;

app.use(morgan("combined"));

app.use(express.json());

const corsOptions = {
  origin: process?.env?.ALLOWED_ORIGINS?.split(","),
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => res.send(`${SERVICE} service is up and running!`));
app.use(`/${SERVICE}/api`, routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.SERVICE_PORT}`);
});
