import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export class Loader {
    static loadResource(name: string): string | Buffer {
        // Compute absolute path relative to this file
        const __dirname = dirname(fileURLToPath(import.meta.url));
        return readFileSync(join(__dirname, name));
    }
}
