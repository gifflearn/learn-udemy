const http = require('http')
const fs = require('fs')

http.createServer((req,res)=> {

    if (req.url == '/') {
        res.writeHead(200, {
            'Content-type':'text/html'
            })
        res.write("<h1>Accueil</h1>");
        res.end();
    } else if (req.url == '/texte')  {
        
        fs.readFile('test.txt','utf-8',(err,data) => {
            if (err)  { 
                send404()
            } else { 
                res.writeHead(200, {'Content-type':'text/html'})
                res.write(data)
                res.end();
            }
        })

    } else {
        send404(res);
    }

}).listen(8282)

function send404(res ) {
    res.writeHead(404, {'Content-type':'text/html'})
    res.write("<span style='color:red'>Erreur 404<span>");
    res.end();
}