const express =  require('express');
const appForbooks = express.Router();
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'vaibhav'
   });


//GET = SELECT FROM DB
appForbooks.get("/", (request, response)=>{
  
    connection.query("select * from books", (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})


appForbooks.post("/", (request, response)=>{
   

    var query = 
    `insert into books values(${request.body.id}, '${request.body.bookName}','${request.body.author}', '${request.body.bookType}', ${request.body.price}, '${request.body.publishDate}', '${request.body.language}' )`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

//PUT = UPDATE INTO DB
appForbooks.put("/:id", (request, response)=>{
    //response.send("EMPS PUT IS CALLED");
    var query = 
    `update books set bookName = '${request.body.bookName}',
                    author = '${request.body.author}', bookType = '${request.body.bookType}', price = ${request.body.price}, publishDate = '${request.body.publishDate}', language = '${request.body.language}' where id = ${request.params.id}`;

    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})



module.exports = appForbooks;