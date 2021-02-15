const express=require('express')
// const expressOasGenerator = require('express-oas-generator'); // utiliser pour generer swagger.json
const swaggerUi = require('swagger-ui-express')
const bodyParser=require('body-parser')
const morgan=require('morgan')('dev') // module permettant de visualiser les requete http
const mysql = require('promise-mysql')

const {success,error, checkAndChange} = require('./assets/functions')

const config = require('./assets/config')
const swaggerDocument = require('./assets/swagger.json')

mysql.createConnection({
    host     : config.db.host,
    database : config.db.database,
    user     : config.db.user,
    password : config.db.password
}).then((db) => {

    console.log('connected as id ' + db.threadId);

    const app = express()
    // expressOasGenerator.init(app, {}); // utiliser pour generer swagger.json

    let MembersRouter = express.Router()
    let Members = require('./assets/classes/members-class')(db, config)
    // console.log(Members.getConfig())

    app.use(morgan)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(config.rootAPI+'api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    MembersRouter.route('/:id')

        // get un membre avec son id
        .get(async (req,res) => {           
            let member = await Members.getByID(req.params.id)
            res.json(checkAndChange(member))
        })

        // update un membre avec son id
        .put(async (req,res) => {
            let UpdMember = await Members.update(req.params.id, req.body.name)
            res.json(checkAndChange(UpdMember))
        })

        // supprimer un membre avec son id
        .delete(async (req,res) => {
            let delMember = await Members.delete(req.params.id)
            res.json(checkAndChange(delMember))
        })

    MembersRouter.route('/')

        // get tous les membres
        .get(async (req,res) => {
            let allMembers = await Members.getAll(req.query.max)
            res.json(checkAndChange(allMembers))
        })

        // Ajouter un membre
        .post(async (req,res) => {
            //res.send(req.body)
            let addMember = await Members.add(req.body.name)
            res.json(checkAndChange(addMember))
        })

    app.use(config.rootAPI+'members',MembersRouter)
    app.listen(config.port,() => { console.log('Started on port '+config.port) })



}).catch((err) => {
    console.error('error connecting: ' + err.message);
})