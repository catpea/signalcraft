import { html, svg, text, list, update } from "domek";
import Component from "./Component.js";
import { Draggable } from   "./caption/Draggable.js";

export default class Caption extends Component {
	el;

	constructor(setup) {
		super(setup, { size: 32 });
	}

	draw() {
		this.el = svg.rect({ class: `caption`, x: this.left + this.padd, y: this.top + this.padd, ry: 3, width: this.node.nodeWidth - (this.padd * 2), height: this.size, fill: `url(#panel-caption)`, });
    const draggable = new Draggable({
      container: window, // <g> element representing an SVG scene
      draggable: this.el, // <g> element that contains the window
      handle: this.el, // <rect> that is the caption of a window meant to be dragged
      node: this.node,
      // events
      scale: o => this.view.transform.scale,
    });
    this.unsubscribe(draggable.stop);
		this.main.el.appendChild(this.el)
		const captionNode = svg.text({ x: this.left, y: this.top + (this.size - (this.size / 10)), style: 'font-size: 2rem; pointer-events: none; user-select: none;', fill: `url(#panel-text)` }, this.node.type);
		this.main.el.appendChild(captionNode)
	}

}
