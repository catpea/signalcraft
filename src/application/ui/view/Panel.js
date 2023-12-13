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
      container.setBounds({border:1});
      container.setView(view);
      container.setData(data);

      const caption = new Caption(`caption`);
      caption.setBounds({border:1, height: 32});
      container.add(caption)

      const outputPod = new Pod(`outputPod`);
      outputPod.setBounds({gap: 2, padding: 1, border:1});
      container.add(outputPod)

      data.Output.forEach((data, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({height: 24});
        port.setData(data);
        outputPod.add( port )
      });

      const inputPod = new Pod(`inputPod`);
      inputPod.setBounds({gap: 2, padding: 1, border:1});
      container.add(inputPod);

      data.Input.forEach((data, index) => {
        const port = new Line(`port${index}`);
        port.setBounds({height: 24});
        port.setData(data);
        inputPod.add( port )
      });

      container.setup();
      container.render();

      console.log(container.height, 12);

      // container.node = node;
      // container.view = view;
      // container.root = root;
      //
      // container.append(new Caption({size:64}));
      //
      // const outputPod = new Pod();
      // const inputPod = new Pod();
      // container.append(outputPod);
      // container.append(inputPod);
      //
      // this.#node.Output.forEach( (data,index) => outputPod.append( new Line({size:32}) ));
      // this.#node.Input.forEach( (data,index) => outputPod.append( new Line({size:32}) ));

      this.cleanup(container);
  }


  stop(){
    this.#cleanup.map(x=>x());
  }
  cleanup(...arg){
    this.#cleanup.push(...arg);
  }
}
