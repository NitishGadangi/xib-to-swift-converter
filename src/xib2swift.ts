import { UIDeclarationsGen } from './classes/UIDeclarationsGen';
import { ViewHierachyGen } from './classes/ViewHierachyGen';
import { ConstraintsDeclaritonsGen } from './classes/ConstraintsDeclaritonsGen';
import { Xib } from './classes/XibManipulator';
import { UIDeclaration } from './types';
import { AnotationConstants, RegularExpressions } from './Utils/constants';

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

    public convert(): string {
        return '\n// MARK: - UI Elements\n' + this.uiDeclarations +
            '\n// MARK: - View Hierachy\n\n' + this.viewHierarchy +
            '\n// MARK: - Constrains\n\n' + this.constraintDeclarations +
            '\n// MARK: - Base View Properties\n\n' + this.baseViewProperties.replaceAll('\t', '');
    }

    public convertWithSwiftFile(inputSwiftCode: string): string {
        let swiftCodeWithOutletsReplaced: string = this.replaceOutletsWithUIDeclarations(inputSwiftCode);
        let viewSetupCode: string = this.buildViewSetupCode();
        return swiftCodeWithOutletsReplaced +
            '\n// TODO: add setupViews func in init, viewDidLoad\n' +
            '// TODO: This feature is still in Beta. Incase any indentation error, use shortcut Cmd A + Ctrl I to fix\n' +
            viewSetupCode;
    }

    private replaceOutletsWithUIDeclarations(swiftFile: string): string {
        let swiftFileAsArray: string[] = swiftFile.split('\n');
        let replacedDeclarations: string[] = [];
        let lastReplacedIndex = swiftFileAsArray.length - 1;
        for (let codeIdx = 0; codeIdx < swiftFileAsArray.length; codeIdx++) {
            let codeLine = swiftFileAsArray[codeIdx];
            for (let decIdx = 0; decIdx < this.uiDeclarationsAsList.length; decIdx++) {
                let uiDeclaration = this.uiDeclarationsAsList[decIdx];
                let regexPattern: RegExp = RegularExpressions.IBOUTLET_VARNAME(uiDeclaration.viewName);
                if (regexPattern.test(codeLine)) {
                    swiftFileAsArray[codeIdx] = uiDeclaration.declaration.trim() + '\n';
                    replacedDeclarations.push(uiDeclaration.viewName);
                    lastReplacedIndex = codeIdx;
                    break;
                }
            }
            let finalCodeLine = swiftFileAsArray[codeIdx];
            if (finalCodeLine.includes(AnotationConstants.IB_ACTION)) {
                swiftFileAsArray[codeIdx] = finalCodeLine.replace(AnotationConstants.IB_ACTION, AnotationConstants.OBJC);
            }
        }

        let remainingDeclarations: string = ''
        for (let decIdx = 0; decIdx < this.uiDeclarationsAsList.length; decIdx++) {
            let uiDeclaration = this.uiDeclarationsAsList[decIdx];
            if (replacedDeclarations.includes(uiDeclaration.viewName)) continue;
            remainingDeclarations += uiDeclaration.declaration;
        }
        swiftFileAsArray[lastReplacedIndex] += '\n// MARK: - Additional UI Elements\n' + remainingDeclarations;

        return swiftFileAsArray.join('\n');
    }

    private buildViewSetupCode(): string {
        return '' +
            'extension '+ this.xib.className +' {\n' +
            '\tfunc setupViews() {\n' +
            '\t\t' + this.baseViewProperties.replaceAll('\t', '') + '\n' +
            '\t\taddSubViews()\n' +
            '\t\tsetupConstraints()\n' +
            '\t}\n' +
            '\tfunc addSubViews() {\n' + 
            '\t\t' + this.viewHierarchy + '\n' +
            '\t}\n' +
            '\tfunc setupConstraints() {\n' +
            '\t\t' + this.constraintDeclarations + '\n' +
            '\t}\n' +
            '}\n';
    }
}
