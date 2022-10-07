import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { User } from '../classes/user';


export const conectarCliente = (client: Socket, io: socketIO.Server) => {
    const user = new User(client.id);

    console.log('User connected', user);
}


export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('disconnect', () => {
        console.log('User disconnected');
    });
}