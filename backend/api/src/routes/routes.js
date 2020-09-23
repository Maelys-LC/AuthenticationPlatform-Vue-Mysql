const express = require("express")
const routes = express.Router()
const db = require("../database/db.js")
const mysql = require("mysql2")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('../config/config.js')

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

    db.query("SELECT * FROM `users` WHERE `email` =" +  mysql.escape(req.body.email), function(err, results) {
        if (err) {
            res.status(500)
            res.send("Failure")
            throw err
        }

        if (!results.length) {
            db.query("INSERT INTO users SET ?", post, function(err, result) {
                if (err) {
                    res.status(500)
                    res.send("Failure")
                    throw err
                }
        
                db.query("SELECT * FROM `users` WHERE `email` =" +  mysql.escape(req.body.email), function(err, results) {
                    if (err) {
                        res.status(500)
                        res.send("Failure")
                        throw err
                    }
            
                    let token = jwt.sign({id: results[0].id}, config.secret, {expiresIn: 86400})
                    res.status(200)
                    res.send({auth: true, token: token, user: results[0]})
                })  
            }) 
        } else if (results.length) {
            res.status(200)
            res.send("Exists")
        }
    })         
})





routes.post("/sign-in", function(req, res) {
    let post = {
        email: req.body.email,
        password: req.body.password
    }

    db.query("SELECT *  FROM `users` WHERE `email` = " + mysql.escape(post.email), async function(err, results) {
        if (err) {
            res.status(500)
            res.send("Failed")
            throw err
        }

        if (results.length) {
            let valid = await comparePassword(req.body.password, results[0].password)

            if (!valid) {
                res.status(500)
                return res.send("Failed")
            } else if (valid) {
                let token = jwt.sign({id: results[0].id}, config.secret, {expiresIn: 86400})
                res.status(200)
                return res.send({auth: true, token: token, user: results[0]})
            }
        } else {
            res.status(500)
            res.send("Failed")
        }

        
    })   
})

module.exports = routes



