import { svg, update } from "domek";

import Component from "./Component.js";

export default class Container extends Component {

  setup(){
    this.el.Panel = svg.rect({ class: 'interactive', filter: `url(#shadow-primary)` , ry: 5, width: 100, y:this.y, height: this.height, fill: this.data.backgroundColor, stroke: 'black', });

    this.children.map(child=>child.setup())
  }

  render(){
    update(this.group, { 'transform': `translate(${this.data.x}, ${this.data.y})`, });
    this.view.scene.appendChild( this.group );

    this.group.appendChild( this.el.Panel )

    this.children.map(child=>child.render())
  }

  update(){
    update(this.el.Panel, {})
  }

}
