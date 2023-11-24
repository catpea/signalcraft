// this is the central boot script - there is no easy wat to share data between multiple modules so we use a central file

import Core from './Core.js';
import SignalcraftView from './element/signalcraft-view/index.js';

const core = new Core();
globalThis.signalcraft = core;
signalcraft.start();

customElements.define("signalcraft-view", SignalcraftView);

for (let i = 0; i < 666; i++) {
  signalcraft.createNode("color");
}

signalcraft.createNode("text");
