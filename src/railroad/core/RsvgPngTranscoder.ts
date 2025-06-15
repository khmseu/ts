// src/railroad/core/RsvgPngTranscoder.ts

export class RsvgPngTranscoder {
    static async transcode(svg: string): Promise<Buffer> {
        // Use sharp or similar in Node.js
        return Buffer.from(svg, "utf-8"); // Placeholder
    }
}
