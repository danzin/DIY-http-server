import * as net from "net";
import { Router } from './router';

export class Server {
  private port: number;
  private hostname: string;
  private router: Router;

  constructor(port: number, hostname: string, router: Router){
    this.port = port;
    this.hostname = hostname;
    this.router = router;
  }

  public start() {
    const server = net.createServer((socket) => {
      socket.on('data', (data) => {
        console.log('Connection established');
        this.handleRequest(data.toString(), socket)
      });
      socket.on('error', (err) => console.log('Socket error:', err));
    });

    server.listen(this.port, this.hostname, () =>{
      console.log(`Server listening on ${this.hostname}:${this.port}`);
    });
  };

  private handleRequest(rawRequest: string, socket: net.Socket) {
    const response = this.router.route(rawRequest);

    if (typeof response === 'string') {
      socket.write(response);
    } else {
      const { headers, body } = response;
      socket.write(headers);
      socket.write(body);
    }
    socket.end(() => console.log('Connection closed'));
  };

}