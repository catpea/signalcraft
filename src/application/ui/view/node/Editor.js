import { svg, html, mouse, click, update, text, clip } from "domek";
import { v4 as uuid } from "uuid";

import Component from "./Component.js";

function truncateTextWithBrowserCompatibility({text, width, measure, assign, scale}){ // this crude function exists due to browser bugs and inncompatibilites, under the constraint of demanding a small SVG withut a <g> soup


  //NOTE: the following only works in chromium, fails in firefox under various conditions and when a transform is applied
  // someday when clip-path works use this:
  // 'clip-path':clip(this.width, this.height, scale...),

	scale = scale||1;
	assign.nodeValue = text;

	let measureTwice;
	if(scale>=1){
		// zooming in
		measureTwice = ()=> measure.getBBox().width/scale;
	}else{
		// zooming out, make no changes
		measureTwice = ()=> measure.getBBox().width ;
	}

	let elementWidth = measureTwice();
	let c = 0;
	let elementIsOverflowing = elementWidth > width;

	if(elementWidth==0) return; //console.log('Measure width should not be zero, is the element hidden?', {text, width, measure, assign, scale});

	// if(!elementIsOverflowing) return;

	while(elementIsOverflowing){
		text = text.substr(0, text.length - 1);
		assign.nodeValue = text;
		elementWidth = measureTwice()
		elementIsOverflowing = elementWidth > width;
		c++;
		if(c>666) break;
	}

  // if(text.startsWith('authors')) console.log({width,scale}, elementWidth, text);
}

export default class Editor extends Component {




  setup(){

    this.el.Editor = svg.rect({class: 'panel-editor', width: this.width, x: this.x, y: this.y, height: this.height });

    this.el.valueText = text("");
    this.el.EditorValue = svg.text({
      class: `editor-value`,
      'dominant-baseline':'middle',
      x: this.x ,
      y: this.y+(this.height/2), // + (this.height - (this.height / 3)),
      width: this.width,
      height: this.height,
    } );
    this.el.EditorValue.appendChild(this.el.valueText);

    this.children.map(child=>child.setup())



  }

  render(){

        this.cleanup(this.data.node.observe(this.data.port.name, v =>{
          truncateTextWithBrowserCompatibility({ text: `${this.data.port.name}: ${v}`, width: this.width, measure: this.el.EditorValue, assign: this.el.valueText, scale: this.view.transform.scale, })
        }));

        // ZUI
        this.cleanup( this.view.observe('transform',({x,y,scale})=>scale<1?this.el.EditorValue.style.scale = 1:this.el.EditorValue.style.scale = 1/scale ) );

        this.cleanup( this.view.observe('transform',({x,y,scale})=>{

          if(scale>=1){
            update(this.el.EditorValue, {
              x: this.x*scale,
              y: (this.y+this.height/2)*scale, //(this.y + (this.height - (this.height / 3)))*scale,
              width: this.width*scale,
              height: this.height*scale,
              //NOTE: only works in chromium, fails in firefox under various conditions and when a transform is applied 'clip-path': clip(this.width, this.height, scale),
            });
          }else{
            update(this.el.EditorValue, {
              x: this.x,
              y: (this.y+this.height/2),
              width: this.width,
              height: this.height,
            });
          }

            truncateTextWithBrowserCompatibility({ text: `${this.data.port.name}: ${this.data.node[this.data.port.name]||""}`, width: this.width, measure: this.el.EditorValue, assign: this.el.valueText, scale, })

        }));



        //INPUT CONTROL CANDIDATE
        const hiddenables = [this.parent.el.Port,  this.el.EditorValue,   ];

        this.cleanup(mouse(this.el.Editor, ()=>this.el.Editor.classList.add('active'), ()=>this.el.Editor.classList.remove('active')  ));

        this.cleanup(click(this.el.Editor, ()=>{
          if(this.view.transform.scale < .9) return; //TODO: .9 becasue zooming under the panzoom plugin is inexact, fix the panzoom system by rewriting it from scratch
          console.log('Installing Editor');
          console.log( hiddenables.map(o=>o.style.display) );
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
            hiddenables.map(o=>o.style.display = ''); //WARN: show everything before making assignment and thus causing measurements
            this.data.node[this.data.port.name] = this.el.InputBox.value;
            this.el.InputBoxForeignObject.remove();
          });
        }));


        this.cleanup(()=>Object.values(this.el).map(el=>el.remove()));





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
