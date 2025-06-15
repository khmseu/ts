// src/railroad/webapp/RailroadWebApp.ts

import express from 'express';

import { registerRailroadServlet } from './RailroadServlet.js';

export function createRailroadWebApp(): express.Application {
    const app = express();
    registerRailroadServlet(app);
    return app;
}
