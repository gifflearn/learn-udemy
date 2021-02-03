const mysql = require ('mysql')
const db = mysql.createConnection({
    host     : 'localhost',
    database : 'nodejs',
    user     : 'root',
    password : ''
  });

  db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.message);
        return;
    } else {
        console.log('connected as id ' + db.threadId);

        //

        db.query({
            sql: 'SELECT * FROM `members` WHERE `id` = ?',
            //sql: 'INSERT INTO members(name) VALUES(?)',
            timeout: 40000, // 40s
          },
          ['1'],
          //['John'],
          (error, results) =>  {
            // error will be an Error if one occurred during the query
            if (err) console.log(err.message)
            // results will contain the results of the query
            else console.log(results[0].name)
          }
        );

    }
   
    
  });