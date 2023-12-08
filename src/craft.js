// this is the central boot script - there is no easy wat to share data between multiple modules so we use a central file
import { v4 as uuid } from "uuid";

import Brain from './Brain.js';
// import SignalcraftView from './element/signalcraft-view/index.js';

import registerTypes from './tasks/registerTypes.js';

const brain = new Brain();

globalThis.signalcraft = brain;

brain.Views.create('view-1', document.querySelector('.signalcraft-view-1'));
brain.Views.create('view-2', document.querySelector('.signalcraft-view-2'));

registerTypes(brain);

// Define Custom Elements
// customElements.define("signalcraft-view", SignalcraftView);

brain.start();

// Tests

for (let i = 0; i < 100; i++) {
  if( Math.random() < 0.3 ){
    brain.Nodes.create(uuid(), "text/string");
  }else if( Math.random() < 0.6 ){
    brain.Nodes.create(uuid(), "text/case");
  }else{
    brain.Nodes.create(uuid(), "text/color");
  }
}


// const stringA = brain.node("text/string");
// const stringB = brain.node("text/string");
// const arrayJoin = brain.node("array/join");
//
// brain.edge(stringA, "output", arrayJoin, "input");
// brain.edge(stringB, "output", arrayJoin, "input");
