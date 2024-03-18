// io se define en index.js
// este archivo hace mi applicación más modular y escalable

module.exports = function(io){

    //forma sencilla de incluir usuarios
    let nicknames = [];

    io.on('connection', socket=>{
        console.log('Un nuevo usuario conectado!'); //espera a escuchar cuando haya unanueva conexión de sockets
    
        socket.on('new user', (data, callback) =>{
            // console.log(data); //comprobar que el servidor funciona 
            if (nicknames.indexOf(data)!=-1){ //devuelve el índice para el cual coincide con el data en el array
                callback(false);
            }else{
                callback(true); //es válido el nickname
                socket.nickname = data;
                nicknames.push(socket.nickname); //agrego el nuevo usuario en memoria
                // io.sockets.emit('usernames', nicknames);//-->lo ponemos en otra función más abajo
                updateNicknames();
            }


        });
    socket.on('send message', function (data){ // cuando el servidor reciba este mensaje, debe estar atento a reibir datos
    
        // console.log(data); //aquì recibo el dato
        // debo retransmitirlo a todos los usuarios con io pq está conectado a todos los sockets
        io.sockets.emit('new message', {
            msg: data, 
            nick: socket.nickname

        }) //cuando recibo a trvés de send message, envío datos con otro evento
    });

    socket.on('disconnect', data=>{
        if(!socket.nickname) return; // si socket no tiene propiedad llamada nickname
        nicknames.splice(nicknames.indexOf(socket.nickname), 1); //método que permite quitar un solo elemento indicando el índice
        updateNicknames();

    });

    function updateNicknames(){
        io.sockets.emit('usernames', nicknames);

    }

    });
}