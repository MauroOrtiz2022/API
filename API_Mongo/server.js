var express = require('express'),   
app = express(),   
port = process.env.PORT || 3000,   
mongoose = require('mongoose'),   
Libro = require('./api/models/LibroModel'), 

bodyParser = require('body-parser');    

mongoose.Promise = global.Promise; mongoose.connect('mongodb://localhost/miinstanciaDB');    
app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.json());   var routes = 
require('./api/routes/LibroRoutes'); 

routes(app); 

app.listen(port);   
console.log('Servidor para RESTful API iniciada en puerto 3000: ' + port);