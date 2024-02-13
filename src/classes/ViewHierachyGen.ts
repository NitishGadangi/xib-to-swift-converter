import { ignoredTags } from "../Utils/rules";
import { XibNode } from "../types";
import { resolveIdToPropetyName } from "./XibManipulator"

export class ViewHierachyGen {
    public generateViewHierachy(subview: XibNode) {
        let heriachyDeclaration: string = '';
        let fatherId = subview.father?.attrs.id;
        let addMethod = subview.father?.tag == 'stackView' ? 'addArrangedSubview' : 'addSubview';
        if (!fatherId) { return; }
        for (const node of subview.content) {
            if (!ignoredTags.includes(node.tag)) {
                heriachyDeclaration += `${resolveIdToPropetyName(fatherId)}.${addMethod}(${resolveIdToPropetyName(node.attrs.id)})\n`;
            }
        }
        return heriachyDeclaration;
    }

    public generateCompleteViewHierachy(subviews: XibNode[]) {
        let heriachyDeclaration: string = '';
        for (const subview of subviews) {
            heriachyDeclaration += this.generateViewHierachy(subview);
        }
        return heriachyDeclaration
    }
}
