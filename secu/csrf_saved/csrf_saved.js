const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const auth = require('./auth')
const path = require('path')
const config = require("./config")

const app = express()

const prenom = 'Gilles'
const nom = 'Robert'
const id = '42'

app.set('views', path.join(__dirname, '/'))
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, './')))

app.use('/', cookieParser())

app.get('/login', function(req, res){
    token = jwt.sign({prenom: prenom, nom: nom, id: id}, config.jwt_key, {expiresIn: 3000})
    res.cookie('auth_cookie', token)
    res.send(id)
})

app.get('/login_page', function(req,res){
    res.render("login.ejs")
})

app.get('/logout', function(req,res){
    res.clearCookie('auth_cookie')
    res.send('user bien logout')
})

app.get('/logged', auth, function(req, res){
    res.send('Vous êtes loggé et vous êtes : '+req.decoded.prenom+' '+req.decoded.nom)
})

app.get('/page', auth, function(req, res){
    res.render("page.ejs")
})

app.use('/virement', function(req,res, next){
    auth(req, res, next, true)
})
app.get('/virement/:uid1/:uid2', function(req,res){
    res.send('Je fais le virement de '+req.params.uid1+' vers '+req.params.uid2)
})



app.listen(3003)