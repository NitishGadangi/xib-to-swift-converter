import { Rules } from "../types/entities";

export const ignoredTags: string[] = []

// properties + value combinations to ignore
export const defaultRules: any = {
    opaque: 'isOpaque = false',
    userInteractionEnabled: 'isUserInteractionEnabled = false',
    customClass: 'customClass = ',
}

// properties to ignore
export function shouldIgnoreProperty(tag: string, key: string): boolean {
    const propertyToIgnore: any = {
        label: ['minimumFontSize'],
        button: ['buttonType', 'lineBreakMode'],
        imageView: ['catalog'],
        tableView: ['style'],
        collectionView: ['dataMode'],
        common: ['horizontalHuggingPriority', 'verticalHuggingPriority', 'horizontalCompressionResistancePriority', 'fixedFrame', 'id', 'adjustsLetterSpacingToFitWidth', 'customModule', 'customModuleProvider', 'misplaced', 'userLabel'],
    }
    let ignoredRules = propertyToIgnore['common'] + propertyToIgnore[tag];
    return ignoredRules.includes(key);
}

// xib properties which are named differently in swift uikit
export const rules: Rules = {
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
