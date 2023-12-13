import { svg } from "domek";

import Component from "./Component.js";

export default class Line extends Component {

  setup(){
    this.el.Line = svg.rect({ class: 'interactive', filter: `url(#shadow-primary)` , ry: 5, width: 100, x: 10, y:this.y, height: this.height, fill: this.parent.data.backgroundColor, stroke: 'black', });
    this.el.LineText = svg.text({ class: `line-text`, y: this.y + (this.height - (this.height / 5)) }, this.data.name);
    console.log(this.data);
    this.children.map(child=>child.setup())
  }

  render(){
    this.group.appendChild( this.el.Line );
    this.group.appendChild( this.el.LineText );

    this.children.map(child=>child.render())
  }

  update(){
    update(this.el.Line, {})
  }


}
