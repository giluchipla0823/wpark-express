
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class AppServer {

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;
    private static _intance: AppServer;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = http.createServer(this.app);
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: ['http://localhost:4200'],
                methods: ["GET", "POST"],
                credentials: true
            },
            allowEIO3: true
        });

        this.listenSockets();
    }

    public static get instance() {
        return this._intance || ( this._intance = new this() );
    }


    private listenSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', client => {
            // Conectar cliente
            socket.conectarCliente(client, this.io);

            // Desconectar
            socket.desconectar(client, this.io);    
        });

    }


    start(callback: any ): void {
        this.httpServer.listen( this.port, callback );
    }

}