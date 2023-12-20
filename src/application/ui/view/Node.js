import oneOf from "oneof";
import { html, svg, text, list, update } from "domek";

import Base from './Base.js';

import Container from "./node/Container.js";
import Caption from "./node/Caption.js";
import Pod from "./node/Pod.js";
import Line from "./node/Line.js";

export default class Node extends Base {

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

      const inputPod = new Pod(`inputPod`);
      inputPod.setBounds({gap: 2, padding: 1, border:1, radius:3});
      container.add(inputPod);

      const outputPod = new Pod(`outputPod`);
      outputPod.setBounds({gap: 2, padding: 1, border:1, radius:3});
      container.add(outputPod)

      data.Output.forEach((data, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({height: 32, width:200, radius:3, margin: 2});
        port.setData(data);
        outputPod.add( port )
      });

      data.Input.forEach((data, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({height: 32, width:200, radius:3});
        port.setData(data);
        inputPod.add( port )
      });

      container.setup();
      container.render();

      this.cleanup(()=>container.stop());
  }

}
