// src/railroad/core/ImgTranscoder.ts

import PDFDocument from 'pdfkit';
import sharp from 'sharp';

export class ImgTranscoder {
    // Abstract transcoder, base for BatikImgTranscoder, RsvgPngTranscoder, etc.
    static async transcode(svg: string, format: "png" | "pdf" = "png"): Promise<Buffer> {
        // Use sharp or similar in Node.js
        switch (format) {
            case "pdf":
                // 1. Bild (SVG) laden und in einen Buffer konvertieren mit Sharp (als PNG)
                const pngBuffer = await sharp(Buffer.from(svg))
                    .png() // Konvertiere SVG zu PNG, da pdfkit PNGs besser handhaben kann
                    .toBuffer();

                // 2. Neues PDF-Dokument erstellen
                const doc = new PDFDocument({
                    autoFirstPage: false, // Seite wird manuell hinzugefügt
                });

                // Buffer für das PDF erstellen
                const buffers: Buffer[] = [];
                doc.on('data', buffers.push.bind(buffers));

                // 3. Eine Seite zum PDF hinzufügen
                // Versuche, die Dimensionen aus dem SVG zu extrahieren, falls vorhanden
                let width = 595.28; // Standard A4 Breite in Punkten
                let height = 841.89; // Standard A4 Höhe in Punkten
                const widthMatch = svg.match(/width="([^"]+)"/);
                const heightMatch = svg.match(/height="([^"]+)"/);

                if (widthMatch && widthMatch[1]) {
                    const w = parseFloat(widthMatch[1]);
                    if (!isNaN(w)) width = w;
                }
                if (heightMatch && heightMatch[1]) {
                    const h = parseFloat(heightMatch[1]);
                    if (!isNaN(h)) height = h;
                }

                doc.addPage({ size: [width, height] });


                // 4. Bild in das PDF einbetten
                // Das Bild wird so skaliert, dass es auf die Seite passt, falls es größer ist
                doc.image(pngBuffer, 0, 0, {
                    fit: [width, height],
                    align: 'center',
                    valign: 'center'
                });

                // 5. PDF-Erstellung abschließen und Buffer zurückgeben
                return new Promise((resolve, reject) => {
                    doc.on('end', () => resolve(Buffer.concat(buffers)));
                    doc.on('error', reject);
                    doc.end();
                });

            default:
                return sharp(Buffer.from(svg)).png().toBuffer();
        }
    }
}
