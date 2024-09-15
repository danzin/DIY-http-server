import { Request } from "./request";
import { ResponseBuilder } from "./responseBuilder";
import { handlerFunc, HttpStatus } from "./types";

export interface Handler {
  handle(request: Request): handlerFunc ;
}

export class RootHandler implements Handler {
  handle(): string {
    return HttpStatus.OK;
  }
};

export class EchoHandler implements Handler {
  private message: string;

  constructor(message: string){
    this.message = message;
  }
  handle(request: Request): handlerFunc {
    return new ResponseBuilder()
      .setBody(this.message)
      .setHeader('Content-Type', 'text/plain')
      .applyContentEncoding(request)
      .build()
  }
};

export class UserAgentHandler implements Handler {

  handle(request: Request): handlerFunc{
    const userAgent = request.getHeader('user-agent') || 'Unknown';

    return new ResponseBuilder()
      .setBody(userAgent)
      .setHeader('Content-Length', userAgent.length.toString())
      .setHeader('Content-Type', 'text/plain')
      .applyContentEncoding(request)
      .build();
  }

}


