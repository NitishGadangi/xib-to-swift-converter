import { ParserConfiguration } from "../types/entities";
import { DefaultParserConfig } from "./default_config";

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

export const DEFAULT_PARSER_CONFIG: ParserConfiguration = {
    setupFunctionName: DefaultParserConfig.setupFunctionName,
    tagsToIgnore: DefaultParserConfig.tagsToIgnore,
    propertyDeclarationsToIgnore: DefaultParserConfig.propertyDeclarationsToIgnore,
    propertiesToIgnore: DefaultParserConfig.propertiesToIgnore,
    propertiesToCast: DefaultParserConfig.propertiesToCast
}
