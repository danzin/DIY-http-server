import { getContentEncoding } from "./helpers";
import { Request } from "./request";
import * as zlib from 'zlib';

export class ResponseBuilder {
  private status: string;
  private headers: { [key: string]: string };
  private body: string | Buffer = '';
  private request?: Request;

  constructor() {
    this.status = 'HTTP/1.1 200 OK';
    this.headers = { 'Content-Type': 'text/plain' };
    this.body = '';
  }


  public setStatus(status: string) {
    this.status = status;
    return this;
  }

  public setHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  public setBody(body: string): this {
    this.body = body;
    return this;
  }

  public applyContentEncoding(request: Request): this {
    const contentEncoding = getContentEncoding(request);
    if (contentEncoding === 'gzip') {
      const buffer = Buffer.from(this.body as string, 'utf8'); 
      this.body = zlib.gzipSync(buffer);  

      this.setHeader('Content-Encoding', 'gzip');
      this.setHeader('Content-Length', this.body.length.toString());       
    }
    if(!contentEncoding){
      this.setHeader('Content-Length', this.body.length.toString());
    }
    
    return this;
  }

  public build(): string | { headers: string, body: Buffer }  {

    let headerString = '';
    for (const [key, value] of Object.entries(this.headers)) {
      headerString += `${key}: ${value}\r\n`;
    }
    if (Buffer.isBuffer(this.body)) {
      return { headers: `${this.status}\r\n${headerString}\r\n`, body: this.body };

    }
    return `${this.status}\r\n${headerString}\r\n${this.body}`;
  }
}