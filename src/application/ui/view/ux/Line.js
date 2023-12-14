import { svg } from "domek";

import { Draggable } from './line/Draggable.js';

import Component from "./Component.js";

export default class Line extends Component {

	setup() {
		this.el.Line = svg.rect({ class: 'panel-line', ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
		this.el.LineText = svg.text({ class: `panel-line-text`, x: this.x + (this.width * .02), y: this.y + (this.height - (this.height / 5)) }, this.data.name);
		console.log(this.data);
		this.children.map(child => child.setup())

		let moveDown = (this.height / 2);
		let moveHorizontally = 10;
		if(this.data.direction == 'input') {
			const x = this.x - moveHorizontally;
			const y = this.y + moveDown;
			this.el.Port = svg.circle({ class: 'panel-line-port', cx: x, cy: y, r: 8, height: this.height / 3 });
			this.data.x = x; // IMPORTANT: the geometric component sets wire coordinates here
			this.data.y = y; // IMPORTANT: the geometric component sets wire coordinates here
		} else {
			const x = this.x + this.width + moveHorizontally;
			const y = this.y + moveDown;
			this.el.Port = svg.circle({ class: 'panel-line-port', cx: x, cy: y, r: 8, height: this.height / 3 });
			this.data.x = x; // IMPORTANT: the geometric component sets wire coordinates here
			this.data.y = y; // IMPORTANT: the geometric component sets wire coordinates here
		}
	}

	render() {
		this.group.appendChild(this.el.Line);
		this.group.appendChild(this.el.LineText);
		this.group.appendChild(this.el.Port);

		const draggable = new Draggable({
			application: this.view.application, // <g> element representing an SVG scene
			container: window, // <g> element representing an SVG scene
			draggable: this.el, // <g> element that contains the window
			handle: this.el.Port,
			main: this.main,
			node: this.node,
			data: this.data,
			// events
			scale: o => this.view.transform.scale,
		});
		this.cleanup(draggable.stop);

		this.children.map(child => child.render())
	}

	update() {
		update(this.el.Line, {})
	}


}
