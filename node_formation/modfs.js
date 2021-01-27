const fs = require('fs'); 

fs.readFile('test.txt','utf-8',(err,data) => {
    if (err)  { 
        console.log(err.message) 
    } else { console.log(data) }
})

fs.writeFile('test.txt','Bye bye','utf-8', (err)=> {
    console.log(err)
})