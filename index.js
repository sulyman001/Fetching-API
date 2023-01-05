const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');

const swaggerDocs = require('./swagger');
const connection = require('./connection');
const { query } = require('./connection');

app.use(express.json({extended: false}));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// Get(read all) all Parent 
app.get('/parent', (req,res)=>{
    connection.query("select * from parent", (err, result)=>{
        if (err) {
            res.send('Error');
        } else {
            res.send(result);
        }
    });
});

//Get (read one) 1 from parent
app.get('/parent/:id', (req, res) => {
    connection.query("select * from parent WHERE parent_id = ?", [req.params.id], (err,result) => {
        if(err){res.send('Error');}
        else{res.send(result);}
    });
});

//Create 1 in parent
app.post('/parent/create', (req, res) => {
    let parent = req.body;
    let query = 'insert into parent (parent_id, email, password, Fname, Lname, dob, phone, mobile, status, last_login_date, last_login_ip) values (?,?,?,?,?,?,?,?,?,?,?)';
    connection.query(query,[parent.parent_id, parent.email, parent.password, parent.Fname, parent.Lname, parent.dob, parent.phone, parent.mobile, parent.status, parent.last_login_date, parent.last_login_ip], (err, result) => {
        if(err){return res.status(500);}
        else{return res.status(200).json({message: 'Information successfully added to database'});}
    });
});

//Update 1 from parent
app.patch('/parent/update/:id', (req, res) => {
    let parent = req.body;
    let query = 'update parent set email = ?, password = ?, Fname = ?, Lname = ?, dob = ?, phone = ?, mobile = ?, status = ?, last_login_date = ?, last_login_ip = ? where parent_id = ?';
    console.log(query);
    connection.query(query, [ parent.email, parent.password, parent.Fname, parent.Lname, parent.dob, parent.phone, parent.mobile, parent.status, parent.last_login_date, parent.last_login_ip, Number(req.params.id)], (err, results) => {
        if(err){
            return res.status(500).json(err);
        }
        else{
            if(results.affectedRows == 0){
                return res.status(404).json({message:'Product id is not found'});
            }
            return res.status(200).json({message: 'Product updated Successfully'});
        }
    });
});

//Delete 1 from parent
app.delete('/parent/:id', (req, res) => {
    connection.query("DELETE from parent WHERE parent_id = ?", [req.params.id], (err,result) => {
        if(err){res.send('Error');}
        else{res.send(result);}
    });
});

// Student CRUD
// Get one from Student
app.get('/student/:id', (req, res)=>{
    connection.query("SELECT * FROM student WHERE student_id = ?", [req.params.id], (err, result) => {
        if (err) {res.send('Error');}
        else {res.send(result);}
    });
});

// Get all from student
app.get('/student', (req, res) => {
    connection.query("SELECT * FROM student", (err, result) => {
        if (err) {res.send ('Error');}
        else {res.send(result);}
    });
});

// Update into student
app.patch('/student/update/:id', (req, res) => {
    let student = req.body;
    let query = "UPDATE student set email = ?, password = ?, Fname = ?, Lname = ?, dob = ?, phone = ?, mobile = ?, date_of_join = ?, status = ?, last_login_date = ?, last_login_ip = ?, parent_id = ? where student_id = ?";
    connection.query(query, [student.email, student.password, student.Fname, student.Lname, student.dob, student.phone, student.mobile, student.date_of_join, student.status, student.last_login_date, student.last_login_ip, student.parent_id, Number(req.params.id)], (err, results) => {
        if(err){
            return res.status(500).json(err);
        }
        else{
            if(results.affectedRows == 0){
                return res.status(404).json({message:'Product id is not found'});
            }
            return res.status(200).json({message:'Product updated Successfully'});
        }
    });
});

// Create 1 in student db  
app.post('/student/create', (req, res) => {
    let student = req.body;  
    let query = "insert into student (student_id, email, password, Fname, Lname, dob, phone, mobile, date_of_join, status, last_login_date, last_login_ip, parent_id) values  (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(query, [student.student_id, student.email, student.password, student.Fname, student.Lname, student.dob, student.phone, student.mobile, student.date_of_join, student.status, student.last_login_date, student.last_login_ip, student.parent_id], (err, results) =>{
        if (err){
            return res.status(500);
        }
        else {
            return res.status(200).json({message: 'Information successfully added to database'});
        }
    });
});

