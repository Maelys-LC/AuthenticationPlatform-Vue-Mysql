const express = require("express")
const cors = require('cors')
const api = express()


const routes = require("./routes/routes.js")

api.use(express.urlencoded({extended: true}));
api.use(express.json());
api.use(cors())

api.use("/", routes)

api.listen(8080)