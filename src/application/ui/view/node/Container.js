import { svg, update } from "domek";

import Component from "./Component.js";

export default class Container extends Component {

  setup(){
    this.el.Panel = svg.rect({
      class: 'node-container',
      ry: this.radius,
      width:this.width,
      x:this.x,
      y:this.y,
      height:this.height,
    });
    this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));

    this.cleanup( this.view.application.Selection.observe('changed', ({data}) => {
      if(data.has(this.data.id)){
        this.el.Panel.classList.add('selected');
      }else{
        this.el.Panel.classList.remove('selected');
      }
    }))


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
