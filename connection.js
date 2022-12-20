const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'class_room',
    password: ''
});

connection.connect((err) => {
    if(err){
        console.log('Connection failed');
    }else{
        console.log('Connection Successful');
    }
});

module.exports = connection;