import AppServer from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routes';

const appServer = AppServer.instance;

// BodyParser
appServer.app.use( bodyParser.urlencoded({ extended: true }) );
appServer.app.use( bodyParser.json() );

// CORS
appServer.app.use( cors({ origin: true, credentials: true  }) );


// Rutas de servicios
appServer.app.use('/', router );

appServer.start( () => {
    console.log(`Servidor corriendo en el puerto ${ appServer.port }`);
});