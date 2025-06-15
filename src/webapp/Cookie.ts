// src/webapp/Cookie.ts

export class Cookie {
    name: string;
    value: string;
    path?: string;
    domain?: string;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;

    constructor(
        name: string,
        value: string,
        options: {
            path?: string;
            domain?: string;
            maxAge?: number;
            secure?: boolean;
            httpOnly?: boolean;
        } = {}
    ) {
        this.name = name;
        this.value = value;
        Object.assign(this, options);
    }

    toHeader(): string {
        let header = `${this.name}=${encodeURIComponent(this.value)}`;
        if (this.path) header += `; Path=${this.path}`;
        if (this.domain) header += `; Domain=${this.domain}`;
        if (this.maxAge !== undefined) header += `; Max-Age=${this.maxAge}`;
        if (this.secure) header += `; Secure`;
        if (this.httpOnly) header += `; HttpOnly`;
        return header;
    }
}
