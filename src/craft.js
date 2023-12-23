// Boot Script - this is a boot sctipt that gets all the non-symmetrical oddities out of the way

import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css';
import bootstrapJs from 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Application from './application/Application.js';
import setup from './setup.js';
import usage from './usage.js';

const application = new Application();
setup(application);

// views display all the Nodes and Connectors as an SVG
application.Views.create({ name:'view-1', element: document.querySelector('.signalcraft-view-1')} );
// application.Views.create({ name:'view-2', element: document.querySelector('.signalcraft-view-2')} );

// start application
application.start();

// we hide eveything from the user now
const api = application.Api;

// and simply give them the dream
usage(api);
