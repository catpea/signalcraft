import { svg, text, update } from "domek";

import { Movable } from   "./caption/Movable.js";

import Component from "./Component.js";

export default class Caption extends Component {

	setup() {
		this.el.Caption = svg.rect({ class: `panel-caption`, ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
		this.el.CaptionText = svg.text({ class: `panel-caption-text`, x:this.x+(this.width*.02), y: this.y + (this.height - (this.height * .12)) }, this.data.type);
	}

	render() {
		this.group.appendChild(this.el.Caption);
		this.group.appendChild(this.el.CaptionText);

		const movable = new Movable({
      container: window,  // <g> element representing an SVG scene
         handle: this.el.Caption, // <rect> that is the caption of a window meant to be dragged
				   read: (property) => this.data[property],
          write: (property, value) => this.data[property] = value,
    });
		this.cleanup(this.view.observe('transform', v=>movable.scale = v.scale));
		this.cleanup(movable.stop);



		this.children.map(child => child.render())
	}

	update() {
		update(this.el.Caption, {})
		update(this.el.CaptionText, {})
	}

}
