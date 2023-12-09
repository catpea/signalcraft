import Brain from './Brain.js';
import registerTypes from './tasks/registerTypes.js';
import usage from './usage.js';
const brain = new Brain();
globalThis.signalcraft = brain;
registerTypes(brain);

// views are self starting
brain.Views.create('view-1', document.querySelector('.signalcraft-view-1'));
brain.Views.create('view-2', document.querySelector('.signalcraft-view-2'));

// start brain
brain.start();

// we hide eveything from the user now
const app = brain.Dream;

// and simply give them the dream
usage(app);
