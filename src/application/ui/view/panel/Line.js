import { svg } from "domek";
import { Connectable } from './line/Connectable.js';
import Component from "./Component.js";

export default class Line extends Component {
	setup() {
		this.el.Line = svg.rect({ class: 'panel-line', ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
		this.el.LineText = svg.text({ class: `panel-line-text`, x: this.x + (this.width * .02), y: this.y + (this.height - (this.height / 5)) }, this.data.name);
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
		//NOTE: all ports must have an address consisting of node.id:port:id, used in Cable connecting
		this.el.Port.dataset.portAddress = [this.parent.data.id, this.data.id].join(':');
	}
	render() {
		this.group.appendChild(this.el.Line);
		this.group.appendChild(this.el.LineText);
		this.group.appendChild(this.el.Port);

		const connectable = new Connectable({
			container: window, // <g> element representing an SVG scene
			handle: this.el.Port,
			canvas: this.group,
			node: this.parent.data,
			port: this.data,
			link: ({sourceNode, sourcePort, targetNode, targetPort}) => this.view.application.Links.create({ sourceNode, sourcePort, targetNode, targetPort }),
		});

		this.cleanup(this.view.observe('transform', v=>connectable.scale = v.scale));
		this.cleanup(()=>connectable.stop());
		this.children.map(child => child.render())
	}
	update() {
		update(this.el.Line, {})
	}
}
