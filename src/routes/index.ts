import { Router, Request, Response } from 'express';
import AppServer from '../classes/server';

const router = Router();

// welcome to api
router.get('/api/welcome', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'Welcome WPARK api with express and sockets'
    });
});

// Prueba de envío de mensajes
router.post('/api/send-message', ( req: Request, res: Response  ) => {
    const message = req.body.message;
    const from = req.body.from;

    const payload = {
        from,
        message
    };
    const server = AppServer.instance;

    server.io.emit('send-message', payload);

    return res.json(payload).status(200);
});

// Confirmar movimiento de vehículos
router.post('/api/confirm-movement', ( req: Request, res: Response  ) => {
    const vins = req.body.vins;

    const server = AppServer.instance;

    server.io.emit('confirm-movement', vins);

    return res.json({
        code: 200,
        message: 'Nuevo movimiento confirmado',
        data: vins
    }).status(200);
});

// Enviar notificación de fila
router.post('/api/send-notification', ( req: Request, res: Response  ) => {
    const notification = req.body.notification;

    const server = AppServer.instance;

    server.io.emit('new-row-notification', notification);

    return res.json({
        code: 200,
        message: `Nueva notificación de fila` ,
        data: notification
    }).status(200);
});

// Marcar notificación de fila como leída
router.post('/api/read-notification', ( req: Request, res: Response  ) => {
    const notification = req.body.notification;

    const server = AppServer.instance;

    server.io.emit('read-row-notification', notification);

    return res.json({
        code: 200,
        message: `Notificación marcada como leída` ,
        data: notification
    }).status(200);
});

// Vehículos enviados a estado LEFT
router.post('/api/vehicles-to-left', ( req: Request, res: Response  ) => {
    const vins = req.body.vins;

    const server = AppServer.instance;

    server.io.emit('vehicles-to-left', vins);

    return res.json({
        code: 200,
        message: 'Vehículos con estado LEFT',
        data: vins
    }).status(200);
});

export default router;
