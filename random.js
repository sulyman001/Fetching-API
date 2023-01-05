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

//Delete 1 from parent
app.delete('/parent/:id', (req, res) => {
    connection.query("DELETE from parent WHERE parent_id = ?", [req.params.id], (err,result) => {
        if(err){res.send('Error');}
        else{res.send(result);}
    });
});