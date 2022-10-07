"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desconectar = exports.conectarCliente = void 0;
const user_1 = require("../classes/user");
const conectarCliente = (client, io) => {
    const user = new user_1.User(client.id);
    console.log('User connected', user);
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('User disconnected');
    });
};
exports.desconectar = desconectar;
