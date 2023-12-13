import { svg } from "domek";

import Component from "./Component.js";

export default class Pod extends Component {

  setup(){
    this.el.Pod = svg.rect({ class: 'interactive', filter: `url(#shadow-primary)` , ry: 5, width: 100, x:5, y:this.y, height: this.height, fill: this.data.backgroundColor, stroke: 'black', });
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
