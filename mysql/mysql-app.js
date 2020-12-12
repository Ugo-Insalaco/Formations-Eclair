const express = require('express')
const mysql = require('mysql')

const pool = mysql.createPool({
  host            : 'localhost',
  user            : 'mysql-app',
  password        : 'pwd',
  database        : 'rebonjour'
})

const app = express()

app.get('/', function(req, res){
    pool.query('SELECT* FROM salutations', function(err, results, fields){
        if(err){
            res.status(500).send('Erreur interne du serveur')
        }
        else{
            res.status(200).send(results)
        }
    })
    
})

app.get('/addSalutation/:text', function(req, res){
    pool.getConnection(function(err, con){
        if(err){
            res.status(500).send('La connection n\'a pas pu se faire')
        }
        else{
            con.beginTransaction(function(err){
                if(err){
                    res.status(500).send('La transaction n\' pas pu s\'initialiser')
                }
                else{
                    sqlstring = "INSERT INTO salutations (text) VALUES ('" + [req.params["text"]] + "');"
                    con.query(sqlstring, function(err, results, fields){
                        if(err){
                            return con.rollback(function(){
                                throw err
                                res.status(500).send('La connextion a été rollback')
                            })
                        }   
                        else{
                            con.commit(function(err){
                                if(err){
                                    return con.rollback(function(){
                                        res.status(500).send('La connexion n\'a pas pu se commit')
                                    })
                                }
                                else{
                                    res.status(200).send("L'ajout de données est un succès")
                                }
                            })
                        }      
                    })
                }
            })
        }
    }) 
})

app.get('/getId/:i', function(req,res){
    pool.query('SELECT * FROM salutations WHERE id=?', [req.params["i"]], function(err, results, fields){
        if(err){
            res.status(500).send('Erreur interne du serveur')
        }
        else{
            res.send(results)
        }
    })
})
app.listen(3000)