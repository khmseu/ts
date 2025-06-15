// src/webapp/servlet/ServletResponse.ts

import { Cookie } from '../Cookie.js';
import { Response } from '../Response.js';

export class ServletResponse extends Response {
    cookies: Cookie[] = [];

    addCookie(cookie: Cookie): void {
        this.cookies.push(cookie);
        this.setHeader("Set-Cookie", cookie.toHeader());
    }
}
