import { UIDeclarationsGen } from './classes/UIDeclarationsGen';
import { ViewHierachyGen } from './classes/ViewHierachyGen';
import { ConstraintsDeclaritonsGen } from './classes/ConstraintsDeclaritonsGen';
import { Xib } from './classes/XibManipulator';
import { UIDeclaration } from './types';

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

    public convertWithSwiftFile(swiftFile: string): string {
        let setupViewsInExtension: string = '';

        return swiftFile + setupViewsInExtension;
    }
}
