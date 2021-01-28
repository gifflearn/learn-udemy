const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')
const {success,error} = require('functions')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const members = [
    {
        id:1,
        name:'John'
    },
    {
        id:2,
        name:'Julie'
    },
    {
        id:3,
        name:'Jack'
    }
]

app.get('/api/v1/members/:id',(req,res) => {

    let index = getIndex(req.params.id)

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        res.json(success(members[index])) 
    }
})

app.put('/api/v1/members/:id', (req,res) => {

    let index = getIndex(req.params.id)
    

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        
        let same = false;
        for(let i =0;i < members.length;i++) {
            if (members[i].name == req.body.name && req.params.id != members[i].id) {      
                same = true
                break
            }
        }

        if (same) {
            res.json(error('Name already in use'))
        } else {
            members[index].name=req.body.name
            res.json(success(true))
        }

        res.json(success(members[index])) 
    }


})

app.delete('/api/v1/members/:id',(req,res) => {

    let index = getIndex(req.params.id)
    

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        members.splice(index,1)
        res.json(success(members)) 
    }

})


app.get('/api/v1/members',(req,res) => {
    if(req.query.max != undefined && req.query.max > 0) {
        res.json(success(members.slice(0,req.query.max)))
    } else if(req.query.max != undefined) {
        res.json(error('Wrong Max value'))
    } else {
        res.json(success(members))
    }

})

app.post('/api/v1/members',(req,res) => {
    //res.send(req.body)
    if (req.body.name){
        
        let sameName = false;

        for(let i =0;i < members.length;i++) {
            if (members[i].name == req.body.name) {
               
                sameName = true
                break
            }
        }
        
        if (sameName) {
            res.json(error('Name already in use'))
        } else {
            let member = {
                id:createId(),
                name:req.body.name
            }
            members.push(member)
            res.json(success(members))
        }


    } else { 
        res.json(error('No name value'))
    }
})

app.listen(9090,() => { console.log('Started on port 9090') })

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
