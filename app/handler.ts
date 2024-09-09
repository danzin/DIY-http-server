import { Request } from "./request";
import { ResponseBuilder } from "./responseBuilder";

export interface Handler {
  handle(request: Request): string;
}

export class RootHandler implements Handler {
  handle(): string {
    return 'HTTP/1.1 200 OK\r\n\r\n';
  }
};

export class EchoHandler implements Handler {
  private message: string;

  constructor(message: string){
    this.message = message;
  }
  handle(): string {
    return new ResponseBuilder()
      .setBody(this.message)
      .setHeader('Content-Type', 'text/plain')
      .setHeader('Content-length', this.message.length.toString())
      .build()
  }
};

export class UserAgentHandler implements Handler {

  handle(request: Request): string {
    const userAgent = request.getHeader('user-agent') || 'Unknown';

    return new ResponseBuilder()
      .setBody(userAgent)
      .setHeader('Content-Type', 'text/plain')
      .setHeader('Content-Length', userAgent.length.toString())
      .build();
  }


}

