export default class NodeRenderer {


  #view; // the view (canvas)
  #node; // node object
  #root; // container

  #self; // g element
  #body; // backdrop
  #text; // caption
  #name; // caption text

  #exit = []; // remove listeners

  constructor(node, view, root){
    this.#view = view;
    this.#node = node;
    this.#root = root;
  }

  start(){
    this.create();
    this.update();

    const monitor = this.#node.monitor((key, value, item)=>{
      // this.#updateNode({item, key, value});
      this.update();
    });

    this.#exit.push( monitor );
    console.log(`Node ${this.#node.id} start()`);
  }
  stop(){
    this.#exit.map((o) => o());
  }

  create(){

    this.#self = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.#self.setAttribute('id', this.#node);
    this.#root.appendChild(this.#self);

    this.#body = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.#body.setAttribute('class', 'interactive');
    this.#body.setAttribute('ry', '5');
    this.#self.appendChild(this.#body);

    this.#text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.#text.setAttribute('class', 'interactive');
    this.#text.setAttribute('x', '90');
    this.#text.setAttribute('y', '25');
    this.#text.setAttribute('font-size', '12px');
    this.#text.setAttribute('fill', '#fff');
    this.#text.setAttribute('text-anchor', 'middle');
    this.#text.setAttribute('font-weight', 'bold');
    this.#text.setAttribute('font-family', 'Arial');
    this.#self.appendChild(this.#text);

    this.#name = document.createTextNode('');
    this.#text.appendChild(this.#name);
    const geometry = this.#view.application.Theme.getNodeHeightFor(this.#node);

    for (const y of geometry.inputs) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'interactive');
      circle.setAttribute('cx', '0');
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', 'cyan');
      this.#self.appendChild(circle);
    }

    for (const y of geometry.outputs) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'interactive');
      circle.setAttribute('cx', this.#node.nodeWidth);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', 'aliceblue');
      this.#self.appendChild(circle);
    }

  }

  update(){

    const geometry = this.#view.application.Theme.getNodeHeightFor(this.#node);
    const {height} = geometry;

    console.log('GOT', geometry);

    // console.log({nodeHeight, heightOfIncoming, heightOfOutgoing, data:this.#node.Incoming.export()});

    this.#self.setAttribute('transform', `translate(${this.#node.horizontalPosition}, ${this.#node.verticalPosition})`);

    this.#body.setAttribute('width', this.#node.nodeWidth);
    this.#body.setAttribute('height', height);
    this.#body.setAttribute('fill', this.#node.backgroundColor); // this.#body.setAttribute('fill', 'url(#Gradient2)');

    this.#name.nodeValue = this.#node.type;

  }

  remove(){
    this.#self.remove();
  }

}
