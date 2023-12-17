import panzoom from "panzoom";
import calculatePercent from 'calculate-percent';
import { html, svg, text, list, update } from "domek";
import { v4 as uuid } from "uuid";

import ReactiveObject from "../system/ReactiveObject.js";

import Panel from './view/Panel.js';
import Cable from './view/Cable.js';
import Menus from './view/Menus.js';

export default class View extends ReactiveObject {
	#application;

	#name;
	#classPrefix = "scui-";
	#theme = "signalcraft-magenta-theme";

	#element;
	#svg;
	#scene;
	#menus;
	#panzoom;
	#transform;

	#renderers = new Map();

	#unsubscribe = [];

	constructor({ name, element, application }) {
		super()
		this.#name = name;
		this.#element = element;
		this.#application = application;


		const props = {
			id: uuid(),
			transform: { x: 0, y: 0, scale: 1 },
		};

		Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));


	}

	start() {

		// setup the pre-requisites
		this.#menus = this.#installMenus();
		this.#svg = this.#installCanvas();
		this.#scene = this.#installScene();

		this.#panzoom = panzoom(this.#scene, {
			smoothScroll: false, // this is the sluggish post  scrolling effect
			transformOrigin: { x: 0.5, y: 0.5 },
			maxZoom: 10,
			minZoom: 0.1,
			initialX: 500,
			initialY: 500,
			initialZoom: .5,
			beforeMouseDown: function(e) {
				// console.log( e.target );
				if(e.target.classList.contains('panel-caption')) return true;
				if(e.target.classList.contains('panel-line-port')) return true;
				if(e.target.classList.contains('ant-trail')) return true;
			}
		});

		this.#panzoom.on('transform', (e) => {
			const { x, y, scale } = this.#panzoom.getTransform();
			this.transform = { x, y, scale };
		});

		this.#unsubscribe.push(this.#panzoom.dispose);


		//this.#unsubscribe.push(this.observe('transform', v => document.getElementById("value-scale").textContent = v.scale));



		// setup all th einstances of nodes
		this.application.Nodes.forEach(node => this.#createPanel(node));
		this.application.Links.forEach(node => this.#createCable(node)); // reminder: Links contain strings with IDs of sourceNode, targetNode, sourcePort, targetPort,

		// ...and keep an eye on changes
		const grandCentral = {
			"Setup bgColor": (v) => this.#svg.querySelector(".background").setAttributeNS(null, "fill", v),

			'Nodes created ...': this.#createPanel, //   NOTE:
			'Nodes removed ...': this.#deletePanel, //   the node updates it self, here we only ensure it exists, or is removed as needed
			'Links created ...': this.#createCable, //   NOTE:
			'Links removed ...': this.#deleteCable, //   the node updates it self, here we only ensure it exists, or is removed as needed


		};
		const unintegrate = this.application.integrate(this, grandCentral);
		this.#unsubscribe.push(unintegrate);
	}

	stop() {
		this.#unsubscribe.map((o) => o());
		this.#element.empty();
	}

	#installCanvas() {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		// svg.setAttributeNS(null, "style", "border: 1px solid gold;");
		svg.setAttributeNS(null, "class", "ui-view");
		svg.setAttributeNS(null, "width", "100%");
		svg.setAttributeNS(null, "height", "1000");

		this.#element.appendChild(svg);

		const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

		// NOTE: available gradients get installed here!


		const gradientSpecification = {
			linearGradient: {
				background: {
					primary: ["#382737", "#3b1f2e", "#241627"],
					secondary: ["#0f181f", "#172029"],
				},
				panel: {
					primary: ["#382737", "#3b1f2e", "#241627"],
					secondary: ["#0f181f", "#172029"],
					caption: ["#0f181f", "#172029"],
					pod: ["#162b39", "#0f2f50"],
					text: ["#9f7c4d", "#c7994b"],
				},
				cable: {
					primary: ["#294666", "#1c293b"],
					secondary: ["#0f181f", "#172029"],
				},
				alert: {
					danger: ["#d07c0c", "#e78f2a", "#f2870a"],
					sucess: ["#075d39", "#097d68"],
				},
			},

			radialGradient: {
				socket: {
					primary: ["#ffbb73", "#ffbb73", "#ea3754", "#4f0f2a"],
					error: ["#dc37eb", "#4a0f4f"],
				},
			},

		};

		for(const gradientType in gradientSpecification) {
			for(const categoryName in gradientSpecification[gradientType]) {
				for(const gradientName in gradientSpecification[gradientType][categoryName]) {
					const colors = gradientSpecification[gradientType][categoryName][gradientName];
					const lineargradient = document.createElementNS("http://www.w3.org/2000/svg", gradientType);
					lineargradient.setAttributeNS(null, "id", `${categoryName}-${gradientName}`);
					lineargradient.setAttributeNS(null, "gradientTransform", `rotate(16)`);
					let index = 0;
					for(const color of colors) {
						const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
						stop.setAttributeNS(null, "offset", `${calculatePercent(index++,colors.length-1)}%`);
						stop.setAttributeNS(null, "stop-color", color);
						lineargradient.appendChild(stop);
					}
					defs.appendChild(lineargradient);
					svg.appendChild(defs);
				}
			}
		}

		const lineargradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
		lineargradient.setAttributeNS(null, "id", "gradient-primary");

		const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
		stop.setAttributeNS(null, "offset", "0%");
		stop.setAttributeNS(null, "stop-color", "#294666");

		const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
		stop2.setAttributeNS(null, "offset", "100%");
		stop2.setAttributeNS(null, "stop-color", "#1c293b");

		lineargradient.appendChild(stop);
		lineargradient.appendChild(stop2);
		defs.appendChild(lineargradient);





		{
			const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
			filter.setAttribute('id', 'shadow-primary');
			filter.setAttribute('filterUnits', 'userSpaceOnUse');
			const fedropshadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
			fedropshadow.setAttribute('dx', '1');
			fedropshadow.setAttribute('dy', '1');
			fedropshadow.setAttribute('stdDeviation', '32');
			filter.appendChild(fedropshadow);
			defs.appendChild(filter);
		}

		{
			const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
			filter.setAttribute('id', 'socket-shadow');
			filter.setAttribute('filterUnits', 'userSpaceOnUse');
			const fedropshadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
			fedropshadow.setAttribute('dx', '1');
			fedropshadow.setAttribute('dy', '1');
			fedropshadow.setAttribute('stdDeviation', '5');
			filter.appendChild(fedropshadow);
			defs.appendChild(filter);
		}

		{
			const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
			filter.setAttribute('id', 'glow-primary');
			filter.setAttribute('filterUnits', 'userSpaceOnUse');

			const fedropshadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
			fedropshadow.setAttribute('flood-color', '#e72a79');
			fedropshadow.setAttribute('dx', '.4');
			fedropshadow.setAttribute('dy', '.4');
			fedropshadow.setAttribute('stdDeviation', '.5');
			filter.appendChild(fedropshadow);
			defs.appendChild(filter);
		}
		svg.appendChild(defs);
		return svg;
	}

	#installMenus() {
		const menus = new Menus();
		menus.start(this);
		this.#unsubscribe.push(() => menus.stop());
	}

	#installScene() {
		const scene = document.createElementNS("http://www.w3.org/2000/svg", "g");
		scene.setAttributeNS(null, "class", "view-scene");
		scene.setAttributeNS(null, "id", "scene");
		this.#svg.appendChild(scene);

		const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect2.setAttributeNS(null, "class", "view-scene-background");
		rect2.setAttributeNS(null, "x", "0");
		rect2.setAttributeNS(null, "y", "0");
		rect2.setAttributeNS(null, "width", 11_000);
		rect2.setAttributeNS(null, "height", 8_500);
		scene.appendChild(rect2);

		const vertical1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		vertical1.setAttributeNS(null, "x1", "100");
		vertical1.setAttributeNS(null, "y1", "100");
		vertical1.setAttributeNS(null, "x2", "100");
		vertical1.setAttributeNS(null, "y2", "200");
		vertical1.setAttributeNS(null, "stroke", "white");

		scene.appendChild(vertical1);

		const horizontal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		horizontal1.setAttributeNS(null, "x1", "50");
		horizontal1.setAttributeNS(null, "y1", "150");
		horizontal1.setAttributeNS(null, "x2", "150");
		horizontal1.setAttributeNS(null, "y2", "150");
		horizontal1.setAttributeNS(null, "stroke", "white");

		scene.appendChild(horizontal1);

		return scene;
	}

	#deletePanel({ item }) {
		this.#renderers.get(item.id).stop();
	}
	#createPanel({ item }) {
		const panel = new Panel();
		this.#renderers.set(item.id, panel);
		panel.start({ data: item, view: this });
	}

	#deleteCable({ item }) {
		this.#renderers.get(item.id).stop();
	}
	#createCable({ item }) {
		const cable = new Cable();
		this.#renderers.set(item.id, cable);
		cable.start({ link: item, view: this });
	}

	get application() { return this.#application; }
	get transform() { return this.#transform; }
	get element() { return this.#element; }
	get scene() { return this.#scene; }
	get theme() { return this.#theme; }
	get name() { return this.#name; }

}
