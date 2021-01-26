// comando para establecer la conexión
var socket = io();

// Obtengo los parámetros de la Url

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');
console.log(escritorio);
$('title').text('Escritorio ' + escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp === "No hay tickets") {
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});