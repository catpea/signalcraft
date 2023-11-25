// this is the central boot script - there is no easy wat to share data between multiple modules so we use a central file

import Application from './Application.js';
import SignalcraftView from './element/signalcraft-view/index.js';

const application = new Application();
globalThis.signalcraft = application;
application.start();

customElements.define("signalcraft-view", SignalcraftView);

for (let i = 0; i < 100; i++) {
  signalcraft.createNode("color");
}

signalcraft.createNode("text");
