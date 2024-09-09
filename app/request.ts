export class Request {
  private rawRequest: string;
  public path: string;
  public headers: { [key: string]: string };

  constructor(rawRequest: string) {
    this.rawRequest = rawRequest;
    this.path = '';
    this.headers = {};

    this.parseRequest();
  }

  private parseRequest() {
    console.log('lines non-split:', this.rawRequest);

    const lines = this.rawRequest.split('\r\n');
    console.log('lines split:', lines);

    const requestLine = lines[0].split(' ');
    
    this.path = requestLine[1];

    // Parse headers
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line === '') break; // Empty line = end of headers section
      const [key, value] = line.split(': ');
      if (key && value) {
        this.headers[key.toLowerCase()] = value;
      }
    }
  }

  public getHeader(headerName: string): string | undefined {
    return this.headers[headerName.toLowerCase()];
  }
}