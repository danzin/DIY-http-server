
import { Server } from './server';
import { Router } from './router';
import { RootHandler, UserAgentHandler } from './handler';
import { FileHandler } from './fileHandler';

const port: number = 4221;
const hostname: string = "localhost";

const router = new Router();

router.register('/static', new FileHandler('./public'));
router.register('/user-agent', new UserAgentHandler());
router.register('/', new RootHandler());

const server = new Server(port, hostname, router);
server.start();