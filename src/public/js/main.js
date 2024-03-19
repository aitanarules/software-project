// console.log('hola, mundo'
// alert('works!') //https://releases.jquery.com/
// scroll https://es.stackoverflow.com/questions/214503/c%C3%B3mo-mantener-el-scroll-abajo-al-abrir-un-chat

$(function (){

  // socket.io en el lado de conexión del cliente
  const socket = io();

  // Obteniendo los elementos del DOM (HTML) desde la interfaz
  const $chat = $("#parte-central");
  const $formulario_mensaje =$("#formulario-mensajes");
  const $mensaje = $("#mensaje");

  // Obteniendo los elementos del DOM (HTML) desde el login
  const $formulario_login = $("#formulario-login");
  const $nombre_usuario =$("#nombre-usuario");
  const $contrasenya = $("#contraseña");
  const $nombre_usuario_error = $("#nombre-usuario-error");
  
  // Obteniendo los usernames 
  const $usuarios = $("#usernames");

  $formulario_login.submit(e=>{
    e.preventDefault(); //para evitar que refresque al enviar el nombre
    socket.emit('new user', $nombre_usuario.val(), $contrasenya.val(), data=>{
        if (data){
          $('#escritorio-login').hide(); //mostraremos el chat
          $('#escritorio-chat').show();
          $('#nombre-perfil').html( $nombre_usuario.val());
          $('#usernames').scrollTop($('#usernames').prop('scrollHeight'));

        }else{
          $nombre_usuario_error.html(`Prova un altre nom d'usuari!`);
          $nombre_usuario_error.show();
          // $nombre_usuario_error.html(alert('Prova un altre nom!'))
        }
        $nombre_usuario.val('');
        $contrasenya.val('');
    }) //envío los datos al servidor para validar y recibo un callback (equivalente a function(data){})
  })

  // Eventos
  $formulario_mensaje.submit( element => {
    element.preventDefault(); //para que no se refresque al enviar datos
    // console.log('Enviando datos')
    // console.log($mensaje.val()); //obtengo lo que envía el usuario
    
    // const hora = new Date().toLocaleTimeString(); 
    // var mensaje_e = `<div id='CAJA'><div id='PERFIL'>${ $('#nombre-perfil').text()}</div> <div id='MENSAJE'>${$mensaje.val()}</div> <div id='HORA'>${hora} </div></div> </br>`; 

    // socket.emit('send message', mensaje_e); //el servidor recibe el mensaje y lo manda a través de los sockets
    // $mensaje.val('');

    const mensaje = $mensaje.val().trim(); // Obtener el mensaje del input
    if (mensaje !== '') { // Verificar que el mensaje no esté vacío
        const hora = new Date().toLocaleTimeString(); 
        var mensaje_e = `<div id='CAJA'><div id='PERFIL'>${$('#nombre-perfil').text()}</div> <div id='MENSAJE'>${mensaje}</div> <div id='HORA'>${hora} </div></div> </br>`; 
        socket.emit('send message', mensaje_e); // Enviar el mensaje al servidor
    }
    $mensaje.val(''); // Limpiar el input del mensaje después de enviarlo


  })

  socket.on('new message', function(data){
    console.log(data);
    $chat.append(data);
    $chat.scrollTop($chat.prop('scrollHeight'));

    // $chat.append('<b>'+ data.nick + '</b>: ' + data.msg + '<br/>')
    // $chat.animate({scrollTop: $chat.prop("scrollHeight")},1000)

    // Solo agrega el mensaje al chat si no está ya presente
    // if ($chat.find(`#parte-central:contains(${data})`)==-1) {
    //     $chat.append(data);
    //     $chat.scrollTop($chat.prop('scrollHeight'));
    // }

    
  });

  socket.on('usernames', data=>{
    let html = '';
    for (let i=0; i<data.length; i++){ //cuando recibamos los datos creamos una variable que lleve las etiquetas p
      html += `<p>${data[i]}</p>`
    }
    $usuarios.html(html);
  })

//   $(document).ready(function() {
//     // Selecciona el botón por su id
//     $('#cerrar-sesion').click(function() {
//       console.log('CERRAR SESIÓN');
//       socket.emit('disconnect');

//       $('#escritorio-chat').hide();
//       $('#escritorio-login').show();
//     });
// });

  // $('#cerrar-sesion').on('click', function(){
  //   console.log('cerrar sesión');
  //   socket.emit('disconnect')
  // })

  // Evento para cerrar sesión
  $('#cerrar-sesion').on('click', function(){
    // console.log('cerrar sesión');
    socket.disconnect();
    // socket.emit("disconnect")
    $('#escritorio-chat').hide();
    $('#escritorio-login').show();
    socket.connect();
    // location.reload();
    $nombre_usuario_error.hide();
})


  // Detecta cuando se selecciona una nueva imagen de perfil
  $('#input-foto-perfil').on('change', function(event) {
    const file = event.target.files[0]; // Obtiene el archivo de imagen seleccionado
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Muestra la imagen seleccionada en la etiqueta img
            $('#foto-perfil').attr('src', e.target.result);
            // Puedes agregar aquí la lógica para enviar la nueva imagen al servidor si es necesario
        }
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
});


})
