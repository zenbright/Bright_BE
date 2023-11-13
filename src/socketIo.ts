import { Server, Socket } from 'socket.io';

export const initSocketIo = (server: any) => {
  const io = new Server(server, {});
  const socketsConnected = new Set();

  io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    console.log('socket id: ' + socket.id);

    // Increase Total Client Count
    socketsConnected.add(socket.id);
    io.emit('clients-total', socketsConnected.size);

    socket.on('message', (data) => {
      console.log('received message: ' + data.message);
      console.log('sender: ' + socket.id);
      io.emit('message', data);
      socket.broadcast.emit('chat-message', data);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected');
      // Decrease Total Client Count
      socketsConnected.delete(socket.id);
      io.emit('clients-total', socketsConnected.size);
    });
  });
};

export default initSocketIo;
