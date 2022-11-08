import { connect } from 'socket.io-client';

// URL del servidor de socket.io
const URL_SERVIDOR = 'http://localhost:4040';

// Un dato que le vamos a pasar al server en un mensaje
const USUARIO = {
    nombre: 'usuario_n',
    password: 'p4ssw0rd',
};

// Iniciar la conexión con el server
console.log(`Conectando con ${URL_SERVIDOR}`);
// Se crea una instancia del cliente
const socket = connect(URL_SERVIDOR);

// Al detectar la conexión, envía un mensaje al server
socket.on('connect', () => {
    console.log('Conexión exitosa!');
    // Emitir un mensaje al servidor, en este caso, el servidor no esta escuchando por
    // el mensaje, por lo que el server no hará ninguna acción
    socket.emit('listar usuarios');
    // ¿Cómo podría el server devolvernos la lista de usuarios?
    // Ayuda: https://socket.io/docs/v4/server-api/#namespacefetchsockets
    // Si lograste resolverlo: ¿Qué devolvio el server?
});

// Al recibir el mensaje 'total clientes' del servidor, obtenemos el dato que
// envió para ser mostrado en consola
socket.on('total clientes', (cantidad) => {
    console.log(`El servidor envió la cantidad de clientes conetados: ${cantidad} cliente/s`,);

    USUARIO.nombre = `usuario_n${cantidad}`;
    // Se emite al servidor un mensaje para que guarde el USUARIO en el socket
    socket.emit('guardar usuario', USUARIO);
});

// Evento que se ejecutará cuando el socket pieda la conexión con el servidor
socket.on('disconnect', (motivo) => {
    console.log('Se terminó la conexión!\n  Motivo:', motivo);
    setTimeout(() => {
        console.log('Reconectando...');
        // Conextar con el servidor. Como el socket aun existe, no es necesario pasar la url
        socket.connect();
    }, 3000);
});