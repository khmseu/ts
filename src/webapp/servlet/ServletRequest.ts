// src/webapp/servlet/ServletRequest.ts

import { Cookie } from '../Cookie.js';
import { MultiPart } from '../MultiPart.js';
import { Request } from '../Request.js';

export class ServletRequest extends Request {
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

    getParameter(name: string): string | undefined {
        const value = this.parameters[name];
        if (Array.isArray(value)) return value[0];
        return value;
    }

    getParameterValues(name: string): string[] | undefined {
        const value = this.parameters[name];
        if (Array.isArray(value)) return value;
        return value ? [value] : undefined;
    }

    getCookies(): Cookie[] {
        return this.cookies;
    }

    getParts(): MultiPart[] {
        return this.multipart;
    }
}
