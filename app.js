const mongoose = require('mongoose');
const express = require('express');
const productRouters = require('./routers/web');
const app = express();
var bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017'
const dbName = "Computer";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(`${url}/${dbName}`)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(9999, ()=>{
        console.log("Server is running on port 9999");
    })
})
.catch((err)=>{
    console.error(err);
})

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'hbs');
app.use('/upload', express.static('upload'));
app.use('/', productRouters);