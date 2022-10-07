"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/socket"));
class AppServer {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = http_1.default.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer, {
            cors: {
                origin: [
                    'http://localhost:4200',
                    'https://wepark.pro'
                ],
                methods: ["GET", "POST"],
                credentials: true
            },
            allowEIO3: true
        });
        this.listenSockets();
    }
    static get instance() {
        return this._intance || (this._intance = new this());
    }
    listenSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', client => {
            // Conectar cliente
            socket.conectarCliente(client, this.io);
            // Desconectar
            socket.desconectar(client, this.io);
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = AppServer;
