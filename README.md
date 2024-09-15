 [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/) 
 
A simple HTTP server written in TypeScript with support for gzip compression. 

`bun install` && `bun run dev` to start the server. By default it listens on `localhost:4221`

`Server` class encapsulates the logic of setting up the server and handling connections. 
`Router` class handles the routing logic and delegates the request to the appropriate handler.

Initializing the server: 

```
const router = new Router();
const server = new Server(port, hostname, router);
```

New routes are registered with the router's `.register()` method: 

```
router.register('/files', new GetFileHandler('./public'), 'GET');
router.register('/files', new PostFileHandler(), 'POST');
```

`Router` dynamically checks the request's method and calls the appropriate registered handler. 

By default, `POST` requests to `/files/filename` with `--data` attached save the data to file in `/public/uploads/filename`. Uploaded file can be retrieved with `GET` request to `/files/uploads/filename`



