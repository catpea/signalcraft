import oneOf from "oneof";
import { html, svg, text, list, update } from "domek";

import Base from './Base.js';

import Container from "./node/Container.js";
import Caption from "./node/Caption.js";
import Pod from "./node/Pod.js";
import Row from "./node/Row.js";
import Port from "./node/Port.js";
import Editor from "./node/Editor.js";

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

      data.Output.forEach((portObject, index) => {

        const row = new Row(`row{index}`);
        row.setBounds({});
        row.setData(portObject);
        outputPod.add(row);

        const port = new Port(`port{index}`);
        port.setBounds({width:200, height: 32, space:4, radius:9});
        port.setData({node:data, port:portObject});
        row.add(port);

      });

      data.Input.forEach((portObject, index) => {

        const row = new Row(`row{index}`);
        row.setBounds({});
        row.setData(portObject);
        inputPod.add( row )

        const port = new Port(`port{index}`);
        port.setBounds({space:4, radius:5});
        port.setData({node:data, port:portObject});
        row.add(port);

        //NOTE: Editor is only used for input values, as outputs are computed.
        const editor = new Editor(`port{index}`);
        editor.setBounds({width:200, height: 32, });
        editor.setData({node:data, port:portObject});
        port.add(editor);

      });

      container.setup();
      container.render();

      this.cleanup(()=>container.stop());

  }

}
