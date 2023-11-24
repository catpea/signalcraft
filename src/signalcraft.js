// this is the central boot script - there is no easy wat to share data between multiple modules so we use a central file

import SignalcraftCore from './SignalcraftCore.js';
import SignalcraftView from './element/signalcraft-view/index.js';

const signalcraft = new SignalcraftCore();
globalThis.signalcraft = signalcraft;
signalcraft.start();

customElements.define("signalcraft-view", SignalcraftView);

for (let i = 0; i < 123; i++) {
  signalcraft.createNode("color");
}

signalcraft.createNode("text");
