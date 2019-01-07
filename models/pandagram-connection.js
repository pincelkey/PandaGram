let mysql = require('mysql'),
    config = require('./db-config'),
    connection = mysql.createConnection(config.mysql)

//connection
connection.connect((err)=>{
    (err) ? console.log(`Error en la conexión a la BD, ${err.stack}`) : console.log(`Conexión exitosa, ${connection.threadId}`) 
})

module.exports = connection