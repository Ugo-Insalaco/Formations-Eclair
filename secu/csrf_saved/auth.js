const jwt = require('jsonwebtoken')
const config = require('./config')

const auth = function(req,res, next, csrf = false){
    const cookies = req.cookies
    if(cookies["auth_cookie"]){
        jwt.verify(req.cookies["auth_cookie"], config.jwt_key, function(err, decoded){
            if(err){
                res.send('Le cookie n\'a pu être décodé')
            }
            else{
                const csrf_token = req.get("X-csrf-token")
                if(!csrf || decoded.id ===csrf_token){
                    req.decoded = decoded
                    next()
                }         
                else{
                    res.status(401).send("erreur csrf")
                }
            }
            
        })
        res.status(401).send()
    }
    else{
        res.status(401).send()
    }
}

module.exports = auth