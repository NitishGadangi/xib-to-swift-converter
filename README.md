<p align="center">
  <a href="#">
    <img src="https://github.com/NitishGadangi/xib-to-swift-converter/blob/master/xib_to_swift_logo.png?raw=true" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Xib To Swift Converter</h3>

  <p align="center">
    Transform your .xib and storyboard blueprints into elegant Swift View Code with just a single click!
    <br />
    <br />
    <a href="#features">Explore Features</a>
    .
   <a href="https://github.com/NitishGadangi/xib-to-swift-converter/releases">Download Executable</a>
  
  <h4 align="center">Try out the tool now! Just use the <a href="https://nitishgadangi.github.io/xib-to-swift-converter/">Online Converter</a>.</h3>
  </p>
</p>
<hr/>
<br>

We all struggle with legacy `XIB` and `storyboard` files in our projects. While Apple encourages the use of storyboard and XIB files by default, the community increasingly favors writing UI code in Swift due to its **enhanced readability, maintainability, and faster build times.**

This tool will help you get rid of all your legacy XIB and storyboard files and migrate them into Swift code with **one click**!

## Features
- **One click Convert** : Provide XIB file and you will get the Swift Code.
- **Inplace Conversion** : You can provide the supporting Swift file and all its `@IBOutlets`, `@IBActions` will be replaced with `View Declarations` along with `View Heirarchy` and `Constraints Setup` Code.
- **Parser Configuration** : You can customise how parser converts the XIB file. Read more in the below section.
- **Recursive Convert** (coming soon) : Provide a path to parent directly and all the XIB files will be migrated into its corresponding Swift files in one click.
- **AutoLayout DSL Support** (coming soon) : Select your favorite Auto Layout Libraries/DSLs ([Cartography](https://github.com/robb/Cartography), [SnapKit](https://github.com/SnapKit/SnapKit), [KeepLayout](https://github.com/iMartinKiss/KeepLayout)) to generate Constraints based on them.
- **Online & Offline support**: You can use the tool via [online converter](https://nitishgadangi.github.io/xib-to-swift-converter/) or go ahead [download executable](https://github.com/NitishGadangi/xib-to-swift-converter/releases) and enjoy all the features standalone.

## Parser Configuration
You can provide custom configuration to the parser to allow it to ignore, cast or output few elements of the code as per your requirement. This is possible both while using the online converter or the executable (by providing a `.json` config file).

Currently you can configure following items
1. `setupFunctionName` : Name of the function which handles setup of view heirarchy, view config and constraints. This function is defined in a class extension.
2. `tagsToIgnore` : List of tags with in XIB file that can be ignored by the parser.
3. `propertyDeclarationsToIgnore` : A few property declarations (property name + value) are unnecessary for any views. Those declarations can be added here.
4. `propertiesToIgnore` : For each view there can be a particular list of properties which are defined in XIBs are but necessary to have them in Swift Code output. Those properties can be added here corresponding to each view or under common section
5. `propertiesToCast` : For a few properties there is difference in their names when compared in XIB and Swift output. Those properties and corresponding name in swift can be added here.

The following is the default configuration which is used by parser:

```json
{
    "setupFunctionName": "setupGeneratedViews",
    "tagsToIgnore": [],
    "propertyDeclarationsToIgnore": {
        "opaque": "isOpaque = false",
        "userInteractionEnabled": "isUserInteractionEnabled = false",
        "customClass": "customClass =",
        "horizontalHuggingPriority": "setContentHuggingPriority(UILayoutPriority(251), for: .horizontal)",
        "verticalHuggingPriority": "setContentHuggingPriority(UILayoutPriority(251), for: .vertical)",
        "horizontalCompressionResistancePriority": "setContentCompressionResistancePriority(UILayoutPriority(250), for: .horizontal)",
        "verticalCompressionResistancePriority": "setContentCompressionResistancePriority(UILayoutPriority(250), for: .vertical)"
    },
    "propertiesToIgnore": {
        "label": [
            "minimumFontSize"
        ],
        "button": [
            "buttonType",
            "lineBreakMode"
        ],
        "imageView": [
            "catalog"
        ],
        "tableView": [
            "style"
        ],
        "collectionView": [
            "dataMode"
        ],
        "common": [
            "fixedFrame",
            "id",
            "adjustsLetterSpacingToFitWidth",
            "customModule",
            "customModuleProvider",
            "misplaced",
            "userLabel"
        ]
    },
    "propertiesToCast": {
        "label": {
            "adjustsFontSizeToFit": "adjustsFontSizeToFitWidth"
        },
        "slider": {
            "minValue": "minimumValue",
            "maxValue": "maximumValue"
        },
        "collectionView": {
            "multipleTouchEnabled": "isMultipleTouchEnabled",
            "directionalLockEnabled": "isDirectionalLockEnabled",
            "pagingEnabled": "isPagingEnabled",
            "prefetchingEnabled": "isPrefetchingEnabled"
        },
        "common": {
            "clipsSubviews": "clipsToBounds",
            "opaque": "isOpaque",
            "userInteractionEnabled": "isUserInteractionEnabled"
        }
    }
}
```

## Online Converter vs Executable
As mentioned you can use this tool online at : https://nitishgadangi.github.io/xib-to-swift-converter/

Or else, You can download the executable file from the [releases](https://github.com/NitishGadangi/xib-to-swift-converter/releases) section.
- Executable has a few extra features and it gives you the privilage of using it via terminal.
- To start with, with in the directory of executable open terminal and try running `./xib-to-swift-converter-macos --help`
- On mac, if you face any issue related to app verification. Try `xattr -d com.apple.quarantine ./xib-to-swift-converter-macos`

<!-- ## How it works ?
Will update soon -->

## Known Issues
Its always advisable to do enough testing on the generated code before pushing it to production.

However, here are some of the Known Issues
- Currently, there is no support to resolve `NSLayoutConstraint` when they are used via `IBOutlets`. [ *This support will soon be added.* ]
- A few instances the constraints were breaking or might be missing. [ *This issue will be resolved in next release.* ]
- Rest.. You say ! Feel free to [raise a bug here](https://github.com/NitishGadangi/xib-to-swift-converter/issues), whenever you face any issue.

## Contribute
You can setup the project and start building in a few simple steps
1. Make sure `node` and `npm` are setup on your machine.
2. Within the projects root directory.
   ```bash
   npm install
   ```
3. To build for web. Run the below command and open `./website/index.html` file in any Web Browser.
    ```bash
    npm run build-web
    ```
4. To build executable files
    ```bash
    npm run build-release 
    ```
Feel free to submit a Pull Request with you changes along with a proper desciption. Would be more than happy to assist you in getting it merged.

## Credits
Multiple elements of this project are inspired from [vinicius-caputo's project](https://github.com/vinicius-caputo/xib2swift). Kudos to him 🙌.
