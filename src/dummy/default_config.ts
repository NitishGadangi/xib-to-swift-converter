import { PropertiesToCast, PropertiesToIgnore, PropertyDeclarationsToIgnore } from "../types/entities";

export class DefaultParserConfig {
    static readonly setupFunctionName: string = 'setupGeneratedViews';

    static readonly tagsToIgnore: string[] = [];

    static readonly propertyDeclarationsToIgnore: PropertyDeclarationsToIgnore = {
        opaque: 'isOpaque = false',
        userInteractionEnabled: 'isUserInteractionEnabled = false',
        customClass: 'customClass =',
        horizontalHuggingPriority: 'setContentHuggingPriority(UILayoutPriority(251), for: .horizontal)',
        verticalHuggingPriority: 'setContentHuggingPriority(UILayoutPriority(251), for: .vertical)',
        horizontalCompressionResistancePriority: 'setContentCompressionResistancePriority(UILayoutPriority(250), for: .horizontal)',
        verticalCompressionResistancePriority: 'setContentCompressionResistancePriority(UILayoutPriority(250), for: .vertical)'
    }

    static readonly propertiesToIgnore: PropertiesToIgnore = {
        label: ['minimumFontSize'],
        button: ['buttonType', 'lineBreakMode'],
        imageView: ['catalog'],
        tableView: ['style'],
        collectionView: ['dataMode'],
        common: ['fixedFrame', 'id', 'adjustsLetterSpacingToFitWidth', 'customModule', 'customModuleProvider', 'misplaced', 'userLabel'],
    }

    static readonly propertiesToCast: PropertiesToCast = {
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
}
