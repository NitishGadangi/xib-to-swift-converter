import { Xib2Swift } from "../src/builders/xib2swift";
import { ParserConfiguration } from "../src/types/entities";
import { DEFAULT_PARSER_CONFIG } from "../src/utils/constants";

const form = document.getElementById('converterForm') as HTMLFormElement;
form.addEventListener('submit', generate);

const configurationElement = document.getElementById("configuration") as HTMLTextAreaElement;
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayConfiguration();
});

function generate(event: Event) {
    event.preventDefault()
    console.log("Generating output...");
    
    const xibInputElement = document.getElementById("xib-code") as HTMLTextAreaElement;
    const swiftCodeElement = document.getElementById("swift-code") as HTMLTextAreaElement;
    const outputElement = document.getElementById("output-code") as HTMLTextAreaElement;

    const configData = configurationElement.value;
    let configuration: ParserConfiguration = {};
    try {
        configuration = JSON.parse(configData);
    } catch (error) {
        configuration = {};
        console.log('Opps! Error while parsing provided configuration file. ');
        console.error('Error log:', error);
        console.log('Fear not! Going ahead with default configuration for now.');
    }
    let xibCode = xibInputElement.value;
    let swiftCode = swiftCodeElement.value;
    let xib2swift = new Xib2Swift(xibCode, configuration);

    let viewcode = '';
    if (swiftCode != '') {
        viewcode = xib2swift.convertWithSwiftFile(swiftCode);
    } else {
        viewcode = xib2swift.convert();
    }
    outputElement.value = viewcode;
}

function fetchAndDisplayConfiguration() {
    try {
        configurationElement.value = JSON.stringify(DEFAULT_PARSER_CONFIG, null, 4);
    } catch (error) {
        console.error('Error fetching Parser Config:', error);
    }
}
