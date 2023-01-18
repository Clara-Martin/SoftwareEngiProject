import express from "express"
import ReservationsCtrl from "./reservations.controller.js"

const router = express.Router()

router.route("/").post(ReservationsCtrl.apiPostReservation)
  // .get((req,res) => res.send("hello world"))

export default router