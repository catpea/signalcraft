import { svg } from "domek";

import Component from "./Component.js";

export default class Line extends Component {

  setup(){
    this.el.Line = svg.rect({ class: 'panel-line', ry: this.radius, width: this.width, x: this.x, y:this.y, height: this.height });
    this.el.LineText = svg.text({ class: `panel-line-text`, x:this.x+(this.width*.02), y: this.y + (this.height - (this.height / 5)) }, this.data.name);
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
