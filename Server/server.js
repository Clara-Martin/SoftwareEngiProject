import express from "express"
import cors from "cors"
import tables from "./api/tables.route.js";
import reservations from "./api/reservations.route.js";
import register from "./api/register.route.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/tables", tables)
app.use("/api/v1/reservations", reservations)
app.use("/api/v1/register", register)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app

