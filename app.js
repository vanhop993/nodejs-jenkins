const express = require("express");
const mysql = require("mysql2");
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    rowsAsArray: true
};
const port = process.env.PORT;

const app = express()
const pool = mysql.createPool(dbConfig);


app.listen(port, async() => {
    pool.query("SELECT 1", (err, _) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log(`connect database success!!`)
        console.log(`listen port ${port}`);
    });
})

app.get("/health-check", (_, res) => {
    res.status(200).send({status: "ok"})
})

app.get("/data/:id", (req,res) => {
    const id = req.params.id
    console.log(id);
    pool.query(`select * from test where id=?`, id, (err, r, fields) => {
        if(err) {
            res.status(500).send({message: "database error"})
        }
        const arr = r[0]
        const result = {}
        fields.forEach((item, index) => {
            let key = item.name;
            result[key] = arr[index];
        });
        res.status(200).send(result)
    }) 
}) 

module.exports = app;
