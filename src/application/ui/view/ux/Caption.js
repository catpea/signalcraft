import { svg, text, update } from "domek";

import Component from "./Component.js";

export default class Caption extends Component {

  setup(){
    this.el.Caption = svg.rect({ class: `caption`, filter: `url(#shadow-primary)` , ry: 5, width: 100, y:this.y, height: this.height, fill: this.data.backgroundColor, stroke: 'black', });
    this.el.CaptionText = svg.text({ class: `caption-text`, y: this.y + (this.height - (this.height / 5)) }, this.data.type);
  }

  render(){
    this.group.appendChild( this.el.Caption );
    this.group.appendChild( this.el.CaptionText );

    this.children.map(child=>child.render())
  }

  update(){
    update(this.el.Caption, {})
    update(this.el.CaptionText, {})
  }

}
