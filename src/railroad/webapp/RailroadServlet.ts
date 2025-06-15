// src/railroad/webapp/RailroadServlet.ts

import express, { Request, Response } from 'express';

import { RailroadGenerator } from '../RailroadGenerator.js';

export function registerRailroadServlet(app: express.Application): void {
    app.get("/railroad", (req: Request, res: Response) => {
        const grammar = req.query.grammar as string || "";
        const generator = new RailroadGenerator();
        const svg = generator.generate(grammar);
        res.setHeader("Content-Type", "image/svg+xml");
        res.send(svg);
    });
}
