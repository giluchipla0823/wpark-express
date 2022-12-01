"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../classes/user");
exports.conectarCliente = (client, io) => {
    const user = new user_1.User(client.id);
    console.log('User connected', user);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('User disconnected');
    });
};
