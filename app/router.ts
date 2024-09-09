import { EchoHandler, Handler } from "./handler";
import { Request } from "./request";

export class Router {
  private routes: { [key: string]: Handler };

  constructor() {
    this.routes = {};
  }

  public register(path: string, handler: Handler) {
    this.routes[path] = handler;
  }

  public route(rawRequest: string): string {
    const request = new Request(rawRequest); 
    const path = request.path;

    // Handle the dynamic /echo/{string} route
    if (path.startsWith('/echo/')) {
      const dynamicPart = path.replace('/echo/', '');
      const handler = new EchoHandler(dynamicPart);
      return handler.handle();
    }

    // Handle registered routes
    const handler = this.routes[path];
    if (handler) {
      return handler.handle(request); 
    }

    return 'HTTP/1.1 404 Not Found\r\n\r\n';
  }
}