import { Response } from 'express';

export class Download {
    static downloadFile(res: Response, filename: string, data: Buffer | string, contentType: string): void {
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(data);
    }
}
