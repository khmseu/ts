// src/app.ts
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { registerRailroadServlet } from './railroad/webapp/RailroadServlet.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(): express.Application {
    const app = express();

    // Serve static files (SVGs, favicon, index.html, etc.)
    app.use(express.static(path.join(__dirname, "public")));
    app.use("/resources", express.static(path.join(__dirname, "resources")));

    // Parse urlencoded form data
    app.use(express.urlencoded({ extended: true }));

    // Register the railroad servlet route
    registerRailroadServlet(app);

    // Home page (optional, serves index.html)
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    return app;
}
