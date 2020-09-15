const mysql = require("mysql2")

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "authentication"
})

connection.connect()

module.exports = connection