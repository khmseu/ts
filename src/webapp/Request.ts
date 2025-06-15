// src/webapp/Request.ts

export class Request {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | Buffer | undefined;

  constructor(
    method: string,
    url: string,
    headers: Record<string, string> = {},
    body?: string | Buffer
  ) {
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.body = body;
  }

  getHeader(name: string): string | undefined {
    return this.headers[name.toLowerCase()];
  }
}
