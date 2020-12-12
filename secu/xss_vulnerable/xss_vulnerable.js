const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const xss = require('xss')

const app = express()
const jsonParser = bodyParser.json()
const password = "pwd"
let values = [];

app.set('views', path.join(__dirname, '/'))
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, './')))

app.get('/', function(req,res){
    res.cookie("Catherine", "Musy")
    res.render('xss.ejs')
})

app.get('/password', function(req,res){
    res.send(password)
})

app.post('/setvalue', jsonParser, function(req,res){
    values.push(xss(req.body.text))
    console.log(values)
    res.json({text:"la requête a fonctionné"})
})

app.get('/getvalue', function(req, res){
    res.send(values)
})
app.listen(3001)