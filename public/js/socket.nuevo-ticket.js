//const {io} = require('../../server/server');

// comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al Servidor');
});
socket.on('disconnect', function() {
    console.log("Perdimos conexión con el servidor");
});
socket.on('estadoActual', function(estado) {
    label.text(estado.actual);
});
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
    /*
    socket.emit('siguienteTicket', function(resp) {
        alert(`Siguiente Ticket ${resp.ticket}`);
    })
    */
});