import { html, svg, text, list, update } from "domek";
import Component from "./Component.js";

export default class Pod extends Component {
  constructor(setup) {
    super(setup);
  }

  draw() {
    this.el = svg.rect({ x:this.left, y:this.top, ry: 3, width: this.node.nodeWidth-(this.padd*2), height: this.size, fill:'transparent', Xfill: `url(#panel-pod)`, stroke: 'black', });
    this.main.el.appendChild( this.el )
  }

}
