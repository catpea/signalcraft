function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+|-/g, '');
}

export default function transform(html, parentName = 'PARENT') {

    // Create a document from the HTML string.
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const numbers = {};
    function getNumber(tagName){
      if(!numbers[tagName]){
        numbers[tagName] = 1;
        return ""; // first time we do not use a number at all;
      }

      return ++numbers[tagName];
    }

    // Initialize the JS code with an empty string.
    let js = '';

    // Recursively convert each node under the body into JavaScript code.
    for (let child of doc.body.childNodes) {
       generateNodeCode(child, parentName, null);
    }
    return js;



    function generateNodeCode(node, parentExpression, nameSpace) {

    const nameSpaceURI = 'http://www.w3.org/2000/svg';

    // Generate code for element nodes.
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Get the tag name and generate unique variable name
      const tagName = node.tagName.toLowerCase();
      let varName = `${tagName}${getNumber(tagName)}`;

      if(node.className){
        varName = camelize(node.className)
        varName += getNumber(varName);
      }

      // Check if current tag belongs to SVG
      // if it does use 'createElementNS', otherwise use 'createElement'

      let elementAttributes = '';
      const attributeArray = [];
      for (let attr of node.attributes) {
        const {name, value} = attr;
        attributeArray.push({name, value})
      }
      if(attributeArray.length){
        elementAttributes = `, {${attributeArray.map(({name, value})=>`${camelize(name)}: '${value}'`).join(', ')}}`
      }



      if (tagName === 'svg' || parentExpression.startsWith('svg') || nameSpace) {
        nameSpace = nameSpaceURI;
        js += `const ${varName} = svg('${tagName}'${elementAttributes});\n`;
      } else {
        js += `const ${varName} = html('${tagName}'${elementAttributes});\n`;
      }



      // Set attributes and append to parent
      // for (let attr of node.attributes) {
      //   attributeObject[attr.name] = attr.value
      //   js += `${varName}.setAttribute('${attr.name}', '${attr.value}');\n`;
      //
      // }

      js += `${parentExpression}.appendChild(${varName});\n\n`;

      // Generate code for each child node
      for (let child of node.childNodes) {
        generateNodeCode(child, varName, nameSpace);
      }
    }

    else if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue.trim();
      if (text !== '') {
        const textNodeVar = `text${getNumber('text')}`;
        js += `const ${textNodeVar} = text('${text}');\n`;
        js += `${parentExpression}.appendChild(${textNodeVar});\n\n`;
      }
    }
  }

}


class LiveREPL extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      textarea {
        width: calc(50% - 10px);
        height: 300px;
      }
      #output {
        float: right;
      }
    </style>
    <textarea id="input"></textarea>
    <textarea id="output" readonly></textarea>
    `;

    this.inputElement = this.shadowRoot.querySelector('#input');
    this.outputElement = this.shadowRoot.querySelector('#output');

    this.inputElement.addEventListener('keyup', this.transformInput.bind(this));
  }

  transformInput(e) {
    try {
      const result = transform(e.target.value); // Assuming transform is a global function
      this.outputElement.value = result;
    } catch (err) {
      this.outputElement.value = `Error: ${err.message}`;
    }
  }
}

customElements.define('tool-todom', LiveREPL);
