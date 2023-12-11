import oneOf from "oneof";

import { html, svg, text, list, update } from "../tools/domek.js";
import Component from "./base/Component.js";

export default class Line extends Component {
	constructor(setup) {
		super(setup, { size: 32 });
	}

	draw() {
		this.el = svg.rect({ x: this.left, y: this.top, ry: 3, width: this.width, height: this.size, fill: 'transparent', Xfill: `url(#panel-primary)`, });
		this.main.el.appendChild(this.el)

		let port;
		if(this.data.direction == 'input') {
			const x = this.left - 5;
			const y = this.top + (this.size / 2);
			this.data.x = x; // IMPORTANT: the geometric component sets wire coordinates here
			this.data.y = y; // IMPORTANT: the geometric component sets wire coordinates here
			port = svg.circle({ cx: x, cy: y, r: 8, height: this.size, fill: oneOf([`url(#socket-primary)`, `url(#socket-error)`]), filter: `url(#socket-shadow)` });
		} else {
			const x = this.width + 10;
			const y = this.top + (this.size / 2);
			this.data.x = x; // IMPORTANT: the geometric component sets wire coordinates here
			this.data.y = y; // IMPORTANT: the geometric component sets wire coordinates here
			port = svg.circle({ cx: x, cy: y, r: 8, height: this.size, fill: oneOf([`url(#socket-primary)`, `url(#socket-error)`]), filter: `url(#socket-shadow)` });
		}

		const captionNode = svg.text({ x: this.left, y: this.top + (this.size - (this.size / 10)), style: 'font-size: 2rem;', fill: `url(#panel-text)` });
		const cationText = document.createTextNode(this.data.name);
		captionNode.appendChild(cationText);
		this.main.el.appendChild(captionNode)

		this.main.el.appendChild(port)
	}
}

 
