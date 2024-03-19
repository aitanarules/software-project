// io se define en index.js
// este archivo hace mi applicación más modular y escalable

module.exports = function(io){

    //forma sencilla de incluir usuarios
    let nicknames = [];

    //usuarios que tienen contraseñas
    var user_np = {};

    io.on('connection', socket=>{
        console.log('Welcome!'); //espera a escuchar cuando haya unanueva conexión de sockets
    
        socket.on('new user', (data, pass, callback) =>{
            // console.log(data); //comprobar que el servidor funciona 
            if (nicknames.indexOf(data)!=-1){ //devuelve el índice para el cual coincide con el data en el array
                console.log('ESTE NOMBRE YA EXISTE')
                callback(false);
            }else if (pass.length!=0){
                console.log(data, pass)
                if (data in user_np){
                    if (user_np[data]==pass){
                        console.log('WEL1')
                        cb = includeNicknames(data);
                        callback(cb)
                    }else{
                        console.log('BAD1')
                        callback(false);
                    }
                }else{
                    console.log('WEL2')
                    user_np[data] = pass;
                    cb = includeNicknames(data);
                    callback(cb)
                }        
            }else{
                if (data in user_np){
                    console.log('BAD2')
                    callback(false)
                }else{
                    console.log('WEL3')
                    cb = includeNicknames(data);
                    callback(cb) 
                }
            }


        });
    socket.on('send message', function (data){ // cuando el servidor reciba este mensaje, debe estar atento a reibir datos
        
        console.log(data); //aquì recibo el dato
        // debo retransmitirlo a todos los usuarios con io pq está conectado a todos los sockets
        io.sockets.emit('new message', data) //cuando recibo a trvés de send message, envío datos con otro evento
        // socket.emit('new message', data)
    });

    socket.on('disconnect', data=>{
        console.log('Me estoy desconectando')
        if(!socket.nickname) return; // si socket no tiene propiedad llamada nickname
        nicknames.splice(nicknames.indexOf(socket.nickname), 1); //método que permite quitar un solo elemento indicando el índice
        updateNicknames();

    });


    function includeNicknames(data){
        socket.nickname = data;
        nicknames.push(socket.nickname); //agrego el nuevo usuario en memoria
        // io.sockets.emit('usernames', nicknames);//-->lo ponemos en otra función más abajo
        updateNicknames();
        //callback(true); //es válido el nickname
        return true;
    }

    function updateNicknames(){
        io.sockets.emit('usernames', nicknames);

    }

    });
}