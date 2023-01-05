// Classroom_student CRUD

const connection = require("./connection");

// Get all 
app.get('/classroom_student', (req, res) => {
    connection.query("select * from classroom_student", (err, result) => {
        if(err) {
            res.send('Error');
        } else {
            res.send(result);
        }
    });
});

// Get one 
app.get('/classroom_student/:id', (req, res) => {
    connection.query("select * from classroom_student where classroom_student_id = ?", [req.params.id], (err, result) => {
        if(err){
            res.send('Error');
        } else {
            res.send(result);
        }
    });
});

// Create
app.post('/classroom/create', (req, res) => {
    let classroom_student = req.body;
    let query = "insert into classroom_student (classroom_student_id, "
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