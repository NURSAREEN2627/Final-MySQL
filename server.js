const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const mysql = require('mysql2')

app.use(cors())
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

/* Connect to database */
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "myprince"
})

db.connect((err) => {
    if (err) { err }
    console.log("MySQL connected")
})

app.get('/', (req, res) => {
    res.send('Hello Backend ')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

app.get('/getUsers', (req, res) => {
    let message = "";
    db.query("SELECT * FROM studentlists", (error, results, fields) => {
        if (error)
            console.log(error);
        if (results.length == 0 || results === undefined)
            message = "Table users is emty !";
        else
            message = "Get users succesfuly.";
        // res.status(200).send({ error: false, data: results, msg: message })
            res.json(results)
    })
})

app.post('/getUserByID', (req, res) => {
    let object = req.body;
    console.log(object);
    db.query(
        'SELECT * FROM users WHERE userID = ?',
        [object.userID],
        function (err, results) {
            if (err)
                console.log(err);

            if (results.length == 0 || results === undefined) {
                message = "Selected";
            } else {
                message = "Not have user";
            }
            res.status(200).send({ error: false, data: results, msg: message });
        }
    );
})

app.post('/checkUsername', (req, res) => {
    let object = req.body;
    db.query(
        'SELECT * FROM users WHERE username = ?',
        [object.username],
        function (err, results) {
            if (err)
                console.log(err);

            console.log(results);
            if (results.length == 0 || results === undefined) {
                message = "CanUse";
            } else {
                message = "CannotUse";
            }
            res.status(200).send({ error: false, data: req.body, msg: message });
        }
    );
})

app.post('/addNew', (req, res) => {
    let object = req.body;
    db.query(
        'INSERT INTO studentlists (Student_ID, First_Name, Last_Name, Username, Major, Ability, Kingdom, Phone_Number, Grade) VALUES (?,?,?,?,?,?,?,?,?)',
        [object.Student_ID,
            object.First_Name,
            object.Last_Name,
            object.Username,
            object.Major,
            object.Ability,
            object.Kingdom,
            object.Phone_Number,
            object.Grade
        ],
        function (err, results) {
            if (err)
                console.log(err);

            // console.log(results);
            if (results) {
                message = "inserted";
            } else {
                message = "CannotInsert";
            }
            res.status(200).send({ error: false, data: results, msg: message });
        }
    );
})

app.put('/updateuser', (req, res) => {
    let object = req.body;
    db.query(
        'UPDATE studentlists SET First_Name=?, Last_Name=?, Username=?, Major=?, Ability=?, Kingdom=?, Phone_Number=?, Grade=? WHERE Student_ID = ? ',
        [
            object.First_Name,
            object.Last_Name,
            object.Username,
            object.Major,
            object.Ability,
            object.Kingdom,
            object.Phone_Number,
            object.Grade,
            object.Student_ID
        ],
        function (err, results) {
            if (err)
                console.log(err);

            if (results) {
                message = "updated";
            } else {
                message = "CannotUpdate";
            }
            res.status(200).send({ error: false, data: results, msg: message });
        }
    );
})

app.delete('/deleteuser', (req, res) => {
    let object = req.body;
    db.query(
        'DELETE FROM studentlists WHERE Student_ID = ? ',
        [
            object.Student_ID
        ],
        function (err, results) {
            if (err)
                console.log(err);

            if (results) {
                message = "Deleted";
            } else {
                message = "CannotDeleted";
            }
            res.status(200).send({ error: false, data: results, msg: message });
        }
    );
})