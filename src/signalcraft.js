// this is the central boot script - there is no easy wat to share data between multiple modules so we use a central file
import { v4 as uuid } from "uuid";

import Application from './Application.js';
// import SignalcraftView from './element/signalcraft-view/index.js';

import registerTypes from './boot/registerTypes.js';

const application = new Application();

globalThis.signalcraft = application;

application.Views.create('view-1', document.querySelector('.signalcraft-view-1'));
application.Views.create('view-2', document.querySelector('.signalcraft-view-2'));

registerTypes(application);

// Define Custom Elements
// customElements.define("signalcraft-view", SignalcraftView);

application.start();

// Tests

for (let i = 0; i < 500; i++) {
  if( Math.random() < 0.3 ){
    application.Nodes.create(uuid(), "text/string");
  }else if( Math.random() < 0.6 ){
    application.Nodes.create(uuid(), "text/case");
  }else{
    application.Nodes.create(uuid(), "text/color");
  }
}

// application.Nodes.create("text/string");
