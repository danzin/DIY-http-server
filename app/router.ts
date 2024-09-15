import { EchoHandler, Handler } from "./handler";
import { Request } from "./request";
import { HttpStatus, HttpMethod, handlerFunc } from "./types";
export class Router {
  private routes: { [key: string]: { [method: string]: Handler } };

  constructor() {
    this.routes = {};
  }

  public register(path: string, handler: Handler, method: string) {
    if (!this.routes[path]) {
      this.routes[path] = {};
    }
    this.routes[path][method.toUpperCase()] = handler;    
  }

  public route(rawRequest: string): handlerFunc {
    const request = new Request(rawRequest);
    const path = request.path;
    const method = request.getMethod(); 
    console.log(`Incoming request method: ${request.getMethod}, path: ${path}`);

    // Handle the dynamic /echo/{string} route
    if (path.startsWith('/echo/')) {
      const str = path.replace('/echo/', '');
      const handler = new EchoHandler(str);
      
      return handler.handle(request); 
    }
    // Handle registered routes
    for (const route in this.routes) {
      console.log(route)
      if (path === route || path.startsWith(`${route}/`)) {
        const handlersByMethod = this.routes[route];
        const handler = handlersByMethod[method];
        if (handler) {
          console.log('Matched handler: ', handler, 'for route: ', route, 'with method: ', method);
          return handler.handle(request);
        }
      }
    }
    return HttpStatus.NOT_FOUND;

  }
}