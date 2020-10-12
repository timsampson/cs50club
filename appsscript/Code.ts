
function doGet(e: any) {
    return HtmlService.createTemplateFromFile("index").evaluate();
}

function include(filename: string) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}