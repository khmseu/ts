// src/railroad/webapp/RailroadServer.ts

import { createRailroadWebApp } from './RailroadWebApp.js';

export class RailroadServer {
    static start(port: number = 8080): void {
        const app = createRailroadWebApp();
        app.listen(port, () => {
            console.log(`Railroad server listening on port ${port}`);
        });
    }
}
