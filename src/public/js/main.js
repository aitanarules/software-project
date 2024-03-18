// console.log('hola, mundo'
// alert('works!') //https://releases.jquery.com/

$(function (){

  const socket = io();

  // Obteniendo los elementos del DOM (HTML) desde la interfaz
  const $chat = $("#parte-central");
  const $formulario_mensaje =$("#formulario-mensajes");
  const $mensaje = $("#mensaje");

  // Obteniendo los elementos del DOM (HTML) desde el login
  const $formulario_login = $("#formulario-login");
  const $nombre_usuario =$("#nombre-usuario");
  const $nombre_usuario_error = $("#nombre-usuario-error");
  const $usuarios = $("#usernames");

  $formulario_login.submit(e=>{
    e.preventDefault(); //para evitar que refresque al enviar el nombre
    socket.emit('new user', $nombre_usuario.val(), data=>{
        if (data){
          $('#escritorio-login').hide(); //mostraremos el chat
          $('#escritorio-chat').show();
          $('#nombre-perfil').html( $nombre_usuario.val());
        }else{
          $nombre_usuario_error.html(`Prova un altre nom d'usuari!`);
          // $nombre_usuario_error.html(alert('Prova un altre nom!'))
        }
        $nombre_usuario.val('');
    }) //envío los datos al servidor para validar y recibo un callback (equivalente a function(data){})
  })

  // Eventos
  $formulario_mensaje.submit( element => {
    element.preventDefault(); //para que no se refresque al enviar datos
    // console.log('Enviando datos')
    // console.log($mensaje.val()); //obtengo lo que envía el usuario
    socket.emit('send message', $mensaje.val()); //el servidor recibe el mensaje y lo manda a través de los sockets
    $mensaje.val('')
  })
  // socket.on('new message', function(data){
  //   $chat.append('<b>'+ data.nick + '</b>: ' + data.msg + '<br/>')
  // })

  socket.off('new message');
  // Ahora agrega el nuevo oyente
  socket.on('new message', function(data){
      $chat.append(data.msg+'</br>');
  });


  socket.on('usernames', data=>{
    let html = '';
    for (let i=0; i<data.length; i++){ //cuando recibamos los datos creamos una variable que lleve las etiquetas p
      html += `<p>${data[i]}</p>`
    }
    $usuarios.html(html);
  })
})
