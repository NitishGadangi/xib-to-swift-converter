export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowerFirstletter(string: string): string {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

export function indentRelativeToSource(source: string, destination: string): string {
    let indentationString = getSubstringBeforeFirstNonWhitespace(source);
    return appendToEveryNewLine(indentationString, destination);
}

export function appendToEveryNewLine(source: string, destination: string): string {
    let outputArray = destination.split('\n');
    outputArray = outputArray.map((outputItem) => {
        return source + outputItem;
    });
    return outputArray.join('\n');
}

export function getSubstringBeforeFirstNonWhitespace(inputString: string): string {
    let substring = '';
    for (let i = 0; i < inputString.length; i++) {
        let testString = inputString[i];
        if (!/\s/.test(testString)) {
            substring = inputString.substring(0, i);
            break;
        }
    }
    return substring;
}

export function buildViewSetupCode(className: string, baseViewProperties: string, viewHierarchy: string, constraintDeclarations: string): string {
    baseViewProperties = baseViewProperties.replaceAll('\t', '');
    return '' +
        'extension '+ className +' {\n' +
        '\tfunc setupViews() {\n' +
        appendToEveryNewLine('\t\t', baseViewProperties)  + '\n' +
        '\t\taddSubViews()\n' +
        '\t\tsetupConstraints()\n' +
        '\t}\n\n' +
        '\tfunc addSubViews() {\n' + 
        appendToEveryNewLine('\t\t', viewHierarchy) + '\n' +
        '\t}\n\n' +
        '\tfunc setupConstraints() {\n' +
        appendToEveryNewLine('\t\t', constraintDeclarations) + '\n' +
        '\t}\n' +
        '}\n';
}
