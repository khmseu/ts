// src/railroad/core/XhtmlToZip.ts

import JSZip from 'jszip';

export class XhtmlToZip {
    static async zipXhtml(filename: string, xhtml: string): Promise<Buffer> {
        const zip = new JSZip();
        zip.file(filename, xhtml);
        return await zip.generateAsync({ type: "nodebuffer" });
    }
}
