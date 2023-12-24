import { svg, html, mouse, click, update, text } from "domek";
import { v4 as uuid } from "uuid";

import Component from "./Component.js";

export default class Editor extends Component {

  setup(){

    this.el.Editor = svg.rect({class: 'panel-editor', width: this.width, x: this.x, y: this.y, height: this.height });

    this.el.valueText = text("");
    this.el.EditorValue = svg.text({
      class: `editor-value`,
      'dominant-baseline':'middle',
      // 'text-anchor':'middle',
      x: this.x ,
      y: this.y+(this.height/2), // + (this.height - (this.height / 3)),
      width: this.width,
      'clip-path':`path('M 0 0 H ${this.width} V ${this.height} H 0 V 0')`,
    } );
    this.el.EditorValue.appendChild(this.el.valueText);
    this.cleanup(this.data.node.observe(this.data.port.name, v=>this.el.valueText.nodeValue = `${this.data.port.name}: ${v}` ));

    // ZUI
    this.cleanup( this.view.observe('transform',({x,y,scale})=>scale<1?null:this.el.EditorValue.style.scale = 1/scale ) );
    this.cleanup( this.view.observe('transform',({x,y,scale})=>{

      if(scale>1){
        update(this.el.EditorValue, {
          x: this.x*scale,
          y: (this.y+this.height/2)*scale, //(this.y + (this.height - (this.height / 3)))*scale,
          width: this.width*scale,
          'clip-path':`path('M 0 0 H ${this.width*scale} V ${this.height*scale} H 0 V 0')`,
        });
      }


    }));



    //INPUT CONTROL CANDIDATE
    const hiddenables = [this.parent.el.Port,  this.el.EditorValue,   ];

    this.cleanup(mouse(this.el.Editor, ()=>this.el.Editor.classList.add('active'), ()=>this.el.Editor.classList.remove('active')  ));

    this.cleanup(click(this.el.Editor, ()=>{
      console.log('Installing Editor');
      hiddenables.map(o=>o.style.display = 'none');
      this.el.InputBoxForeignObject = svg.foreignObject({width: this.width, x: this.x, y: this.y, height: this.height });

      this.el.InputBox = html.textarea({type:'text', class:`editor-control type-text`, style: 'width: 100%; height: 100%; resize:none;'}, this.data.node[this.data.port.name]||"")

      // ZUI
      this.cleanup( this.view.observe('transform',({x,y,scale})=>scale<1?null:this.el.InputBoxForeignObject.style.scale = 1/scale ) );
      this.cleanup( this.view.observe('transform',({x,y,scale})=>scale<1?null:update(this.el.InputBoxForeignObject, { width: this.width*scale, x: this.x*scale, y: this.y*scale, height: this.height*scale, } ) ));

      this.el.InputBoxForeignObject.appendChild(this.el.InputBox);
      this.group.appendChild( this.el.InputBoxForeignObject );
      this.el.InputBox.focus();
      this.el.InputBox.select();

      this.el.InputBox.addEventListener("focusout", ()=>{
        // console.log('Destroying Editor');
        // console.log('Value Update', this.data.port.name, this.el.InputBox.value);
        // console.log('NODE', this.data.node);
        this.data.node[this.data.port.name] = this.el.InputBox.value;
        this.el.InputBoxForeignObject.remove();
        hiddenables.map(o=>o.style.display = 'block');
      });
    }));


    this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));
    this.children.map(child=>child.setup())
  }

  render(){
    this.group.appendChild( this.el.Editor );
    // this.group.appendChild( this.el.ClipPath );
    // this.group.appendChild( this.el.EditorLine );
    this.group.appendChild( this.el.EditorValue );
    // this.group.appendChild( this.el.EditorZone );
    if(this.el.ClipPathRectangle1) this.group.appendChild( this.el.ClipPathRectangle1 );

    // if(this.data.port.direction == 'input') this.group.appendChild(this.el.InputBoxForeignObject);

    this.children.map(child=>child.render())
  }

  update(){
    //...update(this.el.Editor, {})
  }


}
