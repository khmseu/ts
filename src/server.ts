// src/server.ts
import { createApp } from './app.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const app = createApp();

app.listen(PORT, () => {
    console.log(`Railroad-diagram server running at http://localhost:${PORT}/`);
});
