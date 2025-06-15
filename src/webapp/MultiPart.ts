// src/webapp/MultiPart.ts

export class MultiPart {
    name: string;
    filename?: string;
    contentType?: string;
    data: Buffer;

    constructor(name: string, data: Buffer, filename?: string, contentType?: string) {
        this.name = name;
        this.data = data;
        this.filename = filename;
        this.contentType = contentType;
    }
}
