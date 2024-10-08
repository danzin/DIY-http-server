import { Handler } from './handler';
import { Request } from './request';
import { ResponseBuilder } from './responseBuilder';
import { handlerFunc, HttpStatus } from './types';
import * as fs from 'fs';
import * as path from 'path';

export class GetFileHandler implements Handler {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath; 
  }

  public handle(request: Request): handlerFunc { 
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
        .applyContentEncoding(request)
        .build();
    } catch (err) {
      console.error(`File not found: ${filePath}`);
      return HttpStatus.NOT_FOUND;
    }
  }
 
}

export class PostFileHandler implements Handler {

  public handle(request: Request): handlerFunc {
    const parts = request.path.split('/');
    console.log('parts: ',parts)
    const filename = parts[2];

    if (!filename) {
      return HttpStatus.BAD_REQUEST;
    }
    const filePath = path.join(__dirname, '..', 'public/uploads' , filename);
    console.log(filePath)
    try {
      fs.writeFileSync(filePath, request.body, 'utf8');
      return HttpStatus.CREATED;
    } catch (error) {
      console.error('Error saving file:', error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
   
  }
}