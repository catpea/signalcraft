// this is the central boot script - there is no easy wat to share data between multiple modules so we use a central file

import html2js from './library/html2js.js';
import Signalcraft from './class/Signalcraft.js';
import SignalcraftView from './element/signalcraft-view/index.js';

const signalcraft = new Signalcraft();
globalThis.signalcraft = signalcraft;
signalcraft.start();

customElements.define("signalcraft-view", SignalcraftView);












// console.log(html2js(`<!doctype html>
//
//   <svg xmlns="http://www.w3.org/2000/svg" style="border: 1px solid gold;">
//     <rect class="background" x="0" y="0" width="11000" height="8000" fill="silver"/>
//     <circle cx="150" cy="150" r="50" />
//     <circle cx="250" cy="250" r="50" />
//   </svg>
//
//
// `, 'this.#svgElement'))


// console.log(html2js(`<!doctype html>
//   <p>At Mozilla, we're a global community of</p>
//
//   <ul>
//     <li>technologists</li>
//     <li>thinkers</li>
//     <li>builders</li>
//   </ul>
//
//   <p>working together…</p>
//
// `, 'this.#svgElement'))
