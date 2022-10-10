const SaxonJS = require('saxon-js');

const JSONFileGeneral = require('./report.sef.json');
const JSONFileClient = require('./reportclient.sef.json');

async function GenerateHTML(XML, typeReport) {
    let Doc = await SaxonJS.transform({
        stylesheetText: typeReport == "General" ? JSON.stringify(JSONFileGeneral) : JSON.stringify(JSONFileClient),
        sourceText: XML,
        destination: "serialized"
    }, "async");

    return Doc.principalResult;
}

module.exports = { GenerateHTML };
