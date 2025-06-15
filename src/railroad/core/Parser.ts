// src/railroad/core/Parser.ts

export type EbnfAst =
    | { type: "Grammar"; rules: RuleAst[] }
    | RuleAst
    | { type: "Alt"; options: EbnfAst[] }
    | { type: "Seq"; elements: EbnfAst[] }
    | { type: "Star"; expr: EbnfAst }
    | { type: "Plus"; expr: EbnfAst }
    | { type: "Opt"; expr: EbnfAst }
    | { type: "Terminal"; value: string }
    | { type: "NonTerminal"; name: string }
    | { type: "Group"; expr: EbnfAst };

export type RuleAst = { type: "Rule"; name: string; expr: EbnfAst };

export class Parser {
    private input: string;
    private pos: number = 0;

    constructor(input: string) {
        this.input = input;
    }

    parse(): EbnfAst {
        this.skipWS();
        const rules: RuleAst[] = [];
        while (!this.eof()) {
            rules.push(this.parseRule());
            this.skipWS();
        }
        return { type: "Grammar", rules };
    }

    private parseRule(): RuleAst {
        this.skipWS();
        const name = this.parseIdentifier();
        this.skipWS();
        this.expect("::=");
        this.skipWS();
        const expr = this.parseExpr();
        this.skipWS();
        if (this.peek() === ";") this.consume();
        return { type: "Rule", name, expr };
    }

    private parseExpr(): EbnfAst {
        let seq = [this.parseSeq()];
        this.skipWS();
        while (this.peek() === "|") {
            this.consume();
            this.skipWS();
            seq.push(this.parseSeq());
            this.skipWS();
        }
        return seq.length === 1 ? seq[0] : { type: "Alt", options: seq };
    }

    private parseSeq(): EbnfAst {
        const elements: EbnfAst[] = [];
        while (true) {
            this.skipWS();
            if (
                this.peek() === undefined ||
                this.peek() === "|" ||
                this.peek() === ";" ||
                this.peek() === ")"
            ) {
                break;
            }
            elements.push(this.parseFactor());
            this.skipWS();
        }
        return elements.length === 1 ? elements[0] : { type: "Seq", elements };
    }

    private parseFactor(): EbnfAst {
        this.skipWS();
        let atom = this.parseAtom();
        this.skipWS();
        const ch = this.peek();
        if (ch === "*") {
            this.consume();
            return { type: "Star", expr: atom };
        } else if (ch === "+") {
            this.consume();
            return { type: "Plus", expr: atom };
        } else if (ch === "?") {
            this.consume();
            return { type: "Opt", expr: atom };
        } else {
            return atom;
        }
    }

    private parseAtom(): EbnfAst {
        this.skipWS();
        const ch = this.peek();
        if (ch === "'") {
            return { type: "Terminal", value: this.parseString() };
        } else if (ch === '"') {
            return { type: "Terminal", value: this.parseString() };
        } else if (ch === "(") {
            this.consume();
            const expr = this.parseExpr();
            this.skipWS();
            this.expect(")");
            return { type: "Group", expr };
        } else if (this.isIdentifierStart(ch)) {
            return { type: "NonTerminal", name: this.parseIdentifier() };
        } else {
            throw new Error(
                `Unexpected character '${ch}' at position ${this.pos} in atom`
            );
        }
    }

    private parseIdentifier(): string {
        this.skipWS();
        let start = this.pos;
        let ch = this.peek();
        if (!this.isIdentifierStart(ch)) {
            throw new Error(
                `Expected identifier at position ${this.pos}, found '${ch}'`
            );
        }
        this.consume();
        while (this.isIdentifierPart(this.peek())) this.consume();
        return this.input.slice(start, this.pos);
    }

    private parseString(): string {
        this.skipWS();
        const quote = this.peek();
        if (quote !== "'" && quote !== '"')
            throw new Error(
                `Expected string at position ${this.pos}, found '${quote}'`
            );
        this.consume();
        let value = "";
        while (!this.eof() && this.peek() !== quote) {
            if (this.peek() === "\\") {
                this.consume();
                if (this.eof()) throw new Error("Unterminated escape in string");
                value += this.consume();
            } else {
                value += this.consume();
            }
        }
        if (this.peek() !== quote)
            throw new Error("Unterminated string literal");
        this.consume();
        return value;
    }

    private expect(str: string): void {
        this.skipWS();
        for (let i = 0; i < str.length; i++) {
            if (this.input[this.pos + i] !== str[i]) {
                throw new Error(
                    `Expected '${str}' at position ${this.pos}, found '${this.input.slice(
                        this.pos,
                        this.pos + str.length
                    )}'`
                );
            }
        }
        this.pos += str.length;
    }

    private skipWS(): void {
        while (
            !this.eof() &&
            (this.peek() === " " ||
                this.peek() === "\t" ||
                this.peek() === "\n" ||
                this.peek() === "\r")
        ) {
            this.consume();
        }
        // Comments: //... or #... to end of line
        while (
            !this.eof() &&
            (this.input.startsWith("//", this.pos) ||
                this.input.startsWith("#", this.pos))
        ) {
            while (!this.eof() && this.peek() !== "\n") this.consume();
            this.skipWS();
        }
    }

    private peek(): string | undefined {
        return this.input[this.pos];
    }
    private consume(): string {
        return this.input[this.pos++];
    }
    private eof(): boolean {
        return this.pos >= this.input.length;
    }

    private isIdentifierStart(ch: string | undefined): boolean {
        return !!ch && /[A-Za-z_]/.test(ch);
    }
    private isIdentifierPart(ch: string | undefined): boolean {
        return !!ch && /[A-Za-z0-9_]/.test(ch);
    }
}
