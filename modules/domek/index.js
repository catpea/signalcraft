const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

function svgProperties(key){

	if( ['clipPathUnits',].includes(key) ){
		return key;
	} else {
	  return kebabize(key);
	}

}

const svg = new Proxy({}, {
	get: function(target, property) {
		return function(properties, text) {
			const el = document.createElementNS('http://www.w3.org/2000/svg', property);
			for(const key in properties) {
				if(properties.hasOwnProperty(key)) {
					el.setAttributeNS(null, svgProperties(key), properties[key]);
				}
			}
			if(text) el.appendChild(document.createTextNode(text));
			return el;
		}
	}
});

const xhtml = new Proxy({}, {
	get: function(target, property) {
		return function(properties, text) {
			const el = document.createElementNS('http://www.w3.org/1999/xhtml', property);
			for(const key in properties) {
				if(properties.hasOwnProperty(key)) {
					el.setAttributeNS(null, kebabize(key), properties[key]);
				}
			}
			if(text) el.appendChild(document.createTextNode(text));
			return el;
		}
	}
});

const html = new Proxy({}, {
	get: function(target, property) {
		return function(properties, text) {

			const el = document.createElement(property);
			for(const key in properties) {
				if(properties.hasOwnProperty(key)) {
					el.setAttribute(kebabize(key), properties[key]);
				}
			}

			if(text) el.appendChild(document.createTextNode(text));

			return el;
		}
	}
});

const list = (arrayList, rootElement) => {
	// Ensure that child nodes' count matches arrayList's length
	while(rootElement.childNodes.length > arrayList.length) {
		rootElement.removeChild(rootElement.lastChild);
	}

	arrayList.forEach((item, i) => {
		if('textContent' in item) { // It's a text node (typeof str === 'string')
			const textNode = rootElement.childNodes[i] || rootElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
			Object.assign(textNode, item);
		} else if(Array.isArray(item)) { // It's an array (group node)
			const groupNode = rootElement.childNodes[i] || rootElement.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
			list(item, groupNode);
		}
	});

	return rootElement;
}

const id = function(str = '') {
	return 'id' + str.replaceAll(/ |-/g, '0')
}

const text = function(text) {
	return document.createTextNode(text);
}

const update = function(elements, properties) {
	const els = Array.isArray(elements) ? elements : [elements];
	for(const el of els) {
		for(const key in properties) {
			if(el.namespaceURI == 'http://www.w3.org/2000/svg') {
				el.setAttributeNS(null, key, properties[key]);
			} else {
				el.setAttribute(key, properties[key]);
			}
		}
	}
}


function back(element) {
	const parentElement = element.parentNode;

	// Remove element from its current position...
	parentElement.removeChild(element);

	// And insert it at the first position (at the back in SVG)
	parentElement.insertBefore(element, parentElement.firstChild);
}

function front(element) {
	const parentElement = element.parentNode;

	// Remove element from its current position...
	parentElement.removeChild(element);

	// And add it back, so it will be the last one (and thus at the front in SVG)
	parentElement.appendChild(element);
}

function keyboard(verify, callback) {
	// Create a function to handle the keydown event
	const listener = e => {
		if(verify(e)) {
			callback(e);
		}
	};
	// Add the listener
	document.addEventListener('keydown', listener);
	// Return a function to remove the listener
	return () => document.removeEventListener('keydown', listener);
}



async function JSONWriter(data) {
    // create a new handle
  const newHandle = await window.showSaveFilePicker({
  suggestedName: 'project.json',
  types: [{
    description: 'JavaScript Object Notation',
    accept: {
      'application/json': ['.json'],
    },
  }],
});

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write(data);

  // close the file and write the contents to disk.
  await writableStream.close();
}

function JSONReader() {
	return new Promise((resolve, reject) => {
		const fileSelector = document.getElementById("fileSelector");
    if(!fileSelector) console.log(`this feature requires a hidden: <input type="file" id="fileSelector" multiple accept="application/json" style="display:none" />`);
		fileSelector.addEventListener("change", handleFiles, false);
		fileSelector.click();
		function handleFiles() {
			const fileList = this.files;
			const fileReader = new FileReader();
			fileReader.onload = function(event) {
				console.log(event);
				const result = JSON.parse(event.target.result);
				console.log(result);
				resolve(result);
			}
			fileReader.readAsText(fileList.item(0));
		}
	});
}


function dataset(element, data){
	for (const key in data) {
		element.dataset[key] = data[key];
	}
}

function click(element, callback){
	element.addEventListener('mouseup', handler);
	function handler(event) {
		callback();
	}
	return ()=>	element.removeEventListener('mouseup', handler);
}

function mouse(element, on, off){
	element.addEventListener("mouseover", on);
	element.addEventListener("mouseout", off);
	return ()=>	{
		element.removeEventListener('mouseover', on);
		element.removeEventListener('mouseout', off);
	}

}






export {
	svg,
	html,
	xhtml,
	text,

	id,
	list,
	update,

	back,
	front,

	keyboard,

	JSONReader,
	JSONWriter,

	click,
	mouse,
	dataset,

 };
