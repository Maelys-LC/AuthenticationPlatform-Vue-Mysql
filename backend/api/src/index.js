const express = require("express")
const cors = require('cors')
const api = express()


const routes = require("./routes/routes.js")

api.use(express.urlencoded({extended: true}));
api.use(express.json());
api.use(cors())

api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

api.use("/", routes)


api.listen(8080)