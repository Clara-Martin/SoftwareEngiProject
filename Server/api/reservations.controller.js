import ReservationsDAO from "../dao/reservationsDAO.js";

export default class ReservationsController {
    static async apiPostReservation(req, res, next) {
      try {
        const name = req.body.name
        const phone = req.body.phone
        const email = req.body.email
        const date = req.body.date
        const numGuests = req.body.num_guests
        const tables = req.body.tables
  
        const ReservationResponse = await ReservationsDAO.addReservation(
            name,
            phone,
            email,
            date,
            numGuests,
            tables
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }
  }