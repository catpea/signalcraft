import { svg, xhtml, html, mouse} from "domek";
import Component from "./Component.js";

export default class Row extends Component {
	setup() {
		this.el.Row = svg.rect({ class: 'pod-row', ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });

		this.children.map(child => child.setup())

		this.cleanup( this.view.application.Selection.observe('changed', ({data}) => {
      if(data.has(this.parent.data.id)){
				Object.values(this.el).map(el=>el.classList.add('selected'))
      }else{
				Object.values(this.el).map(el=>el.classList.remove('selected'))
      }
    }))

		this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));
	}

	render() {
		this.group.appendChild(this.el.Row);


		this.children.map(child => child.render())
	}

	update() {
		//... update(this.el.Row, {})
	}

}
