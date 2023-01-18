import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ResturantsDAO from "./dao/restaurantsDAO.js";
import TablesDAO from "./dao/tablesDAO.js";
import ReservationsDAO from "./dao/reservationsDAO.js";
import RegistrationDAO from "./dao/registrationDAO.js";

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTURANT_DB_URI,
    {
        poolSize: 50, 
        wtimeout: 2500,
        useNewUrlParse: true}    
)
.catch (err => {
    console.error(err.stack)
    process.exit(1);
})
.then(async client => {
    await RegistrationDAO.injectDB(client);
    await TablesDAO.injectDB(client);
    await ReservationsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})