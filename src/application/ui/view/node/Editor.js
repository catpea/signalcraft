import { svg, html, mouse } from "domek";

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


    this.el.EditorValue = svg.text({
      class: `editor-value`,
      textAnchor: 'end',
      x: this.width,
      y: this.y + (this.height - (this.height / 3)),
      width: this.width,
    }, this.data.node[this.data.port.name]||"" );

    if(this.data.port.direction == 'input') {
			this.el.InputBox = html.input({type:'text', class:`editor-control type-text`, value:this.data.node[this.data.port.name]||"", style: 'width: 100%'})
			this.el.InputBoxForeignObject = svg.foreignObject({width: this.width/2, x: this.x+this.width/2, y: this.y, height: this.height });
			this.el.InputBoxForeignObject.appendChild(this.el.InputBox);
		}

    this.cleanup(mouse(this.el.EditorZone, ()=>this.el.EditorZone.classList.add('active'), ()=>this.el.EditorZone.classList.remove('active')  ));


    this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));
    this.children.map(child=>child.setup())
  }

  render(){
    this.group.appendChild( this.el.Editor );
    this.group.appendChild( this.el.EditorZone );
    this.group.appendChild( this.el.EditorLine );
    this.group.appendChild( this.el.EditorValue );

    // if(this.data.port.direction == 'input') this.group.appendChild(this.el.InputBoxForeignObject);

    this.children.map(child=>child.render())
  }

  update(){
    //...update(this.el.Editor, {})
  }


}
