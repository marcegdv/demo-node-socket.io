import { Server } from 'socket.io';

const PUERTO = 4040;

const cantidadConexiones = () => `Total conexiones: ${io.engine.clientsCount}`;

// Se crea una instancia del servidor
const io = new Server(PUERTO);

console.log(`\nServidor escuchando en la url http://localhost:${PUERTO}`);
console.log(`Cantidad de conexiones: ${cantidadConexiones()}\n`);

// El evento 'connect' y 'connection' hacen referencia al evento que se detecta cuando
// un socket cliente se conecta. Es uno de los eventos predefinidos por la librería y
// no es algo que podamos emitir desde un cliente.
io.on('connect', (socket) => {
    // El evento 'connect' recibe un objeto que es el socket cliente conectado,
    // que se pasa como parámetro al la callback para realizar operaciones, como crear
    // logs y emitir eventos al socket cliente.
    console.log(`>> Cliente ${socket.id} conectado!`);
    console.log(cantidadConexiones());
    socket.emit('total clientes', io.engine.clientsCount);

    // receive a message from the client
    socket.on('guardar usuario', (usuario) => {
        console.log(`El cliente ${socket.id} envió:\n${JSON.stringify(usuario, null, 4)}`);

        // En el lado del servidor, se puede agregar información al objeto socket, en
        // esta caso el objeto usuario que envió el cliente
        socket.data.usuario = usuario;

        // Luego el servidor va a cerrar la conexión con el socket cliente en 5 segundos
        setTimeout(() => {
            console.log(`>> Desconectando al socket ${socket.id}`);
            // Desconectar el socket cliente
            socket.disconnect();
            console.log(cantidadConexiones());
        }, 5000);
    });

    // Sirve para realizar las acciones necesarias previas a la desconexión de un
    // socket, como limpiar datos que fueron creados y ya no son necesarios
    socket.on('disconnecting', (motivo) => {
        console.log(`Desconentando... Motivo: ${motivo}.\nUsuario: ${JSON.stringify(socket.data.usuario)}`);
        console.log(`Conexiones: ${io.engine.clientsCount}`);
    });

    // El socket se desconectó definitivamente 
    socket.on('disconnect', (motivo) => {
        console.log(`Socket desconentado. Motivo: ${motivo}. Conexiones: ${io.engine.clientsCount}`);
        // socket.emit('chau'); // ¿Qué pasará si se realiza un emit al socket?
    });
});