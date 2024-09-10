import { EchoHandler, Handler } from "./handler";
import { Request } from "./request";

export class Router {
  private routes: { [key: string]: Handler };

  constructor() {
    this.routes = {};
  }

  public register(path: string, handler: Handler) {
    this.routes[path] = handler;
  };

  public route(rawRequest: string): string {
    const request = new Request(rawRequest); 
    const path = request.path;

    // Handle the dynamic /echo/{string} route
    if (path.startsWith('/echo/')) {
      const str = path.replace('/echo/', '');
      const handler = new EchoHandler(str);
      return handler.handle();
    }

    // Handle registered routes
    for (const route in this.routes) {
      if (path === route || path.startsWith(`${route}/`)) {
        const handler = this.routes[route];
        return handler.handle(request);
      }
    }
    return 'HTTP/1.1 404 Not Found\r\n\r\n';

  };
}