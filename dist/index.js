"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const appServer = server_1.default.instance;
// BodyParser
appServer.app.use(body_parser_1.default.urlencoded({ extended: true }));
appServer.app.use(body_parser_1.default.json());
// CORS
appServer.app.use((0, cors_1.default)({ origin: true, credentials: true }));
// Rutas de servicios
appServer.app.use('/', routes_1.default);
appServer.start(() => {
    console.log(`Servidor corriendo en el puerto ${appServer.port}`);
});
