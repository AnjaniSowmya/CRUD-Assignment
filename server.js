const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.static('.'));

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
});

app.listen(8080, ()=>console.log("Express server is running at port: 8080"));

// C Read U D
app.get('/students', (req,res)=>{
    var sql = "SELECT * FROM students";
    mysqlConnection.query(sql, (err, rows, fields)=> {
     if (err) res.send("No records found!");
     res.send(rows);
    });
});

// C Read U D
app.get('/students/:regno', (req,res)=>{
    var sql = "SELECT * FROM students WHERE RegistrationNo=?";
    mysqlConnection.query(sql, [req.params.regno], (err, rows, fields)=> {
     if (err) return res.send("No record found!");
     res.send(rows[0]);
    });
});

// C R U Delete
app.delete('/students/:regno', (req,res)=>{
    var sql = "DELETE FROM students WHERE RegistrationNo=?";
    mysqlConnection.query(sql, [req.params.regno], (err, rows, fields)=> {
     if (err) return res.send("Record not found!");
     res.send("Student successfully deleted!");
    });
});

// Create R U D
app.post('/students/register', (req,res)=>{
    let stud = req.body;
    var sql =
        "INSERT INTO students \
        (RegistrationNo, FirstName, LastName, DateOfBirth, \
         EmailID, MobileNo, Gender, College, Course, Branch, \
         YearOfStudy, YearOfJoin) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    mysqlConnection.query(sql,
        [
            stud.regno,
            stud.fn,
            stud.ln,
            stud.dob,
            stud.email,
            stud.mob,
            stud.gender,
            stud.clg,
            stud.course,
            stud.branch,
            stud.yos,
            stud.yoj
        ], 
        (err, result)=> {
            if (err || (!result.affectedRows)) return res.status(500).send({"res": "Insertion failed!"});
            res.send({"res": "Student successfully added!"});
        });
});

// C R Update D
app.post('/students/update', (req,res)=>{
    let stud = req.body;
    var sql =
        "UPDATE students \
        SET FirstName=?, LastName=?,  DateOfBirth=?, EmailID=?, \
        MobileNo=?, Gender=?, College=?, Course=?, Branch=?, \
        YearOfStudy=?, YearOfJoin=? WHERE RegistrationNo=?";
    mysqlConnection.query(sql,
        [
            stud.fn,
            stud.ln,
            stud.dob,
            stud.email,
            stud.mob,
            stud.gender,
            stud.clg,
            stud.course,
            stud.branch,
            stud.yos,
            stud.yoj,
            stud.regno
        ], 
        (err, result)=> {
            if (err || (!result.affectedRows)) return res.status(500).send({"res": "Updation failed!"});
            res.send({"res": "Student successfully updated!"});
        });
});