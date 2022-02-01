const { Client } = require('pg');
const express = require('express')
var bodyparser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()
app.use(bodyparser.urlencoded({
    extended : true
}))
//creating template

app.set('view engine','ejs')
const client = new Client({
    user: 'iwxotojeplpkrb',
    host: 'ec2-54-209-221-231.compute-1.amazonaws.com',
    database: 'd4a658c6bjj6ua',
    port: 5432,
    password: '3da30e7be0acbecc4009224576c860fdeb37b68002dfd895e5a3bb138a587776',
    ssl:{
        rejectUnauthorized : false
    }
    
});

client.connect();

app.get("/", function(req,res){
    res.send("Welcome to my database application!")
})

//create table
app.get("/create" , function(req,res){
    const query = "CREATE TABLE users (name varchar(50) , email varchar(50), age int)"

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Table successfully created');
        client.end();
    })
    res.send("Table created successfully!")
    
})

//add data
app.get("/adddata",function(req,res){
    const queryI = "INSERT INTO users (name,email,age) VALUES ('ashmita', 'ashmita@gmail.com', 22)"

    client.query(queryI, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data inserted successfully!');
        
    });
    res.send("Data added successfully!")
})

//retrieve data
app.get("/select" , function(req,res){
    var selectQuery = "select * from users"

    client.query(selectQuery, function(err, result){
        if(err)
        {
            console.log("Err in select query")
            return
        }
        var htmlContent = ""
        
        if( result.rowCount > 0 )
        {            
            for( var tempRow of result.rows )
            {
                htmlContent = htmlContent + tempRow.name+ "</br>"
            }
            res.send(htmlContent)
        }
        else{            
            res.send("No information is retrieved")
            return
        }
    })      
})


app.listen(port,function(err,result){
    console.log("Server started");
})