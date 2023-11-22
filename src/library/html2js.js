export default function convertHtmlToJs(html, parentName = 'PARENT') {

    // Create a document from the HTML string.
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    let elementNodeNumber = 1;
    let textNodeNumber = 1;
    // Initialize the JS code with an empty string.
    let js = '';

    // Recursively convert each node under the body into JavaScript code.
    for (let child of doc.body.childNodes) {
       generateNodeCode(child, parentName);
    }
    return js;

    function generateNodeCode(node, parentExpression) {

        // Generate code for element nodes.
        if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();
            const varName = `${tagName}${elementNodeNumber++}`; // Unique variable name

            js += `const ${varName} = document.createElement('${tagName}');\n`;

            // Code for setting attributes.
            for (let attr of node.attributes) {
                js += `${varName}.setAttribute('${attr.name}', '${attr.value}');\n`;
            }

            // Code for appending to parent.
            js += `${parentExpression}.appendChild(${varName});\n\n`;

            // Generate code for each child node, using the current node as the parent.
            for (let child of node.childNodes) {
                generateNodeCode(child, varName);
            }
        }

        // Generate code for text nodes.
        else if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue.trim();
            if (text !== '') {
                const textNodeVar = `text${textNodeNumber++}`; // Unique variable name
                js += `const ${textNodeVar} = document.createTextNode('${text}');\n`;
                js += `${parentExpression}.appendChild(${textNodeVar});\n\n`;
            }
        }


    }
}
