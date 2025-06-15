// src/webapp/Response.ts

export class Response {
    status: number = 200;
    headers: Record<string, string> = {};
    body: string | Buffer | undefined;

    setHeader(name: string, value: string): void {
        this.headers[name.toLowerCase()] = value;
    }

    setStatus(status: number): void {
        this.status = status;
    }

    setBody(body: string | Buffer): void {
        this.body = body;
    }
}
