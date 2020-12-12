const jwt = require('jsonwebtoken')
const config = require('./config')

const auth = function(req,res, next){
    const cookies = req.cookies
    if(cookies["auth_cookie"]){
        jwt.verify(req.cookies["auth_cookie"], config.jwt_key, function(err, decoded){
            if(err){
                res.send('Le cookie n\'a pu être décodé')
            }
            else{
                req.decoded = decoded
                next()
            }
            
        })
        res.status(401).send()
    }
    else{
        res.status(401).send()
    }
}

module.exports = auth