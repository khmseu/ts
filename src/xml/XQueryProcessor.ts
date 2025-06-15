import { evaluateXPathToString } from 'fontoxpath';
import { readFileSync } from 'fs';
import { DOMParser } from 'xmldom';

export class XQueryProcessor {
    evaluate(xqueryPath: string, xmlString: string, contextVars: Record<string, any> = {}): string {
        // Load the .xq file from disk
        const xquery = readFileSync(xqueryPath, "utf-8");
        const doc = new DOMParser().parseFromString(xmlString, "text/xml");
        // Evaluate the XQuery (actually XPath here, as fontoxpath supports XPath 3.1)
        // For true XQuery you may need xquery-evaluator or a full XQuery processor.
        // Example for fontoxpath:
        return evaluateXPathToString(xquery, doc, null, contextVars);
    }
}
