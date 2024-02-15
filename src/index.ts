import { Xib2Swift } from './builders/xib2swift';
import { argv } from 'process';

function resolveArgs() {
    if (argv.length < 3) {
        console.log('For usage details: xib-to-swift-converter --help');
        process.exit(1);
    }
    let path = argv[2];
    let xibString = '';
    let outputPath = '';
    argv.forEach((val, index) => {
        if (val == '-h' || val == '--help') {
            console.log('Basic usage: xib-to-swift-converter <path-to-xib-file>');
            console.log('Options:');
            console.log(' -p, --path <path-to-xib-file>  Path to xib file');
            console.log(' -o, --output-path <path-to-output-swift-file> Provide Corresponding swift(View/ViewController) file path to inject View Declarations, Hierarchy and Constraints inplace.');
            console.log(' -x, --xib-string <xib-string>  xib string');
            console.log(' -h, --help  Display this help message');
            process.exit(0);
        }
        else if (val == '-p' || val == '--path') {
            path = argv[index + 1];
        }
        else if (val == "-x" || val == "--xib-string") {
            xibString = argv[index + 1];
        }
        else if (val == '-o' || val == '--output-path') {
            outputPath = argv[index + 1];
        }
    });

    let convertedCode = '';
    if (xibString != '') {
        let xib2swift = new Xib2Swift(xibString);
        convertedCode = xib2swift.convert();
    }
    else if (path != '') {
        const fs = require('fs');
        let xibFile = fs.readFileSync(path, 'utf8');
        let xib2swift = new Xib2Swift(xibFile);
        let swiftFile = '' 
        if (outputPath != '') {
            swiftFile = fs.readFileSync(outputPath, 'utf8');
        }
        if (swiftFile != '') {
            convertedCode = xib2swift.convertWithSwiftFile(swiftFile);
        } else {
            convertedCode = xib2swift.convert();
        }
    }
    
    if (outputPath != '') {
        const fs = require('fs');
        fs.writeFileSync(outputPath.replace(".swift",'')+".swift", convertedCode);
        console.log(' Success! Output is written to file : ' + outputPath);
        console.log(' Make sure you delete xib file and make necessary changes needed in swift file, if any ! ');
        console.log(' Check for any indentation errors. You can fix them by using CMD A + Ctrl I . ');
    } else {
        console.log(convertedCode);
    }
}

resolveArgs();
