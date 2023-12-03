// this is the central boot script - there is no easy wat to share data between multiple modules so we use a central file
import { v4 as uuid } from "uuid";

import Core from './Core.js';
// import SignalcraftView from './element/signalcraft-view/index.js';

import registerTypes from './setup/registerTypes.js';

const core = new Core();

globalThis.signalcraft = core;

core.Views.create('view-1', document.querySelector('.signalcraft-view-1'));
core.Views.create('view-2', document.querySelector('.signalcraft-view-2'));

registerTypes(core);

// Define Custom Elements
// customElements.define("signalcraft-view", SignalcraftView);

core.start();

// Tests

for (let i = 0; i < 100; i++) {
  if( Math.random() < 0.3 ){
    core.Nodes.create(uuid(), "text/string");
  }else if( Math.random() < 0.6 ){
    core.Nodes.create(uuid(), "text/case");
  }else{
    core.Nodes.create(uuid(), "text/color");
  }
}

// core.Nodes.create("text/string");
