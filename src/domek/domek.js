const svg = new Proxy({}, {
    get: function(target, property) {
      return function(properties){
        const el = document.createElementNS('http://www.w3.org/2000/svg', property);
        for (const key in properties) {
          if (properties.hasOwnProperty(key)) {
            el.setAttributeNS(null, key, properties[key]);
            // el.setAttribute(key, properties[key]);
          }
        }
        return el;
      }
    }
});

const html = new Proxy({}, {
    get: function(target, property) {
        const el = document.createElement(property);
        return el;
    }
});

const list = (arrayList, rootElement) => {
    // Ensure that child nodes' count matches arrayList's length
    while (rootElement.childNodes.length > arrayList.length) {
        rootElement.removeChild(rootElement.lastChild);
    }

    arrayList.forEach((item, i) => {
        if ('textContent' in item) { // It's a text node (typeof str === 'string')
            const textNode = rootElement.childNodes[i] || rootElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
            Object.assign(textNode, item);
        } else if (Array.isArray(item)) { // It's an array (group node)
            const groupNode = rootElement.childNodes[i] || rootElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
            list(item, groupNode);
        }
    });

    return rootElement;
}

const text = function(){}

const update = function(el, properties){
  for (const key in properties) {
    el.setAttribute(key, properties[key]);
  }

}

export {svg, html, text, list, update}
