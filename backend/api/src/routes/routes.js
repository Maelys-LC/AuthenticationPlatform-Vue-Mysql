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

routes.use("/sign-up", function(req, res, next) {
    db.query("SELECT * FROM `users` WHERE `name` =" + mysql.escape(req.body.name), function(err, results) {
        if (err) {
            res.status(500)
            res.send("Failure")
        }

        if (!results.length) {
            next()
        } else {
            res.status(200)
            res.send("Name exists")
        }
    })
})


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
            
                    let token = jwt.sign({id: results[0].id, name: results[0].name}, config.secret, {expiresIn: 86400})
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
    db.query("SELECT *  FROM `users` WHERE `email` = " + mysql.escape(req.body.email), async function(err, results) {
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
                let token = jwt.sign({id: results[0].id, name: results[0].name}, config.secret, {expiresIn: 86400})
                res.status(200)
                return res.send({auth: true, token: token, user: results[0]})
            }
        } else {
            res.status(500)
            res.send("Failed")
        }

        
    })   
})

routes.use("/delete/:id", function(req, res, next) {
    let verified = jwt.verify(req.headers.token, config.secret)

    if(req.params.id == verified.id && Date.now()/1000 <= verified.exp) {
        next()
    } else {
        res.status(403)
        res.send()
    }
})   

routes.delete("/delete/:id", function(req, res) {
    db.query("DELETE FROM `users` WHERE `id` =" + mysql.escape(req.params.id), function(err, result){
        if(err) {
            res.status(500)
            res.send("Failure")
            throw err
        } else {
            res.status(200)
            res.send("Success")
        }
    })
})





routes.use("/add-new-contact", function(req, res, next){
    let verified = jwt.verify(req.headers.token, config.secret)
    
    if(req.body.user_affiliate === verified.id && Date.now()/1000 <= verified.exp) {
        next()
    } else {
        res.status(403)
        res.send()
    }
})

 

routes.post("/add-new-contact", function(req, res) {
    let post = {
        name: req.body.name,
        email: req.body.email,
        user_affiliate: req.body.user_affiliate
    }
    db.query("CREATE TABLE IF NOT EXISTS `contacts` (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, email varchar(255) NOT NULL, user_affiliate varchar(255) NOT NULL)")
    db.query("INSERT INTO contacts SET ?", post, function(err, results) {
        if (err) {
            res.status(500)
            res.send("Failure")
            throw err
        } else {
            res.status(200)
            res.send("Success")
        }
    })
    
})


routes.use("/get-contacts/:id", function(req, res, next) {
    let verified = jwt.verify(req.headers.token, config.secret)

    if(req.params.id == verified.id && Date.now()/1000 <= verified.exp) {
        next()
    } else {
        res.status(403)
        res.send()
    }
})   

routes.get("/get-contacts/:id", function(req, res) {
    db.query("SELECT contacts.name, contacts.email, contacts.id, contacts.user_affiliate FROM `contacts` INNER JOIN `users` ON contacts.user_affiliate = users.id WHERE `user_affiliate` =" + mysql.escape(req.params.id), function(err, results) {
        if (err) {
            res.status(500)
            res.send("Failure")
            throw err
        } else {
            res.status(200)
            res.send(results)
        }
    })
})



routes.use("/deletingSingleContact", function(req, res, next){
    let verified = jwt.verify(req.headers.token, config.secret)
    
    if(req.body.user_affiliate === verified.id && Date.now()/1000 <= verified.exp) {
        next()
    } else {
        res.status(403)
        res.send()
    }
})

routes.post("/deleteSingleContact", function(req, res) {
    db.query(`DELETE FROM contacts WHERE name = ${mysql.escape(req.body.name)} AND email = ${mysql.escape(req.body.email)} AND user_affiliate = ${mysql.escape(req.body.user_affiliate)}` , function(err, result) {
        if (err) {
            res.status(500)
            res.send("Failure")
            throw err
        } else {
            res.status(200)
            res.send("Contact deleted successfully")
        }
    })
})

routes.use("/deleteAllContacts/:id", function(req, res, next) {
    let verified = jwt.verify(req.headers.token, config.secret)

    if(req.params.id == verified.id && Date.now()/1000 <= verified.exp) {
        next()
    } else {
        res.status(403)
        res.send()
    }
})

routes.delete("/deleteAllContacts/:id", function(req, res) {
    db.query(`DELETE FROM contacts WHERE user_affiliate = ${mysql.escape(req.params.id)}`, function(err, result) {
        if (err) {
            res.status(500)
            res.send("Failure")
            console.log("test");
            throw err
        } else {
            res.status(200)
            res.send("Contacts deleted successfully")
        }
    })
})


module.exports = routes



