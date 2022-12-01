"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const router = express_1.Router();
// welcome to api
router.get('/api/welcome', (req, res) => {
    res.json({
        ok: true,
        message: 'Welcome WPARK api with express and sockets'
    });
});
// Prueba de envío de mensajes
router.post('/api/send-message', (req, res) => {
    const message = req.body.message;
    const from = req.body.from;
    const payload = {
        from,
        message
    };
    const server = server_1.default.instance;
    server.io.emit('send-message', payload);
    return res.json(payload).status(200);
});
// Confirmar movimiento de vehículos
router.post('/api/confirm-movement', (req, res) => {
    const vins = req.body.vins;
    const server = server_1.default.instance;
    server.io.emit('confirm-movement', vins);
    return res.json({
        code: 200,
        message: 'Nuevo movimiento confirmado',
        data: vins
    }).status(200);
});
// Enviar notificación de fila
router.post('/api/send-notification', (req, res) => {
    const notification = req.body.notification;
    const server = server_1.default.instance;
    server.io.emit('new-row-notification', notification);
    return res.json({
        code: 200,
        message: `Nueva notificación de fila`,
        data: notification
    }).status(200);
});
// Marcar notificación de fila como leída
router.post('/api/read-notification', (req, res) => {
    const notification = req.body.notification;
    const server = server_1.default.instance;
    server.io.emit('read-row-notification', notification);
    return res.json({
        code: 200,
        message: `Notificación marcada como leída`,
        data: notification
    }).status(200);
});
// Vehículos enviados a estado LEFT
router.post('/api/vehicles-to-left', (req, res) => {
    const vins = req.body.vins;
    const server = server_1.default.instance;
    server.io.emit('vehicles-to-left', vins);
    return res.json({
        code: 200,
        message: 'Vehículos con estado LEFT',
        data: vins
    }).status(200);
});
exports.default = router;
