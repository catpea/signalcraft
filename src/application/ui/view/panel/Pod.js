class Pod extends Component {
  constructor(setup) {
    super(setup);
    this.data.forEach( (data,index) => this.append( new Line({...setup,  name:  `pod line ${index}`, data, size:32}) ));
  }

  draw() {
    // console.log('Pod!', this.top);
    this.el = svg.rect({ x:this.left, y:this.top, ry: 3, width: this.node.nodeWidth-(this.padd*2), height: this.size, fill:'transparent', Xfill: `url(#panel-pod)`, stroke: 'black', });
    this.main.el.appendChild( this.el )
  }
}
