import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reservations

export default class ReservationsDAO {
  static async injectDB(conn) {
    if (reservations) {
      return
    }
    try {
      reservations = await conn.db(process.env.RESTREVIEWS_NS).collection("reservations")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReservation(name, phone, email, date, numGuests, tables) {
    try {
      const reservationDoc = { 
            name: name,
            phone_number: phone,
            email: email,
            date: date,
            num_guests: numGuests,
            tables: tables
        }
      return await reservations.insertOne(reservationDoc)

    } catch (e) {
      console.error(`Unable to make reservation: ${e}`)
      return { error: e }
    }
  }
}