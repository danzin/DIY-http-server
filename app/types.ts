import { Handler } from "./handler";

export type Route = {
  path: string;
  handler: Handler;
};

export type handlerFunc = string | { headers: string, body: Buffer }

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
};

export enum HttpStatus {
  OK = 'HTTP/1.1 200 OK\r\n\r\n',
  CREATED = 'HTTP/1.1 201 Created\r\n\r\n',
  NOT_FOUND = 'HTTP/1.1 404 Not Found\r\n\r\n',
  BAD_REQUEST = 'HTTP/1.1 400 Bad Request\r\n\r\n',
  METHOD_NOT_ALLOWED = 'HTTP/1.1 405 Method Not Allowed\r\n\r\n',
  INTERNAL_SERVER_ERROR = 'HTTP/1.1 500 Internal Server Error\r\n\r\n',
};