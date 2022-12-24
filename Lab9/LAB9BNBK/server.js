const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const mysql = require('mysql2')

app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
        host:"127.0.0.1",
        user:"root",
        password:"",
        database:"imi62231"
})

db.connect((err)=>{
    if(err){err}
    console.log("MySQL connected")
})

app.get('/', (req, res) => {
    res.send('Hello Backend ')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

app.get('/getUsers', (req, res) => {
    db.query("SELECT * FROM users",(error,results,fields)=>{
        if(error) throw error
        if(results.length==0 || results===undefined) 
            message ="Table users is emty !"
        else
            message = "Get users succesfuly.";
        res.status(200).send({error:false,data:results,msg:message})
    })
})
app.get('/checkUsername', (req, res) => {
    //ถ้าเจอข้อมูลให้ return msg = CannotUse
    //ถ้าไม่เจอข้อมูลให้ return msg = CanUse
})
