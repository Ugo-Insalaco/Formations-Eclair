const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const app = express()

app.use(cookieParser("secret"))

app.get('/', function(req, res){
    res.send("Formation cookie")
})

app.get('/getcookies', function(req, res){
    res.send(JSON.stringify({
        cookies: req.cookies,
        signed_cookies: req.signedCookies
        }
    ))
})

app.get('/setcookies', function(req,res){
    res.cookie("Gregory", "Vial")
    res.cookie("Nicolas", "Hourcade", {signed: true})
    res.send("Le cookie est set")
})

app.get('/clearcookies', function(req,res){
    res.clearCookie("Gregory")
    res.clearCookie("Nicolas")
    res.send('les cookies ont été enlevés')
})

app.get('/sign_cookie', function(req,res){
    const token = jwt.sign({prenom:'Pietro', nom:'Salizonni'}, 'cle_secrete')
    res.cookie('identite', token)
    res.send('le cookie est crypté')
})

app.get('/decode_cookie', function(req,res){
    jwt.verify(req.cookies.identite, 'cle_secrete', function(err,decoded){
        if(err){
            res.send('Le cookie n\'a pas été décodé')
        }
        else{
            res.send('le cookie contient : '+JSON.stringify(decoded))//=> {prenom: 'Pietro', nom: 'Salizonni'}
        }
    })
})
app.listen(3000);