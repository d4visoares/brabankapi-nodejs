const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'ec2-3-86-9-174.compute-1.amazonaws.com',
    port:3306,
    user:'davi',
    password:'bcd254',
    database:'brabank'
})

module.exports = con