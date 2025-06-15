// src/railroad/webapp/RailroadServlet.ts
import express, { Request, Response } from 'express';

import { RailroadGenerator } from '../RailroadGenerator.js';

export function registerRailroadServlet(app: express.Application): void {
    // GET API: /railroad?grammar=...
    app.get("/railroad", (req: Request, res: Response) => {
        const grammar = (req.query.grammar as string) || "";
        const generator = new RailroadGenerator();
        const svg = generator.generate(grammar);
        res.type("image/svg+xml").send(svg);
    });

    // POST API: /railroad (form body)
    app.post("/railroad", (req: Request, res: Response) => {
        const grammar = req.body.grammar || "";
        const generator = new RailroadGenerator();
        const svg = generator.generate(grammar);
        res.type("image/svg+xml").send(svg);
    });
}
