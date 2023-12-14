import { svg, text, update } from "domek";

import Component from "./Component.js";

export default class Caption extends Component {

	setup() {
		this.el.Caption = svg.rect({ class: `panel-caption`, ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
		this.el.CaptionText = svg.text({ class: `panel-caption-text`, x:this.x+(this.width*.02), y: this.y + (this.height - (this.height * .12)) }, this.data.type);
	}

	render() {
		this.group.appendChild(this.el.Caption);
		this.group.appendChild(this.el.CaptionText);

		this.children.map(child => child.render())
	}

	update() {
		update(this.el.Caption, {})
		update(this.el.CaptionText, {})
	}

}
