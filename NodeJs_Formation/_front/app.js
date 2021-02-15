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
    res.redirect('/members')
})

// Page affichant tous les memebres
app.get('/members', (req,res) => {
    apiCall(req.query.max ? '/members?max='+req.query.max : '/members','get',{},res,(result) => {
        res.render('members.twig', {
            members : result
        })
    })
})

// Page affichant un membre
app.get('/member/:id', (req,res) => {
    apiCall('/members/'+req.params.id,'get',{},res,(result) => {
        res.render('member.twig', {
            member : result
        })
    })
})

// pageS de modifications
app.get('/edit/:id', (req,res) => {
    apiCall('/members/'+req.params.id,'get',{},res,(result) => {
        res.render('edit.twig', {
            member : result
        })
    })
})

app.post('/edit/:id', (req,res) => {
    apiCall('/members/'+req.params.id,'put',{
            name:req.body.name
        }
        ,res,() => {
            res.redirect('/members')
    })
})

// Page de suppression
app.post('/delete', (req,res) => {
    apiCall('/members/'+req.body.id,'delete',{},res,() => {
            res.redirect('/members')
    })
})

// pageS d'ajout
app.get('/insert', (req,res) => {
        res.render('insert.twig')
})

app.post('/insert', (req,res) => {
    apiCall('/members/','post',{
            name:req.body.name
        }
        ,res,() => {
            res.redirect('/members')
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

function apiCall(url, method, data,  res, next) {
    fetch({
        method: method,
        url:url,
        data:data
    })
    .then((response) => {
        if(response.data.status == 'success') {
            next(response.data.result)   
        } else {
            renderError(res,response.data.message)
        }
    })
    .catch((err)=> renderError(res,err.message))
}
