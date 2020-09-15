const express = require("express")
const routes = express.Router()
const db = require("../database/db.js")
const mysql = require("mysql2")

routes.post("/sign-up", function(req, res) {
    let post = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    db.query("INSERT INTO users SET ?", post, function(err, result) {
        if (err) {
            throw err
        }
    })

    res.status(200)
    res.send()
})

routes.post("/sign-in", function(req, res) {
    let post = {
        email: req.body.email,
        password: req.body.password
    }

    db.query("SELECT *  FROM `users` WHERE `email` = " + mysql.escape(post.email) + "AND `password` =" + mysql.escape(post.password), function(err, result) {
        if (err) {
            res.status(500)
            res.send()
            throw err
        }

        res.status(200)

        if (result.length) {            
            res.send("You are authenticated!")
        } else {
            res.send("Authentication incorrect")
        }
    })   
})

module.exports = routes



