// src/webapp/server/HttpRequest.ts

import { Cookie } from '../Cookie.js';
import { MultiPart } from '../MultiPart.js';
import { Request } from '../Request.js';

export class HttpRequest extends Request {
    parameters: Record<string, string | string[]> = {};
    cookies: Cookie[] = [];
    multipart: MultiPart[] = [];

    constructor(
        method: string,
        url: string,
        headers: Record<string, string> = {},
        body?: string | Buffer
    ) {
        super(method, url, headers, body);
    }
}
