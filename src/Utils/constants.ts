export const RegularExpressions = {
    IBOUTLET_VARNAME: (variableName: string) => {
        const basePattern: string = '.*@IBOutlet\\s+\\S+(\\s+\\S+)*\\s+';
        return new RegExp(basePattern + variableName + ':.*');
    }
}

export const AnotationConstants = {
    IB_ACTION: '@IBAction',
    OBJC: '@objc'
}
