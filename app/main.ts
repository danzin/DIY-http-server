
import { Server } from './server';
import { Router } from './router';
import { RootHandler, UserAgentHandler } from './handler';

const port: number = 4221;
const hostname: string = "localhost";

const router = new Router();

router.register('/', new RootHandler());
router.register('/user-agent', new UserAgentHandler());

const server = new Server(port, hostname, router);
server.start();