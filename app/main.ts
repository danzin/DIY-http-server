
import { Server } from './server';
import { Router } from './router';
import { RootHandler, UserAgentHandler } from './handler';
import { GetFileHandler, PostFileHandler } from './fileHandler';

const port: number = 4221;
const hostname: string = "localhost";

const router = new Router();

//Registered routes
router.register('/files', new GetFileHandler('./public'), 'GET');
router.register('/files', new PostFileHandler(), 'POST');
router.register('/user-agent', new UserAgentHandler(), 'GET');
router.register('/', new RootHandler(), 'GET');

//Start server
const server = new Server(port, hostname, router);
server.start();