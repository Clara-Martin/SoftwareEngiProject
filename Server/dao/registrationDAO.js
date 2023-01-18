import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let registrations

export default class RegistrationsDAO {
  static async injectDB(conn) {
    if (registrations) {
      return
    }
    try {
      registrations = await conn.db(process.env.RESTREVIEWS_NS).collection("users")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addRegistration(user, phone, email, mailingAddr, billingAddr, password, preferred_number, preferred_payment) {
    try {
      const registrationDoc = { 
            user: user,
            phone_number: phone,
            email: email,
            mailing_addr: mailingAddr,
            billing_addr: billingAddr,
            password: password, 
            preferred_number: preferred_number, 
            preferred_payment: preferred_payment
        }
      return await registrations.insertOne(registrationDoc)

    } catch (e) {
      console.error(`Unable to make new user: ${e}`)
      return { error: e }
    }
  }
}