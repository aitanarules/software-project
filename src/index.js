//Esto es el inicio
//Express es un framework de javascript para construir servidores

const http = require('http'); //modulo http d nodejs para construir servidores
const path = require('path'); //módulo path une directorios
const express = require('express'); // almaceno la funcionalidad de express 
const socketio = require('socket.io'); //módulo que permite hacer conexiones en tiempo real, pero el servidor debe exisitr ya

const app = express(); //devuelve un objeto de js, construye un servidor
const server = http.createServer(app); // devuelve un servidor
const io =  require('socket.io')(server); //tengo conexión en tiempo real con sockets y escucha a http

//setings
app.set('port', process.env.PORT||3000); // establezco un puerto que es el que me da el SO o el 3000

require('./public/js/sockets')(io); // import y ejecuto un módulo que está en sockets y le paso como parámetro io


// console.log(path.join(__dirname, 'public')); //permite hacerlo mulitplatarforma el join
// archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); //envía la carpeta public al usuario cuando entra

//el servidor se inicializa
server.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'))
});//construye un puerto del computador para que espere llamadas
// para facilitar las nuevas actualizaciones --> npm install nodemon -D