import ApplicationReactivity from "./application/ApplicationReactivity.js";

import TypeCollection from "./types/TypeCollection.js";
import ViewCollection from "./views/ViewCollection.js";
import NodeCollection from "./nodes/NodeCollection.js";
import EdgeCollection from "./edges/EdgeCollection.js";
import ReactiveObject from "./setup/ReactiveObject.js";
import MightyMidnight from "./theme/MightyMidnight.js";

// import ReactiveObject from "./library/ReactiveObject.js";
// import EdgeCollection from "./node/EdgeCollection.js";

export default class Application extends ApplicationReactivity {

  Theme;
  Types;
  Views;
  Setup;
  Nodes;
  Edges;

  constructor() {
    super();
    this.Theme = new MightyMidnight(this);
    this.Types = new TypeCollection(this);
    this.Views = new ViewCollection(this);
    this.Setup = new ReactiveObject(this, { fgColor: "blue", bgColor: "green" });
    this.Nodes = new NodeCollection(this);
    this.Edges = new EdgeCollection(this);
  }

  async start() {
    console.log('Starting...');
    this.Setup.bgColor = `hsl(${parseInt(Math.random() * 360)}, 20%, 35%)`;

    let intervalID = setInterval(() => {

      // this.Setup.bgColor = `hsl(${parseInt(Math.random() * 360)}, 20%, 35%)`;
      // signalcraft.Nodes.create("text");

    }, 1_000);

  }

  async stop() {
    //TODO: destroy all listeners
  }

}
