import panzoom from "panzoom";
import calculatePercent from 'calculate-percent';
import { html, svg, text, list, update, keyboard, click } from "domek";
import { v4 as uuid } from "uuid";

import ReactiveObject from "../system/ReactiveObject.js";

import Node from './view/Node.js';
import Connector from './view/Connector.js';
import Junction from './view/Junction.js';
import Menus from './view/Menus.js';

export default class View extends ReactiveObject {
	#application;

	#name;
	#classPrefix = "scui-";
	#theme = "signalcraft-magenta-theme";

	#element;
	#svg;
	#defs;
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

		keyboard( e=>this.#application.Shortcuts.isDeleting(e), ()=>this.#application.Api.removeSelected() )


		// this.#unsubscribe.push( );

		// setup the pre-requisites
		this.#menus = this.#installMenus();
		this.#svg = this.#installCanvas();
		this.#scene = this.#installScene();

		this.#panzoom = panzoom(this.#scene, {
			smoothScroll: false, // this is the sluggish post  scrolling effect
			// transformOrigin: { x: 0.5, y: 0.5 },
			maxZoom: 100,
			minZoom: 0.01,
			initialX: 0,
			initialY: 0,
			// initialZoom: .5,
			filterKey: function(/* e, dx, dy, dz */) {
				 // don't let panzoom handle this event:
				 return true;
			},
			beforeMouseDown: function(e) {
				const DENY = true;

				if(!e.target.classList.contains('interface-background')) return DENY;
				// if(e.target.classList.contains('panel-caption')) return true;
				// if(e.target.classList.contains('panel-line-port')) return true;
				// if(e.target.classList.contains('ant-trail')) return true;
				// if(e.target.classList.contains('junction-caption')) return true;
				// if(e.target.classList.contains('junction-port')) return true;
				// if(e.target.classList.contains('editor-control')) return true;
			}
		});

		this.#panzoom.on('transform', (e) => {
			const { x, y, scale } = this.#panzoom.getTransform();
			this.transform = { x, y, scale };
		});

		this.#unsubscribe.push(this.#panzoom.dispose);


		//this.#unsubscribe.push(this.observe('transform', v => document.getElementById("value-scale").textContent = v.scale));



		// setup all th einstances of nodes
		this.application.Nodes.forEach(node => this.#createNode(node));
		this.application.Connectors.forEach(connector => this.#createConnector(connector)); // reminder: Connectors contain strings with IDs of sourceNode, targetNode, sourcePort, targetPort,
		this.application.Junctions.forEach(junction => this.#createJunction(junction));

		// ...and keep an eye on changes
		const grandCentral = {
			"Setup bgColor": (v) => this.#svg.querySelector(".background").setAttributeNS(null, "fill", v),

			'Nodes created ...': this.#createNode, //   NOTE:
			'Nodes removed ...': this.#deleteNode, //   the node updates it self, here we only ensure it exists, or is removed as needed
			'Connectors created ...': this.#createConnector, //   NOTE:
			'Connectors removed ...': this.#deleteConnector, //   the node updates it self, here we only ensure it exists, or is removed as needed
			'Junctions created ...': this.#createJunction, //   NOTE:
			'Junctions removed ...': this.#deleteJunction, //   the node updates it self, here we only ensure it exists, or is removed as needed


		};
		const unintegrate = this.application.integrate(this, grandCentral);
		this.#unsubscribe.push(unintegrate);


	}

	stop() {
		this.#unsubscribe.map((o) => o());
		this.#element.empty();
	}

	#installCanvas() {
		const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgElement.setAttributeNS(null, "class", "editor-interface");
		svgElement.setAttributeNS(null, "width", "100%");
		svgElement.setAttributeNS(null, "height", "1000");

		this.#element.appendChild(svgElement);

		this.#defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
		svgElement.appendChild(this.#defs);

		// const clipPath = svg.clipPath({ id:'text-property-clip' });
		// this.#defs.appendChild( clipPath );
		//
		// const boxPath = svg.path({ d:'M 0 0 H 200 V 32 H 0 V 0 Z' });
		// clipPath.appendChild( boxPath );
		//clip-path="url(#text-property-clip)"

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
					this.#defs.appendChild(lineargradient);
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
		this.#defs.appendChild(lineargradient);





		{
			const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
			filter.setAttribute('id', 'shadow-primary');
			filter.setAttribute('filterUnits', 'userSpaceOnUse');
			const fedropshadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
			fedropshadow.setAttribute('dx', '1');
			fedropshadow.setAttribute('dy', '1');
			fedropshadow.setAttribute('stdDeviation', '32');
			filter.appendChild(fedropshadow);
			this.#defs.appendChild(filter);
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
			this.#defs.appendChild(filter);
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
			this.#defs.appendChild(filter);
		}

		return svgElement;
	}

	#installMenus() {
		const menus = new Menus();
		menus.start(this);
		this.#unsubscribe.push(() => menus.stop());
	}



	#installScene() {



		const scene = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.#svg.appendChild(scene);

		const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect2.setAttributeNS(null, "class", "interface-background");
		rect2.setAttributeNS(null, "x", "0");
		rect2.setAttributeNS(null, "y", "0");
		rect2.setAttributeNS(null, "width", 11_000);
		rect2.setAttributeNS(null, "height", 8_500);
		scene.appendChild(rect2);

		//NOTE: this is click on cackground to deselect all
		this.#unsubscribe.push(click(rect2, ()=>this.#application.Api.deselectAll() ));


		return scene;
	}

	#deleteNode({ item }) {
		this.#renderers.get(item.id).stop();
	}
	#createNode({ item }) {
		const node = new Node();
		this.#renderers.set(item.id, node);
		node.start({ data: item, view: this });
	}

	#deleteConnector({ item }) {
		this.#renderers.get(item.id).stop();
	}
	#createConnector({ item }) {
		const connector = new Connector();
		this.#renderers.set(item.id, connector);
		connector.start({ link: item, view: this });
	}

	#deleteJunction({ item }) {
		this.#renderers.get(item.id).stop();
	}
	#createJunction({ item }) {
		const junction = new Junction();
		this.#renderers.set(item.id, junction);
		junction.start({ junction: item, view: this });
	}

	get application() { return this.#application; }
	get transform() { return this.#transform; }
	get element() { return this.#element; }
	get svg() { return this.#svg; }
	get scene() { return this.#scene; }
	get defs() { return this.#defs; }
	get theme() { return this.#theme; }
	get name() { return this.#name; }

}
