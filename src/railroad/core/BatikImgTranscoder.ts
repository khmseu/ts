import sharp from 'sharp';

export class BatikImgTranscoder {
    static async transcode(svg: string): Promise<Buffer> {
        // Use sharp to convert SVG string to PNG
        return sharp(Buffer.from(svg)).png().toBuffer();
    }
}

export class RsvgPngTranscoder {
    static async transcode(svg: string): Promise<Buffer> {
        // Same as above; you can customize DPI, dimensions, etc.
        return sharp(Buffer.from(svg)).png().toBuffer();
    }
}
