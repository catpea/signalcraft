import oneOf from "oneof";
import { html, svg, text, list, update } from "domek";

import Container from "./ux/Container.js";
import Caption from "./ux/Caption.js";
import Pod from "./ux/Pod.js";
import Line from "./ux/Line.js";

export default class Panel {
  el;
  #cleanup = [];

  start({data, view}){

      const container = new Container(`container`);
      container.setBounds({border:1, gap:5, radius:5, padding:2 });
      container.setView(view);
      container.setData(data);

      // NOTE: this is where Panel moves to match x/y of the node.
      this.cleanup(data.observe('x',v=>update(container.group,{'transform':`translate(${v},${data.y})`} )));
      this.cleanup(data.observe('y',v=>update(container.group,{'transform':`translate(${data.x},${v})`} )));


      const caption = new Caption(`caption`);
      caption.setBounds({border:1, height: 32, width:'100%', radius:3, margin: 4});
      container.add(caption)

      const outputPod = new Pod(`outputPod`);
      outputPod.setBounds({gap: 2, padding: 1, border:1, radius:3});
      container.add(outputPod)

      const inputPod = new Pod(`inputPod`);
      inputPod.setBounds({gap: 2, padding: 1, border:1, radius:3});
      container.add(inputPod);

      data.Output.forEach((data, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({height: 32, width:150, radius:3, margin: 2});
        port.setData(data);
        outputPod.add( port )
      });

      data.Input.forEach((data, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({height: 32, width:150, radius:3});
        port.setData(data);
        inputPod.add( port )
      });

      container.setup();
      container.render();

      this.cleanup(container);
  }


  stop(){
    this.#cleanup.map(x=>x());
  }
  cleanup(...arg){
    this.#cleanup.push(...arg);
  }
}
