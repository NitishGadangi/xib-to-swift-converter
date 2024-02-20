import { ParserConfiguration, PropertiesToCast, PropertiesToIgnore, PropertyDeclarationsToIgnore } from "../types/entities";
import { DefaultParserConfig } from "./default_config";

export class RuleEngine {
    private readonly parserConfig: ParserConfiguration;

    constructor(configuration: ParserConfiguration = {}) {
        this.parserConfig = configuration;
    }

    // setup function name in the extension class
    public setupFunctionName(): string {
        return this.parserConfig.setupFunctionName ?? DefaultParserConfig.setupFunctionName;
    }

    // tags in xib that can be ignored
    public shouldIgnoreTag(tag: string): boolean {
        const ignoredTags: string[] = this.parserConfig.tagsToIgnore ?? DefaultParserConfig.tagsToIgnore;
        return ignoredTags.includes(tag);
    }

    // properties + value combinations to ignore
    public shouldIgnorePropertyDeclaration(tag: string, key: string, declaration: string): boolean {
        const propertyDeclarationsToIgnore: PropertyDeclarationsToIgnore = this.parserConfig.propertyDeclarationsToIgnore ?? DefaultParserConfig.propertyDeclarationsToIgnore;
        return declaration.trim() == `${tag}.${propertyDeclarationsToIgnore[key]}`
    }

    // properties to ignore under each tag
    public shouldIgnoreProperty(tag: string, key: string): boolean {
        const propertiesToIgnore: PropertiesToIgnore = this.parserConfig.propertiesToIgnore ?? DefaultParserConfig.propertiesToIgnore;
        let ignoredProperties = propertiesToIgnore['common'].concat(propertiesToIgnore[tag]);
        return ignoredProperties.includes(key);
    }

    // xib properties which are named differently in swift uikit
    public castPropertyIfNeeded(tag: string, key: string): string {
        const propertiesToCast: PropertiesToCast = this.parserConfig.propertiesToCast ?? DefaultParserConfig.propertiesToCast;
        if (propertiesToCast[tag] != undefined && propertiesToCast[tag][key] != undefined) {
            return propertiesToCast[tag][key];
        }
        return propertiesToCast['common'][key] ?? key;
    }
}
