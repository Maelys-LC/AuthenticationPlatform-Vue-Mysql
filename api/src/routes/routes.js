const express = require("express")
const routes = express.Router()
const db = require("../database/db.js")
const mysql = require("mysql2")
const bcrypt = require("bcrypt")

let getHashedPassword = (password) => {
    return new Promise(function(resolve){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                resolve(hash)
            });
        });        
    })
}

let comparePassword = (passwordInput, passwordDB) => {
    return new Promise(function(resolve) {
        bcrypt.compare(passwordInput, passwordDB, function(err, res) {
            resolve(res)
        });
    })    
}

routes.post("/sign-up", async function(req, res) {
    let post = {
        name: req.body.name,
        email: req.body.email,
        password: await getHashedPassword(req.body.password)
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

    db.query("SELECT *  FROM `users` WHERE `email` = " + mysql.escape(post.email), async function(err, results) {
        if (err) {
            res.status(500)
            res.send()
            throw err
        }

        res.status(200)
        
        for (let user of results) {
            if (await comparePassword(req.body.password, user.password)) {
                return res.send("You are athenticated!")
            }
        }

        res.send("Authentication failed")
    })   
})

module.exports = routes



