import { svg, html, mouse, click, update, text } from "domek";

import Component from "./Component.js";

export default class Editor extends Component {

  setup(){

    // this.el.Editor = svg.rect({ class: 'panel-editor', ry: this.radius, width: this.width, x:this.x, y:this.y, height: this.height});
    this.el.Editor = svg.rect({class: 'panel-editor', width: this.width/2, x: this.x+this.width/2, y: this.y, height: this.height });

    this.el.EditorZone = svg.rect({class: 'editor-zone', width: this.width, x: this.x, y: this.y, height: this.height });
    this.el.EditorLine = svg.line({class: 'editor-divider',
      width: this.width/2,
      height: this.height,
      x1: this.x,
      y1: this.y+this.height,
      x2: this.x+this.width,
      y2: this.y+this.height,
    });

    this.el.valueText = text("");
    this.el.EditorValue = svg.text({
      class: `editor-value`,
      textAnchor: 'end',

      x: this.width ,
      y: this.y + (this.height - (this.height / 3)),
      width: this.width,
    } );
    this.el.EditorValue.appendChild(this.el.valueText);
    this.cleanup(this.data.node.observe(this.data.port.name, v=>this.el.valueText.nodeValue = v?(v+"").substring(0,10):null ));

    const hiddenables = [this.parent.el.PortCaption, this.el.EditorValue, this.el.EditorZone, this.el.EditorLine ];

    this.cleanup(mouse(this.el.EditorZone, ()=>this.el.EditorZone.classList.add('active'), ()=>this.el.EditorZone.classList.remove('active')  ));

    this.cleanup(click(this.el.EditorZone, ()=>{
      console.log('Installing Editor');
      hiddenables.map(o=>o.style.display = 'none');
      this.el.InputBoxForeignObject = svg.foreignObject({width: this.width, x: this.x, y: this.y, height: this.height });
      this.el.InputBox = html.input({type:'text', class:`editor-control type-text`, value:this.data.node[this.data.port.name]||"", style: 'width: 100%'})
      this.el.InputBoxForeignObject.appendChild(this.el.InputBox);
      this.group.appendChild( this.el.InputBoxForeignObject );
      this.el.InputBox.focus();

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
    this.group.appendChild( this.el.EditorLine );
    this.group.appendChild( this.el.EditorValue );
    this.group.appendChild( this.el.EditorZone );

    // if(this.data.port.direction == 'input') this.group.appendChild(this.el.InputBoxForeignObject);

    this.children.map(child=>child.render())
  }

  update(){
    //...update(this.el.Editor, {})
  }


}
