import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "import statement forbidden";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new StrictWindowAccessRuleWalker(sourceFile, this.getOptions()));
    }
}

// The walker takes care of all the work.
class StrictWindowAccessRuleWalker extends Lint.RuleWalker {
    public visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
        const windowPropertiesToCheck = ['parent', 'opener', 'top'];
        const source = node.getFullText().trim();
        windowPropertiesToCheck.forEach((windowProperty) => {
            const match = source.match(new RegExp(`window\.${windowProperty}\.(.*)`));
            if (match) {
                const property = match[1];
                if (property.indexOf('postMessage') === -1) {
                    this.addFailureAt(node.getStart(), node.getWidth(),
                        `avoid access from window.${windowProperty} other properties than postMessage`);
                }
            }
        });

        // call the base version of this visitor to actually parse this node
        super.visitPropertyAccessExpression(node);
    }
}