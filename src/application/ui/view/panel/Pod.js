import { svg } from "domek";

import Component from "./Component.js";

export default class Pod extends Component {

  setup(){
    this.el.Pod = svg.rect({ class: 'panel-pod', ry: this.radius, width: this.width, x:this.x, y:this.y, height: this.height});
    this.children.map(child=>child.setup())
  }

  render(){
    this.group.appendChild( this.el.Pod );

    this.children.map(child=>child.render())
  }

  update(){
    update(this.el.Pod, {})
  }


}
