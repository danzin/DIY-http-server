import { Request } from "./request";

export function getContentEncoding(request: Request): string | null {
  const acceptEncoding = request.getHeader('accept-encoding');
  
  if (acceptEncoding?.includes('gzip')) {
    return 'gzip';
  }
  if (acceptEncoding?.includes('deflate')) {
    return 'deflate';
  }
  if(acceptEncoding?.includes('br')) {
    return 'br';
  }
  
  return null;
}

