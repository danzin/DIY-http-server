export class Request {
  private method: string = ''
  private rawRequest: string;
  public path: string;
  public headers: { [key: string]: string };
  public body: string = '';

  constructor(rawRequest: string) {
    this.rawRequest = rawRequest;
    this.path = '';
    this.headers = {};
    this.body = '';
    this.parseRequest();
  }

  private parseRequest() {

    const lines = this.rawRequest.split('\r\n');
    const requestLine = lines[0].split(' ');
    this.method = requestLine[0];
    this.path = requestLine[1];
    console.log("METHOD:", this.method)

    // Parse headers and body
    let isBody = false;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line === '') {
        isBody = true;
        continue;
      }; // Empty line = end of headers section
      if(!isBody){
        const [key, value] = line.split(': ');
        if (key && value) {
          this.headers[key.toLowerCase()] = value;
        }
      }else {
        this.body += line;
      }
    }
  }

  public getHeader(headerName: string): string | undefined {
    return this.headers[headerName.toLowerCase()];
  }

  public getMethod(): string {
    return this.method;
  }

  public getBody():string {
    return this.body;
  }
  
}