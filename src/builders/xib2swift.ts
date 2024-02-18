import { UIDeclarationsGen } from '../resolvers/ui_declarations_resolver';
import { ViewHierachyGen } from '../resolvers/view_hierarchy_resolver';
import { ConstraintsDeclaritonsGen } from '../resolvers/constraints_resolver';
import { Xib } from '../types/xib_model';
import { UIDeclaration } from '../types/entities';
import { AnotationConstants, RegularExpressions } from '../utils/constants';
import { buildUIDeclarationsInClass, buildViewSetupCode, indentRelativeToSource } from '../utils/utils';

export class Xib2Swift {
    private readonly xib: Xib;
    private readonly uiDeclarations: string;
    private readonly uiDeclarationsAsList: UIDeclaration[];
    private readonly viewHierarchy: string;
    private readonly constraintDeclarations: string;
    private readonly baseViewProperties: string;

    constructor(xibFile: string) {
        this.xib = new Xib(xibFile);
        const subviews = this.xib.subviews;
        const uiDeclarationsGenerator = new UIDeclarationsGen();
        const viewHierarchyGenerator = new ViewHierachyGen();
        const constraintsGenerator = new ConstraintsDeclaritonsGen();
        this.uiDeclarations = uiDeclarationsGenerator.generateUIDeclarations(subviews);
        this.uiDeclarationsAsList = uiDeclarationsGenerator.generateUIDelarationsAsList(subviews);
        this.viewHierarchy = viewHierarchyGenerator.generateCompleteViewHierachy(subviews);
        this.baseViewProperties = uiDeclarationsGenerator.genereteBaseViewProperties(this.xib.baseView);
        this.constraintDeclarations = constraintsGenerator.generateConstraintsDeclarations(this.xib.constraints);
    }

    public convertAsNoob(): string {
        return '\n// MARK: - UI Elements\n' + this.uiDeclarations +
            '\n// MARK: - View Hierachy\n\n' + this.viewHierarchy +
            '\n// MARK: - Constrains\n\n' + this.constraintDeclarations +
            '\n// MARK: - Base View Properties\n\n' + this.baseViewProperties.replaceAll('\t', '');
    }

    public convert(): string {
        let uiDeclarationsInClass: string = buildUIDeclarationsInClass(this.xib.className, this.xib.parentClassName, this.uiDeclarations);
        let viewSetupCode: string = buildViewSetupCode(this.xib.className, this.baseViewProperties, this.viewHierarchy, this.constraintDeclarations);
        return uiDeclarationsInClass +
            '\n// TODO: Dont forget to add setupViews func in init, viewDidLoad\n' +
            '// TODO: Incase any indentation error, use shortcut Cmd A + Ctrl I to fix\n' +
            viewSetupCode;
    }

    public convertWithSwiftFile(inputSwiftCode: string): string {
        let swiftCodeWithOutletsReplaced: string = this.replaceOutletsWithUIDeclarations(inputSwiftCode);
        let viewSetupCode: string = buildViewSetupCode(this.xib.className, this.baseViewProperties, this.viewHierarchy, this.constraintDeclarations);
        return swiftCodeWithOutletsReplaced +
            '\n// TODO: Dont forget to add setupViews func in init, viewDidLoad\n' +
            '// TODO: Incase any indentation error, use shortcut Cmd A + Ctrl I to fix\n' +
            viewSetupCode;
    }

    private replaceOutletsWithUIDeclarations(swiftFile: string): string {
        let swiftFileAsArray: string[] = swiftFile.split('\n');
        let replacedDeclarations: string[] = [];
        let lastReplacedIndex = swiftFileAsArray.length - 1;

        // inject viewDeclarations inplace of IBOutlets
        swiftFileAsArray.forEach((codeLine, codeIdx) => {
            for (let decIdx = 0; decIdx < this.uiDeclarationsAsList.length; decIdx++) {
                let uiDeclaration = this.uiDeclarationsAsList[decIdx];
                let regexPattern: RegExp = RegularExpressions.IBOUTLET_VARNAME(uiDeclaration.viewName);
                if (regexPattern.test(codeLine)) {
                    let uiDeclarationCode = indentRelativeToSource(codeLine, uiDeclaration.declaration.trim());
                    swiftFileAsArray[codeIdx] = uiDeclarationCode + '\n';
                    replacedDeclarations.push(uiDeclaration.viewName);
                    lastReplacedIndex = codeIdx;
                    break;
                }
            }
            let finalCodeLine = swiftFileAsArray[codeIdx];
            if (finalCodeLine.includes(AnotationConstants.IB_ACTION)) {
                swiftFileAsArray[codeIdx] = finalCodeLine.replace(AnotationConstants.IB_ACTION, AnotationConstants.OBJC);
            }
        });

        // append remaining viewDeclarations at the end, if any.
        let remainingDeclarations: string = ''
        this.uiDeclarationsAsList.forEach((uiDeclaration) => {
            if (!replacedDeclarations.includes(uiDeclaration.viewName)) {
                remainingDeclarations += uiDeclaration.declaration;
            }
        });
        if (remainingDeclarations != '') {
            remainingDeclarations = '\n// MARK: - Additional UI Elements\n' + remainingDeclarations.trim();
            let remainingDeclarationsCode = indentRelativeToSource(swiftFileAsArray[lastReplacedIndex], remainingDeclarations);
            swiftFileAsArray[lastReplacedIndex] += remainingDeclarationsCode;
        }

        return swiftFileAsArray.join('\n');
    }
}
