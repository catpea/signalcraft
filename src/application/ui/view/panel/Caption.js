import { svg, text, update, front } from "domek";

import { Movable } from   "./caption/Movable.js";
import { Selectable } from   "./caption/Selectable.js";
import { Focus } from   "./caption/Focus.js";

import Component from "./Component.js";

export default class Caption extends Component {

	setup() {
		this.el.Caption = svg.rect({ class: `panel-caption`, ry: this.radius, width: this.width, x: this.x, y: this.y, height: this.height });
		this.el.CaptionText = svg.text({ class: `panel-caption-text`, x:this.x+(this.width*.02), y: this.y + (this.height - (this.height * .12)) }, this.data.type);

		this.cleanup( this.view.application.Selection.observe('changed', ({data}) => {
			if(data.has(this.data.id)){
				this.el.Caption.classList.add('selected');
			}else{
				this.el.Caption.classList.remove('selected');
			}
		}))


		const focus = new Focus({
			handle: this.el.Caption,
			action: e=>{
				front(this.parent.group)
			}
		});


	}

	render() {
		const {Shortcuts, Dream} = this.view.application;

		this.group.appendChild(this.el.Caption);
		this.group.appendChild(this.el.CaptionText);

		const movable = new Movable({
      container: window,  // <g> element representing an SVG scene
         handle: this.el.Caption, // <rect> that is the caption of a window meant to be dragged
				   read: (property) => this.data[property],
          write: (property, value) => this.data[property] = value,
    });
		this.cleanup(this.view.observe('transform', v=>movable.scale = v.scale));
		this.cleanup(()=>movable.stop());

		// const selectable = new Selectable({
    //      handle: this.el.Caption,
		// 		 active: e=>Shortcuts.isSelecting(e),
		//   	 action: ()=>Dream.toggleSelect(this.data),
    // });

		const selectable = new Selectable({
			handle: this.el.Caption,
			action: e=>{
				const selectingMultiple = Shortcuts.isSelecting(e);
				if(selectingMultiple){
					Dream.toggleSelect(this.data);
				}else{ // user simply chose a new selection
					Dream.deselectAll();
					Dream.toggleSelect(this.data);
				}
			}
		});

		this.cleanup(()=>selectable.stop());




		this.children.map(child => child.render())
	}

	update() {
		update(this.el.Caption, {})
		update(this.el.CaptionText, {})
	}

}
