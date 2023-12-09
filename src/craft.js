// Boot Script - this is a boot sctipt that gets all the non-symmetrical oddities out of the way

import Application from './application/Application.js';
import setup from './setup.js';
import usage from './usage.js';

const application = new Application();
setup(application);

// views display all the Nodes and Edges as an SVG
application.Views.create('view-1', document.querySelector('.signalcraft-view-1'));
application.Views.create('view-2', document.querySelector('.signalcraft-view-2'));

// start application
// application.start();

// we hide eveything from the user now
const api = brain.Dream;

// and simply give them the dream
usage(api);
