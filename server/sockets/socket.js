const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');
    // Emitir un evento 'estadoActual'

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "El escritorio es requerido"
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        // retorno el ticket a atender, para que el cliente lo pueda ver
        callback(atenderTicket);
        // actualizar / notificar cambios en los últimos 4
        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });
    });
});