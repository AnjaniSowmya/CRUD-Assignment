const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'AnjaniSowmya',
    password: 'wtg123@wtg123',
    database: 'studentdb'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connected Successfully');
    else
    console.log('DB connection Failed \n Error : '+JSON.stringify(err,undefined,2));
    /*var sql = "INSERT INTO students (FirstName, LastName) VALUES ('Anjani Sowmya', 'Bollapragada')";
    mysqlConnection.query(sql, function (err, result) {
     if (err) throw err;
     console.log("1 record inserted");
    });*/
});

app.listen(3000, ()=>console.log("Express server is running at port: 3000"));
app.get('/students', (req,res)=>{
    var sql = "SELECT * FROM students";
    mysqlConnection.query(sql, (err, rows, fields)=> {
     if (err) res.send("No records found!");
     res.send(rows);
    });
});

app.get('/students/:regno', (req,res)=>{
    var sql = "SELECT * FROM students WHERE RegistrationNo=?";
    mysqlConnection.query(sql, [req.params.regno], (err, rows, fields)=> {
     if (err) return res.send("No record found!");
     res.send(rows);
    });
});

app.delete('/students/:regno', (req,res)=>{
    var sql = "DELETE FROM students WHERE RegistrationNo=?";
    mysqlConnection.query(sql, [req.params.regno], (err, rows, fields)=> {
     if (err) return res.send("Record not found!");
     res.send("Student successfully deleted!");
    });
});

app.put('/students', (req,res)=>{
    let emp = req.body;
    var sql = "INSERT INTO students (RegistrationNo, FirstName, LastName) VALUES (?, ?, ?)";
    mysqlConnection.query(sql, [emp.regno, emp.fn, emp.ln], (err, rows, fields)=> {
     if (err) return res.send("Insertion failed!");
     res.send("Student successfully added!");
    });
});

app.post('/students', (req,res)=>{
    let emp = req.body;
    var sql = "UPDATE students SET FirstName=?, LastName=? WHERE RegistrationNo=?";
    mysqlConnection.query(sql, [emp.fn, emp.ln, emp.regno], (err, rows, fields)=> {
     if (err) return res.send("Updation failed!");
     res.send("Student successfully updated!");
    });
});