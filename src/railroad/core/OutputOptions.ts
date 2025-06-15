// src/railroad/core/OutputOptions.ts

export interface OutputOptions {
    format: "svg" | "png" | "pdf";
    width?: number;
    height?: number;
    [key: string]: any;
}
