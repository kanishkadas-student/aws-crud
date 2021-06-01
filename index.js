const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: 'password',
    database: 'db1'
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection succeded.');
    else    
        console.log('DB connection failed \n Error : '+ JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=> console.log('Express server is running at port no : 3000'));

// get all users
app.get('/users',(req,res) => {
    mysqlConnection.query('SELECT * FROM user',(err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });
});

// get specific user
app.get('/users/:id',(req,res) => {
    mysqlConnection.query('SELECT * FROM user WHERE userid = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    });
});

// Delete specific user
app.delete('/deleteuser/:id',(req,res) => {
    mysqlConnection.query('DELETE from user WHERE userid = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
            res.send("Deleted Successful.....");
        else
            console.log(err);
    });
});

// Insert specific data
app.post('/adduser', function (req, res) {
    var postData  = req.body;
    mysqlConnection.query('INSERT INTO user SET ?', postData, function (error, results, fields) {
        if (!error) 
            res.send('User Added Successfully.....');
        else
            res.send(error);
     });
 });

 //Update User Data
 app.put('/updateuser', function (req, res) {
    mysqlConnection.query('UPDATE user SET name=?,department=? WHERE userid=?', [req.body.name, req.body.department, req.body.userid], function (error, results, fields) {
        if (!error) 
        res.send('User Updated Successfully.....');
    else
        res.send(error);
 });
});
