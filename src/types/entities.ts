/**
 * Interface thats represent a tag with his attributes from xib 
 */
export interface XibNode {
    tag: string,
    attrs: {
        [key: string]: string
    }
    content: XibNode[],
    father?: XibNode
}

export interface Outlet {
    property: string,
    id: string
}

export interface IDtoName {
    [id: string]: string
}

export interface AditionalConfiguration {
    [tag: string]: {
        [key: string]: () => string
    }
}

export interface Constraints {
    [element: string]: Constraint[]
}

export interface Constraint {
    anchor: string,
    declaration: string
}

export interface UIDeclaraitonConfig {
    visibliityModifier: string,
    type: string,
    intializationMethod: string,
    beforeInstaceProperties: string,
}

export interface UIDeclaration {
    viewName: string,
    declaration: string
}

export interface PropertiesToCast {
    [tag: string]: {
        [key: string]: string
    }
}

export interface PropertyDeclarationsToIgnore {
    [key: string]: string;
}

export interface PropertiesToIgnore {
    [key: string]: string[];
}

export interface ParserConfiguration {
    setupFunctionName?: string;
    tagsToIgnore?: string[];
    propertyDeclarationsToIgnore?: PropertyDeclarationsToIgnore;
    propertiesToIgnore?: PropertiesToIgnore;
    propertiesToCast?: PropertiesToCast;
}
