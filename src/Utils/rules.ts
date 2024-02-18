import { Rules } from "../types/entities";

// tags in xib that can be ignored
export function shouldIgnoreTag(tag: string): boolean {
    const ignoredTags: string[] = [];
    return ignoredTags.includes(tag);
}

// properties + value combinations to ignore
export function shouldIgnorePropertyDeclaration(tag: string, key: string, declaration: string): boolean {
    const propertyDeclarationsToIgnore: any = {
        opaque: 'isOpaque = false',
        userInteractionEnabled: 'isUserInteractionEnabled = false',
        customClass: 'customClass =',
        horizontalHuggingPriority: 'setContentHuggingPriority(UILayoutPriority(251), for: .horizontal)',
        verticalHuggingPriority: 'setContentHuggingPriority(UILayoutPriority(251), for: .vertical)',
        horizontalCompressionResistancePriority: 'setContentCompressionResistancePriority(UILayoutPriority(250), for: .horizontal)',
        verticalCompressionResistancePriority: 'setContentCompressionResistancePriority(UILayoutPriority(250), for: .vertical)'
    }
    return declaration.trim() == `${tag}.${propertyDeclarationsToIgnore[key]}`
}

// properties to ignore
export function shouldIgnoreProperty(tag: string, key: string): boolean {
    const propertyToIgnore: any = {
        label: ['minimumFontSize'],
        button: ['buttonType', 'lineBreakMode'],
        imageView: ['catalog'],
        tableView: ['style'],
        collectionView: ['dataMode'],
        common: ['fixedFrame', 'id', 'adjustsLetterSpacingToFitWidth', 'customModule', 'customModuleProvider', 'misplaced', 'userLabel'],
    }
    let ignoredProperties = propertyToIgnore['common'] + propertyToIgnore[tag];
    return ignoredProperties.includes(key);
}

// xib properties which are named differently in swift uikit
export function castPropertyIfNeeded(tag: string, key: string): string {
    const propertiesToCast: Rules = {
        label: {
            adjustsFontSizeToFit: 'adjustsFontSizeToFitWidth',
        },
        slider: {
            minValue: 'minimumValue',
            maxValue: 'maximumValue',
        },
        collectionView: {
            multipleTouchEnabled: 'isMultipleTouchEnabled',
            directionalLockEnabled: 'isDirectionalLockEnabled',
            pagingEnabled: 'isPagingEnabled',
            prefetchingEnabled: 'isPrefetchingEnabled',
        },
        common: {
            clipsSubviews: 'clipsToBounds',
            opaque: 'isOpaque',
            userInteractionEnabled: 'isUserInteractionEnabled',
        }
    }
    if (propertiesToCast[tag] != undefined && propertiesToCast[tag][key] != undefined) {
        return propertiesToCast[tag][key];
    }
    return propertiesToCast['common'][key] ?? key;
}
