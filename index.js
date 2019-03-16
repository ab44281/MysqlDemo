const express = require('express');
const mysql = require('mysql');

var app = express();
const bodyparser= require('body-parser');

app.use(bodyparser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeedb'
});

connection.connect((err)=>{
    if(!err)
    console.log('DB connection succeded.');
    else
    console.log('DB connecion failed \n Error:' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, ()=>console.log('Express server is running at port no: 3000..'));

//get all employees
app.get('/employees',(req,res)=>{
    connection.query('SELECT * FROM employee',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

//get all employees by id
app.get('/employees/:id',(req,res)=>{
    connection.query('SELECT * FROM employee WHERE EmpID=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

//delete an employee
app.delete('/employees/:id',(req,res)=>{
    connection.query('DELETE FROM employee WHERE EmpID=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted Successfully....');
        else
        console.log(err);
    });
});

//insert an employees record
app.post('/employees_insert',(req,res)=>{
    connection.query('INSERT INTO employee (Name, EmpCode, Salary) VALUES ("raju",106,10000)',(err,rows,fields)=>{
        if(!err)
        res.send('Record is inserted');
        else
        console.log(err);
    });
});

//update an employees record
app.post('/employees_update',(req,res)=>{
    connection.query('UPDATE employee SET Salary=9 WHERE EmpID=5',(err,rows,fields)=>{
        if(!err)
        res.send('Record is Updated');
        else
        console.log(err);
    });
});