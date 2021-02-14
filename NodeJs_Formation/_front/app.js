// modules
const express=require('express')
const bodyParser=require('body-parser')
const morgan = require ('morgan')('dev')
const twig = require('twig')
const axios = require('axios')

//variables globales
const app = express()
const port = 9090
const fetch = axios.create({
    baseURL: 'http://localhost:9091/api/v1'
  });

//Middlewares
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Routes

// Page d'accueil
app.get('/',(req,res) => {
    //res.sendFile(__dirname+'/views/index.html')
    res.render('index.twig', {
        "name":"lucie"
    })
})
// app.get('/:name',(req,res) => {
//     //res.sendFile(__dirname+'/views/index.html')
//     res.render('index.twig', {
//         name:req.params.name
//     })
// })


// Page affichant tous les memebres
app.get('/members', (req,res) => {
    apiCall(req.query.max ? '/members?max='+req.query.max : '/members',res,(result) => {
        res.render('members.twig', {
            members : result
        })
    })
})

// Page affichant un membre
app.get('/member/:id', (req,res) => {
    apiCall('/members/'+req.params.id,res,(result) => {
        res.render('member.twig', {
            member : result
        })
    })
})

// Lancement de l'application
app.listen(port,() => { console.log('Started on port '+ port) })

// Fonctions
function renderError(res,errMsg) {
    res.render('error.twig',{
        errorMsg: errMsg
    })
}

function apiCall(url, res, next) {
    fetch.get(url)
    .then((response) => {
        if(response.data.status == 'success') {
            next(response.data.result)   
        } else {
            renderError(res,response.data.message)
        }
    })
    .catch((err)=> renderError(res,err.message))
}
