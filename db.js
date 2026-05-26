const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'Localhost',
    user: 'root',
    password: 'esthefani1412', 
    database: 'TodoList'
});

conexion.connect((err) => {
    if (err) {
        console.log('Error de conexión:', err);
    } else {
        console.log('Conectado a MySQL');
    }
});

module.exports = conexion;