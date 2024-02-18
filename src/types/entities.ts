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

export interface Rules {
    [tag: string]: {
        [key: string]: string
    }
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