// Delete 1 from student db 
// TODO This isn't running yet
app.delete('/student/:id', (req, res) => {
    connection.query("DELETE from student WHERE student_id = ?", [req.params.id], (err, result) => {
        if(err){
            console.log(err);
            res.send('Error');
        }
        else{res.send(result);}
    });
});

// Attendance CRUD
// Get all from attendance
app.get('/attendance', (req,res) => {
    connection.query("SELECT * FROM attendance", (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.send(result);
        }
    });
});

// Get one from attendance
app.get('/attendance/:id', (req, res) => {
    connection.query("SELECT * FROM attendance WHERE student_id = ?", [req.params.id], (err, result) => {
        if (err) {
            res.send('Error');
        } else {
            res.send(result);
        }
    });
});

// Create into attendance
app.post('/attendance/create', (req, res) => {
    let attendance = req.body;
    let query = "insert into attendance (date, student_id, ststus, remark) values (?,?,?,?)";
    connection.query(query, [attendance.date, attendance.student_id, attendance.ststus, attendance.remark], (err, results) => {
        if(err){return res.status(500);}
        else{res.status(200).json({message: 'Information has been successfully updated'});}
    });
});

// Update into attendance
app.patch('/attendance/update/:id', (req, res) => {
    let attendance = req.body;
    let query = "UPDATE attendance set date = ?, ststus = ?, remark = ? WHERE student_id = ?";
    connection.query(query, [attendance.date, attendance.ststus, attendance.remark, Number(req.params.id)], (err, results) => {
        if(err){
            return res.status(500).json(err);
        } else {
            if(results.affectedRows == 0){
                return res.status(404).json({message: 'Product id is not found'});
            }
            return res.status(200).json({message:'Product updated successfully'});
        }
    });
});

// Delete one from database
app.delete('/attendance/:id', (req, res) => {
    connection.query("DELETE from attendance WHERE student_id = ?", [req.params.id], (err, results) => {
        if(err){res.send('Error');}
        else{res.send(results);}
    });
});

// Teacher CRUD
// Create into teacher
app.post('/teacher/create', (req, res) => {
    let teacher = req.body;
    let query = "insert into teacher (teacher_id, email, password, fname, lname, dob, phone, mobile, status, last_login_date, last_login_ip) values (?,?,?,?,?,?,?,?,?,?,?) ";
    connection.query(query, [teacher.teacher_id, teacher.email, teacher.password, teacher.fname, teacher.lname, teacher.dob, teacher.phone, teacher.mobile, teacher.status, teacher.last_login_date, teacher.last_login_ip], (err, results) => {
        if (err){
            return res.status(500);
        } else {
            res.status(200).json({message: 'Information has been successfully updated'});
        }
    });
});

// Get all from teacher
app.get('/teacher', (req,res) => {
    connection.query("select * from teacher", (err, result) => {
        if(err){
            res.send('Error');
        } else {
            res.send(result);
        }
    });
});

// Get one from teacher
app.get('/teacher/:id', (req, res) => {
    connection.query("select * from teacher where teacher_id = ?", [req.params.id], (err, result) => {
        if(err) {
            res.send('Error');
        } else {
            res.send(result);
        }
    });
});

// Update into teacher
app.patch('/teacher/update/:id', (req, res) =>{
    let teacher = req.body;
    let query = "UPDATE teacher set email = ?, password = ?, fname = ?, lname = ?, dob = ?, phone = ?, mobile = ?, status = ?, last_login_date = ?, last_login_ip = ?";
    connection.query(query, [teacher.email, teacher.password, teacher.fname, teacher.lname, teacher.dob, teacher.phone, teacher.mobile, teacher.status, teacher.last_login_date, teacher.last_login_ip, Number(req.params.id)], (err, results) => {
        if(err){
            return res.status(500).json(err);
        } else {
            if(results.affectedRows == 0){
                return res.status(404).json({message: 'Product id is not found'});
            }
            return res.status(200).json({message:'Product updated successfully'});
        }
    });
});

// Delete from teacher
app.delete('/teacher/:id', (req, res) => {
    connection.query("DELETE from teacher WHERE teacher_id = ?", [req.params.id], (err, result) => {
        if(err){res.send('Error');}
        else{res.send(result);}
    });
});



app.listen('5000', () => {console.log('Connection successful on port 5000')});