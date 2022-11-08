# Socket.io en NodeJS

## - Contenido -

El repo contiene un ejemplo de manejo de eventos/mensajes entre un servidor y un cliente mediantela librería Socket.io, la cual utiliza websockets para realizar una conexión TCP/IP, y realizar acciones al recibir dichos mensajes.

La idea es poder dar los primeros pasos y entender el funcionamiento de este tipo de eventos/mensajes que pueden llegar en cualquier momento en la ejecución del código java script.

## - Instalación -

Luego de clonar el repo, instala las dependencias de ambos con ```npm run instalar``` o ingresando a la carpeta *server* y *client* y ejecutnado el comando ```npm i``` en ambas.

## - Ejecución - 

Entrando a las carpetas *server* y *client*, ejecuta el comando ```npm run start``` o ```npm run dev``` y utilizar nodemon para ejeuctar los scripts mientras se realizan modificaciones al código.

---

# Resumen

## Servidor

Es una instancia independiente del servidor de socket.io (independiente porque no se estan utilizando las librerias http, https o express como servidores, ya que se puede utilizar cualquiera de las mensionadas y usarlas para socket.io) que se levantará en una url y puerto que se especifique. En este caso es http://localhost:4040, y es a donde los clientes tendrán que conectarse. Del lado del server se suele instanciarlo como ```const io = new Server(PUERTO);``` (el new se puede omitir).

### Escuchar y enviar un mensaje:

La sintáxis básica es ```io.on('nombre-del-mensaje', (datos) => { ... });``` para escuchar los mensajes. El ejemplo es escuchar el mensaje/evento predefinido de conexión de un socket cliente, y devolverle a ese socket las distintas emisiones de mensajes que sean necesarios:

```js
    const canalesDeChat =['General','Ayuda'];
    io.on('connect', (socket) => {
        socket.emit('lista canales', canalesDeChat);

        socket.on('guardar nombre', (nombre) => {
            socket.data.nombre = nombre;
            socket.emit('nombre guardado', nombre);
        });
    });
```

## Cliente

Es una instancia de socket.io-client independiente, la que necesita la url del servidor para poder conectarse. Del lado del cliente se suele instanciarlo como ```const socket = connect(URL_SERVIDOR);``` para crear el objeto y que se conecte de inmediato.

### Escuchar y enviar un mensaje:

La sintáxis básica es ```socket.on('nombre-del-mensaje', (datos) => { ... });``` pero a diferencia del servidor, no es necesario incluir el resto de los mensajes que pueden llegar dentro del código que se va a ejecutar al llegar el mensaje de que se estableció la conexión.

```js
    socket.on('connect', () => {
        // (...)
    });
    socket.on('usuarios', (usuarios) => {
        // (...);
    });
```
<div style="display: flex; align-items: center; gap: 16px; padding-bottom: 16px;">
No es correcto el siguiente anidamiento:
  <img src="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/07/17/44f55f2f-a5f9-44d0-9c62-31672feca5a2/hay-tabla" width="150" title="hover text">
</div>


```js
    socket.on('connect', () => {
        socket.on('usuarios', (usuarios) => {
             // (...);
        });
    });
```

Deben ser independientes.

---

[Resumen de emits Socket.io (resumen).](https://socket.io/docs/v4/emit-cheatsheet/)

- [API del servidor.](https://socket.io/docs/v4/server-api/)

- [API del cliente.](https://socket.io/docs/v4/client-api/)

[Web Socket.IO oficial.](https://socket.io/)

<div style="text-align: center; padding-top: 64px;">
    <img src="https://cdn.discordapp.com/attachments/1016886193595617322/1039362742974431292/image.png">
</div>