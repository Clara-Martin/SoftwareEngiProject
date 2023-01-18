import express from "express"
import RegistrationsCtrl from "./registrations.controller.js"

const router = express.Router()

router.route("/").post(RegistrationsCtrl.apiPostRegistration)

export default router