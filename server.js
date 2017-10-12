var express = require('express');
const fs = require('fs');
var app = express();
var compression = require('compression');
var helmet = require('helmet');


let cache = [];// Array is OK!
cache[0] = fs.readFileSync( __dirname + '/passenger.html');
cache[1] = fs.readFileSync(__dirname + '/driver.html' )
cache[2] = fs.readFileSync(__dirname + '/policy.html' )

app.use(compression()); //Compress all routes
app.use(helmet());

app.use(express.static(__dirname + '/images'));
app.get('/passenger', (req,res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send( cache[0] );
});

app.get('/driver', (req,res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send( cache[1] );
});

app.get('/policy',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.send(cache[2]);
})

app.listen(1000,()=>{
    console.log('App running on port 1000')
});