// io se define en index.js
// este archivo hace mi applicación más modular y escalable
module.exports = function(io){
    io.on('connection', socket=>{
        console.log('Un nuevo usuario conectado!'); //espera a escuchar cuando haya unanueva conexión de sockets
    });
}