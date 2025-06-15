// src/railroad/core/CrLfNormalizer.ts

export class CrLfNormalizer {
    static normalize(input: string): string {
        return input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    }
}
