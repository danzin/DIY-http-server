export class ResponseBuilder {
  private status: string;
  private headers: { [key: string]: string };
  private body: string;

  constructor() {
    this.status = 'HTTP/1.1 200 OK';
    this.headers = { 'Content-Type': 'text/plain' };
    this.body = '';
  }

  public setStatus(status: string) {
    this.status = status;
    return this;
  }

  public setHeader(name: string, value: string) {
    this.headers[name] = value;
    return this;
  }

  public setBody(body: string) {
    this.body = body;
    return this;
  }

  public build(): string {
    let headerString = '';
    for (const [key, value] of Object.entries(this.headers)) {
      headerString += `${key}: ${value}\r\n`;
    }
    return `${this.status}\r\n${headerString}\r\n${this.body}`;
  }
}