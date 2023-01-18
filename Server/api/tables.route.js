import express from "express"
import TablesCtrl from "./tables.controller.js";

const router = express.Router()

router.route("/").get(TablesCtrl.apiGetTables)

export default router