import { Xib2Swift } from './builders/xib2swift';
import { argv } from 'process';
import { ParserConfiguration } from './types/entities';
import { readFileSync, writeFileSync } from 'fs';

function resolveArgs() {
    if (argv.length < 3) {
        console.log('Oops! Insufficient args provided.');
        console.log('For usage details: xib-to-swift-converter --help');
        process.exit(1);
    }
    let xibPath = argv[2];
    let configPath = ''
    let outputPath = '';
    argv.forEach((val, index) => {
        if (val == '-h' || val == '--help') {
            console.log('Basic usage: xib-to-swift-converter <path-to-xib-file>');
            console.log('Options:');
            console.log(' -p, --path <path-to-xib-file> [Required] Path to xib file.');
            console.log(' -o, --output-path <path-to-output-swift-file> [Optional] Provide Corresponding swift(View/ViewController) file path to inject View Declarations, Hierarchy and Constraints inplace.');
            console.log(' -c, --config <path-to-config-json-file>  [Optional] Path to a json file containing parser configuration. Incase not provided, default config will be used. Check README for more details.');
            console.log(' -h, --help  Display this help message.');
            process.exit(0);
        }
        else if (val == '-p' || val == '--path') {
            xibPath = argv[index + 1];
        }
        else if (val == '-o' || val == '--output-path') {
            outputPath = argv[index + 1];
        }
        else if (val == "-c" || val == "--config") {
            configPath = argv[index + 1];
        }
    });

    let configuration: ParserConfiguration = {};
    if (configPath != '') {
        try {
            let configFile = readFileSync(configPath, 'utf8');
            configuration = JSON.parse(configFile);
        } catch (error) {
            configuration = {};
            console.log(' Opps! Error while parsing provided configuration file. ');
            console.log(' Error log:', error);
            console.log('\n\n Fear not! Going ahead with default configuration for now.\n');
        }
    }

    let convertedCode = '';
    if (xibPath != '') {
        let xibFile = readFileSync(xibPath, 'utf8');
        let xib2swift = new Xib2Swift(xibFile, configuration);
        let swiftFile = ''
        if (outputPath != '') {
            swiftFile = readFileSync(outputPath, 'utf8');
        }
        if (swiftFile != '') {
            convertedCode = xib2swift.convertWithSwiftFile(swiftFile);
        } else {
            convertedCode = xib2swift.convert();
        }
    }

    if (outputPath != '') {
        writeFileSync(outputPath.replace(".swift", '') + ".swift", convertedCode);
        console.log(' Success! Output is written to file : ' + outputPath);
        console.log(' Make sure you delete xib file and make necessary changes needed in swift file, if any ! ');
    } else {
        console.log(' Success! Here is the converted code : \n');
        console.log(convertedCode);
    }
}

resolveArgs();
