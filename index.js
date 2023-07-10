const express =  require('express');

const booksRelatedRoutes = require('./routes/books');




const app = express();


app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods', "*")
    next();
})

app.use(express.json()); 


app.use('/books',booksRelatedRoutes)


app.listen(9999,()=>{console.log("Server Started at 9999")})