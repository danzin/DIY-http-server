import { Handler } from './handler';
import { Request } from './request';
import { ResponseBuilder } from './responseBuilder';
import * as fs from 'fs';
import * as path from 'path';

export class FileHandler implements Handler {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath; // base directory for serving files
  }

  public handle(request: Request): string {
    let filePath = path.join(this.basePath, request.path.replace('/files', ''));
    console.log('filePath:', filePath)

    // Set default file for root path requests
    if (request.path === '/') {
      filePath = path.join(this.basePath, 'index.html');
    }

    try {
      const fileContent = fs.readFileSync(path.resolve(filePath));

      return new ResponseBuilder()
        .setHeader('Content-Type', 'application/octet-stream')
        .setHeader('Content-Length', fileContent.length.toString())
        .setBody(fileContent.toString())
        .build();
    } catch (err) {
      console.error(`File not found: ${filePath}`);
      return 'HTTP/1.1 404 Not Found\r\n\r\n';
    }
  };
 
}
