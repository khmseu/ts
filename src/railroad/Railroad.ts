// src/railroad/Railroad.ts

export class Railroad {
    static main(args: string[]): void {
        // Main entry point logic
        // Parse args, run generator, etc.
    }
}

// CLI entrypoint
if (process.argv[1] === new URL(import.meta.url).pathname) {
    Railroad.main(process.argv.slice(2));
}
