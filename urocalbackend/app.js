//--- BIBLIOTECAS
const express = require("express");
const cors = require("cors");   
const path = require("path");         

const indexRouter = require('./routes/index');
//const {} = require('./middlewares');

const app = express();

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));                              
app.use(express.urlencoded({ extended: true }));         
app.use(express.json());  


app.use('/', indexRouter); 
//app.use(express.static(__dirname + "/public"));        
//app.use((req, res, next) => {res.status(404).sendFile(__dirname + "/../public/404.html");});
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);

module.exports = app;