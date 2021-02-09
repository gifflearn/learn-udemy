const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')('dev') // module permettant de visualiser les requete http
const {success,error} = require('./assets/functions')
const mysql = require('promise-mysql')

const config = require('./assets/config')

mysql.createConnection({
    host     : config.db.host,
    database : config.db.database,
    user     : config.db.user,
    password : config.db.password
}).then((db) => {

    console.log('connected as id ' + db.threadId);

    const app = express()

    let MembersRouter = express.Router()
    let Members = require('./assets/classes/members-class')(db, config)
    // console.log(Members.getConfig())

    app.use(morgan)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    MembersRouter.route('/:id')

        // get un membre avec son id
        .get((req,res) => {

            db.query('SELECT * FROM members WHERE id = ?',[req.params.id], (err,results) => {
                if (err) {
                    res.json(error(err.message))
                } else {
                    if (results[0] != undefined) {
                        res.json(success(results[0]))
                    } else {
                        res.json(error('Undefined Id'))
                    }
                   
                }
            })
        })

        // update un membre avec son id
        .put((req,res) => {

            if (req.body.name) {

                db.query('SELECT * FROM members WHERE id = ?',[req.params.id], (err,results) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        if (results[0] != undefined) {
                            db.query('SELECT * FROM members WHERE name = ? AND id != ?',[req.body.name,req.params.id],(err,results) => {
                                if (err) {
                                     res.json(error(err.message))
                                } else {
                                     if (results[0] != undefined) {
                                        res.json(error('Name already in use'))
                                     } else {
                                        // update
                                        db.query('UPDATE members set name = ? WHERE id = ?',[req.body.name,req.params.id],(err,results) => {
                                            if (err) {
                                                res.json(error(err.message))
                                           } else {
                                               res.json(success(true))
                                           }
                                        })
                                     }
                                }
                            })

                        } else {
                            res.json(error('Undefined Id'))
                        }
                       
                    }
                })



            } else {
                res.json(error('Noname value'))
            }

        })

        // supprimer un membre avec son id
        .delete((req,res) => {

            
            db.query('SELECT * FROM members WHERE id = ?',[req.params.id], (err,results) => {
                if (err) {
                    res.json(error(err.message))
                } else {
                    if (results[0] != undefined) {
                        // delete
                        db.query('DELETE FROM members WHERE id = ?',[req.params.id],(err,results) => {
                            if (err) {
                                res.json(error(err.message))
                           } else {
                               res.json(success(true))
                           }
                        })

                    } else {
                        res.json(error('Undefined Id'))
                    }
                   
                }
            })

        })

    MembersRouter.route('/')

        // get tous les membres
        .get((req,res) => {
            if(req.query.max != undefined && req.query.max > 0) {
                
                db.query('SELECT * FROM members LIMIT 0, ?',[req.query.max], (err,results) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(results))
                    }
                })

            } else if(req.query.max != undefined) {
                res.json(error('Wrong Max value'))
            } else {

                db.query('SELECT * FROM members', (err,results) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(results))
                    }
                })
            }

        })

        // Ajouter un membre
        .post((req,res) => {
            //res.send(req.body)
            if (req.body.name){
                
               
               db.query('SELECT * FROM members WHERE name = ?',[req.body.name],(err,results) => {
                   if (err) {
                        res.json(error(err.message))
                   } else {
                        if (results[0] != undefined) {
                            res.json(error('Name already in use'))
                        } else {

                            db.query('INSERT INTO members(name) VALUES(?)',[req.body.name],(err,results) => {
                                if (err) {
                                    res.json(error(err.message))
                               } else {
                                    db.query('SELECT * FROM members WHERE name = ?',[req.body.name],(err,results) => {
                                        if (err) {
                                            res.json(error(err.message))
                                        } else {
                                            res.json(success({
                                                id: results[0].id,
                                                name: results[0].name
                                            }))
                                        }
                                    })
                               }
                            })

                        }
                   }

               })
               


            } else { 
                res.json(error('No name value'))
            }
        })

    app.use(config.rootAPI+'members',MembersRouter)
    app.listen(config.port,() => { console.log('Started on port '+config.port) })



}).catch(() => {
    console.error('error connecting: ' + err.message);
})




function getIndex(id) {
    for( let i =0; i< members.length; i++) {
        if(members[i].id == id) {
            return i
        }
    }
    return 'Wrong id'
}

function createId() {

return members[members.length-1].id +1 
}
