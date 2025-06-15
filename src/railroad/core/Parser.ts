// src/railroad/core/Parser.ts

export class Parser {
    grammar: string;

    constructor(grammar: string) {
        this.grammar = grammar;
    }

    parse(): any {
        // Implement EBNF parsing logic here
        // For now, just return grammar string
        return this.grammar;
    }
}
