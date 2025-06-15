// src/railroad/core/ImgTranscoder.ts

export class ImgTranscoder {
    // Abstract transcoder, base for BatikImgTranscoder, RsvgPngTranscoder, etc.
    static async transcode(svg: string, format: "png" | "pdf" = "png"): Promise<Buffer> {
        // Use sharp or similar in Node.js
        return Buffer.from(svg, "utf-8"); // Placeholder
    }
}
